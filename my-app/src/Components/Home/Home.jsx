import React, { useState } from 'react'
import HomeStyles from './HomeStyles'
import { Typography, Card, CardActionArea, CardActions, CardContent, CardMedia, Button }  from '@material-ui/core';
import stockPrices from './stockPrices.png'
const axios = require('axios');

const GetTicker = () => {
    // classes and queries
    const classes = HomeStyles();

    const [state, setState] = useState();
    const [price, setPrice] = useState("not yet found");

    function getPrice(e) {
        e.preventDefault();
        axios.get(`http://localhost:5000/?ticker=${state}`)
            .then((res) => {
                setPrice(res.data.price);
            })
            .catch((err) => {
                setPrice("Ticker Not Found");
            })
    }

    return (
        <div id="home" style={{ height: "100vh" }}>
            <div className={classes.homeTitle}>
                <Typography variant="h2">Stocks Portfolio</Typography>
                <form>
                    <label>
                        Ticker:
                    <input onChange={(e) => setState(e.target.value)} type="text" name="ticker" />
                    </label>
                    <button onClick={(e) => getPrice(e)} type="submit">Get Price</button>
                </form>

                <h2>The price is: {price}</h2>
            </div>

            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image= { stockPrices }
                        title="Stocks"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Organize Your Stocks Portfolio With Us!
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Track your investments with the FinnHub API! 
                            Make your portfolio now!
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default GetTicker
