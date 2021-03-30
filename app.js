const axios = require('axios');
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Welcome")
})

app.get("/:ticker", (req, res) => {
    async function sendResponse() {
        const url = `https://finnhub.io/api/v1/quote?symbol=${req.params.ticker}&token=c1h8gb748v6t9ghtphbg`;
        const result = await axios.get(url)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            })
            const sendData = {
                "ticker": req.params.ticker,
                "price": result.data.c
            }
            res.send(sendData);
    }
    sendResponse();
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})