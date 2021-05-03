require('dotenv').config();
const axios = require('axios');
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const { Pool } = require("pg");
const cors = require('cors')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Configure the database connection.
const config = {
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: 26257,
    ssl: {
        rejectUnauthorized: false,
    },
    // ssl: {
    //     ca: fs.readFileSync('cc-ca.cer')
    //         .toString()
    // }
};

// Create a connection pool
const pool = new Pool(config);

async function getPrice(ticker) {
    const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${process.env.TOKEN}`;
    const result = await axios.get(url)
        .then((res) => {
            return res;
        })
    return result;
}

// Gets price of stock ticker from Finnhub API
app.get("/", async (req, res) => {
    if (!req.query.ticker) {
        return res.send("Welcome").end();
    }
    const result = await getPrice(req.query.ticker);
    if (result.data.c === 0) {
        return res.status(400).send('Ticker does not exist').end();
    } else {
        const sendData = {
            "ticker": req.query.ticker,
            "price": result.data.c
        }
        return res.status(200).send(sendData).end(); 
    }
})

// Gets the stock tickers in user's portfolio and returns price of each ticker by using the Finhub API
app.get("/portfolio/:account", async (req, res) => {
    try {
        const client = await pool.connect();
        const priceArray = [];
        await client.query(
            `SELECT * FROM ${req.params.account}`,
            async (error, response) => {
                if (error) {
                    console.log(error);
                    client.release();
                    return res.status('400').send('User does not exist').end();
                }
                let length = response.rowCount;
                for (let i = 0; i < length; i++) {
                    let ticker = response.rows[i].tickers;
                    // if (!ticker) {
                    //      break;
                    //  }
                    const result = await getPrice(ticker);
                    if (result.data.c === 0) {
                        client.release();
                        return res.status(400).send('Ticker does not exist').end();
                    }
                    priceArray.push({ "ticker": ticker, "price": result.data.c });
                }
                client.release();
                return res.status(200).send(priceArray).end();
            }
        )
    }
    catch (err) {
        console.log(err);
        client.release();
        return res.status(400).send(err).end();
    }
})

// Clears database
app.delete("/", async (req, res) => {
    try {
        const client = await pool.connect();
        await client.query(
            "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';",
            async (err, table) => {
                // console.log(table.rows);
                if (err) {
                    console.log(err);
                    client.release();
                    return res.status(500).send(err).end();
                }
                let length = table.rowCount;
                for (let i = 0; i < length; i++) {
                    await client.query(
                        `DROP TABLE ${table.rows[i].table_name};`,
                        (err, response) => {
                            if (err) {
                                client.release();
                                return res.status(500).send(err).end();
                            }
                        }
                    )
                }
                console.log("Table Deleted");
            })
    }
    catch (err) {
        console.log(err);
        client.release();
        return res.status(400).send(err).end();
    }
})

app.delete("/portfolio/:account", async (req, res) => {
    try {
        const client = await pool.connect();
        await client.query(
            `SELECT * from ${req.params.account}`,
            async (err, table) => {
                // console.log(table.rows);
                if (err) {
                    console.log(err);
                    client.release();
                    return res.status(400).send(`Account does not exist`).end();
                }
                let length = table.rowCount;
                for (let i = 0; i < length; i++) {
                    const found = req.body.tickers.find(t => t === table.rows[i].tickers);
                    if (found) {
                        await client.query(
                            `DELETE FROM ${req.params.account} WHERE tickers='${table.rows[i].tickers}' RETURNING *;`,
                            (err, response) => {
                                if (err) {
                                    client.release();
                                    return res.status(400).send(`Could not delete ${table.rows[i].tickers}`).end();
                                }
                            }
                        )
                    }
                }
                client.release();
                return res.status(200).send("Tickers Deleted").end();
            })
    }
    catch (err) {
        console.log(err);
        client.release();
        return res.status(400).send(err).end();
    }
})

// Creates and Updates User's Portfolio (adds more ticker stocks)
app.post("/portfolio/:account", async (req, res) => {
    let result;
    let notAdded = [];
    try {
        const client = await pool.connect();
        await client.query(
            `CREATE TABLE IF NOT EXISTS ${req.params.account} (id serial PRIMARY KEY, tickers VARCHAR(200));`,
            (err, res) => {
                if (err) {
                    console.log(err);
                    client.release();
                    return res.status(500).send(err).end();
                }
            })
        if (req.body.tickers) {
            await client.query(
                `SELECT * FROM ${req.params.account}`
            )
                .then((data) => {
                    result = data;
                })
                .catch((err) => {
                    console.log(err);
                    client.release();
                    res.sendStatus('400').end();
                })

            if (result.rows.length === 0) {
                let counter = 0;
                for (counter; counter < req.body.tickers.length; counter++) {
                    const resultingPrice = await getPrice(req.body.tickers[counter]);
                    if (resultingPrice.data.c === 0) {
                        client.release();
                        return res.status(400).send(`Ticker ${req.body.tickers[counter]} does not exist`).end();
                    } else {
                        break;
                    }
                }
                await client.query(
                    `INSERT INTO ${req.params.account} (id, tickers) VALUES (DEFAULT, '${req.body.tickers[counter]}');`,
                    (err, res) => {
                        if (err) {
                            console.log(err);
                            client.release();
                            return res.status(500).send(err).end();
                        }
                        console.log("Ticker Inserted");
                    })

                await client.query(
                    `SELECT * FROM ${req.params.account}`
                )
                    .then((data) => {
                        result = data;
                    })
                    .catch((err) => {
                        client.release();
                        return res.status('400').send(err).end();
                    })
            }
            for (let i = 0; i < req.body.tickers.length; i++) {
                const found = result.rows.find(t => t.tickers === req.body.tickers[i]);
                const resultPrice = await getPrice(req.body.tickers[i]);
                if (resultPrice.data.c === 0) {
                    notAdded.push(`"${req.body.tickers[i]}"`);
                }
                if (!found && resultPrice.data.c != 0) {
                    await client.query(
                        `INSERT INTO ${req.params.account} (id, tickers) VALUES (DEFAULT, '${req.body.tickers[i]}');`,
                        (err, res) => {
                            if (err) {
                                client.release();
                                return res.status(500).send(err).end();
                            }
                            console.log("Ticker Inserted");
                        })
                }
            }
            if (notAdded.length > 0) {
                client.release();
                return res.status(400).send(`Could not add these tickers: ${notAdded}`).end();
            } else {
                client.release();
                return res.status(200).send(`${req.params.account}'s Portfolio Updated`).end();
            }
        } else {
            client.release();
            return res.status(200).send(`${req.params.account}'s Portfolio Made`).end();
        }
    }
    catch (err) {
        console.log(err);
        client.release();
        return res.status(400).send(err).end();
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})