import React, { useState, useEffect } from 'react';
import MainStyles from './MainStyles';
import useHome from '../Home/useHome';
import { Typography, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Grid } from '@material-ui/core';
import add from './add.jpeg';
import deleteEntry from './deleteEntry.jpeg';
import get from './get.jpeg';
const axios = require('axios');

const Main = () => {
    const classes = MainStyles();
    const [portfolio, setPortfolio] = useState([{}]);
    const [ticker, setTicker] = useState();
    useEffect(() => {
        getPortfolio();
    }, [])

    const {
        history,
        name,
        getName,
        setName
    } = useHome();

    async function getPortfolio(e=null) {
        if (e) {
            e.preventDefault();
        }
        const result = await axios.get(`http://localhost:5000/portfolio/${localStorage.getItem("name")}`)
            .then((res) => {
                setPortfolio(res.data);
                console.log(portfolio);
            })
            .catch((err) => {
                console.log(err);
            })
        return result;
    }

    async function delPortfolio(e=null, ticker) {
        if (e) {
            e.preventDefault();
        }
        const result = await axios.delete(`http://localhost:5000/portfolio/${localStorage.getItem("name")}`, {data: {"tickers": [ticker]}})
            .then((res) => {
                getPortfolio();
            })
            .catch((err) => {
                console.log(err);
            })
        return result;
    }

    async function addPortfolio(e=null, ticker) {
        if (e) {
            e.preventDefault();
        }
        const result = await axios.post(`http://localhost:5000/portfolio/${localStorage.getItem("name")}`, {"tickers": [ticker]})
            .then((res) => {
                getPortfolio();
            })
            .catch((err) => {
                console.log(err);
            })
        return result;
    }

    return (
        <Grid container id="main">
            {/* Title */}
            <Grid item xs={12} className={classes.mainTitle}>
                <Typography variant="h2">Stocks Portfolio: {localStorage.getItem("name")}</Typography>
            </Grid>
            <Grid item container xs={12}>
                <Grid item xs={8} className={classes.mainCard}>
                    <Typography variant="h3">Your Portfolio</Typography>
                    <br />
                    {portfolio.map((event) => {
                        return (
                            <div>
                                <Typography display="inline" variant="h4" key={event.ticker}>{event.ticker}: ${event.price}</Typography>
                                <Button onClick={e => delPortfolio(e, event.ticker)}>Delete</Button>
                            </div>
                        );
                    })}
                </Grid>
                <Grid item xs={4} className={classes.mainCard}>
                    <br />
                    <br />
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={add}
                                title="add"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Add a Stock
                        </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Type in the stock you want to add to your portfolio below!
                                    Remember to press the GET button again to see it on your updated portfolio!
                        </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <form>
                                <label>
                                    Stock Symbol:
                                    <input onChange={(e) => setTicker(e.target.value)} type="text" name="ticker" />
                                </label>
                                <Button onClick={e => addPortfolio(e, ticker)} type="submit">Submit</Button>
                            </form>
                        </CardActions>
                    </Card>
                </Grid>
                {/* Home Page Buttonl */}
                <Grid item xs={12}>
                    <br />
                    <br />
                    <Button type="submit" className={classes.mainButton}>Back to Home Page</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Main