require('dotenv').config();
const axios = require('axios');
const express = require("express");
const app = express();
const port = 5000;
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
    ssl: {
        ca: fs.readFileSync('cc-ca.cer')
            .toString()
    }
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
app.get("/", (req, res) => {
    if (!req.query.ticker) {
        res.send("Welcome")
    }
    async function sendResponse() {
        const result = await getPrice(req.query.ticker);
        if (result.data.c === 0) {
            res.status(400).send('Ticker does not exist');
        } else {
            const sendData = {
                "ticker": req.query.ticker,
                "price": result.data.c
            }
            res.status(200).send(sendData);
        }
    }
    sendResponse();
})

// Clears database
app.delete("/", (req, res) => {
    async function deleteDb() {
        try {
            const client = await pool.connect();
            await client.query(
                "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';",
                async (err, table) => {
                    // console.log(table.rows);
                    if (err) throw err;
                    let length = table.rowCount;
                    for (let i = 0; i < length; i++) {
                        await client.query(
                            `DROP TABLE ${table.rows[i].table_name};`,
                            (err, response) => {
                                if (err) throw err;
                            }
                        )
                    }
                    console.log("Table Deleted");
                })
        }
        catch (err) {
            console.log(err);
        }
    }
    deleteDb();
})

app.delete("/portfolio/:account", (req, res) => {
    async function deleteTicker() {
        try {
            const client = await pool.connect();
            await client.query(
                `IF EXISTS (SELECT * from ${account})`,
                async (err, table) => {
                    // console.log(table.rows);
                    if (err) throw err;
                    let length = table.rowCount;
                    for (let i = 0; i < length; i++) {
                        const found = req.body.find((t, idx) => t.tickers === table.rows[i].tickers);
                        if (found) {
                            await client.query(
                                `DELETE FROM ${account} WHERE tickers=${table.rows[i].tickers};`,
                                (err, response) => {
                                    if (err) throw err;
                                }
                            )
                        }
                    }
                    console.log("Tickers Deleted");
                })
        }
        catch (err) {
            console.log(err);
        }
    }
    deleteTicker();
})

// Creates and Updates User's Portfolio (adds more ticker stocks)
app.post("/portfolio/:account", (req, res) => {
    async function sendResponse() {
        var result;
        try {
            const client = await pool.connect();
            await client.query(
                `CREATE TABLE IF NOT EXISTS ${req.params.account} (id serial PRIMARY KEY, tickers VARCHAR(200));`,
                (err, res) => {
                    if (err) throw err;
                    console.log(res);
                })
            if (req.body.tickers) {
                await client.query(
                    `SELECT * FROM ${req.params.account}`
                )
                    .then((data) => {
                        result = data;
                    })
                    .catch((err) => {
                        res.sendStatus('400').end();
                    })

                if (result.rows.length === 0) {
                    await client.query(
                        `INSERT INTO ${req.params.account} (id, tickers) VALUES (DEFAULT, '${req.body.tickers[0]}');`,
                        (err, res) => {
                            if (err) throw err;
                            console.log("Ticker Inserted");
                        })
                    await client.query(
                        `SELECT * FROM ${req.params.account}`
                    )
                        .then((data) => {
                            result = data;
                        })
                        .catch((err) => {
                            res.sendStatus('400').end();
                        })
                }
                for (let i = 0; i < req.body.tickers.length; i++) {
                    const found = result.rows.find(t => t.tickers === req.body.tickers[i]);
                    if (!found) {
                        await client.query(
                            `INSERT INTO ${req.params.account} (id, tickers) VALUES (DEFAULT, '${req.body.tickers[i]}');`,
                            (err, res) => {
                                if (err) throw err;
                                console.log("Ticker Inserted");
                            })
                    }
                }
            }
            res.status('200').send(`${req.params.account}'s Portfolio Updated`);
        }
        catch (err) {
            console.log(err);
        }
    }
    sendResponse();
})

// Gets the stock tickers in user's portfolio and returns price of each ticker by using the Finhub API
app.get("/portfolio/:account", (req, res) => {
    async function getPrice() {
        try {
            const client = await pool.connect();
            const priceArray = [];
            await client.query(
                `SELECT EXISTS(SELECT * FROM ${req.params.account})`,
                async (error, response) => {
                    if (error) {
                        res.status('400').send('User does not exist');
                        throw error;
                    }
                    let length = response.rowCount;
                    for (let i = 0; i < length; i++) {
                        let ticker = response.rows[i].tickers;
                        const result = await getPrice(ticker);
                        if (result.data.c === 0) {
                            res.status(400).send('Ticker does not exist');
                        }
                        priceArray.push({ "ticker": ticker, "price": result.data.c });
                    }
                    res.send(priceArray);
                }
            )
        }
        catch (err) {
            console.log(err);
        }
    }
    getPrice();
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


