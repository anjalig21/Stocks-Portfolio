import React, { useState } from 'react';
import MainStyles from './MainStyles';
import useHome from '../Home/useHome';
import { Typography, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Grid } from '@material-ui/core';
import add from './add.jpeg';
import deleteEntry from './deleteEntry.jpeg';
import get from './get.jpeg';
const axios = require('axios');

const Main = () => {
    const classes = MainStyles();
    const {
        history,
        name,
        getName,
        setName
    } = useHome();

    async function getPortfolio(e) {
        e.preventDefault();
        const result = await axios.get(`http://localhost:5000/portfolio/${name}`)
            .then((res) => {
                // show portfolio
            })
            .catch((err) => {
                // return error
            })
        return result;
    }

    return (
        <Grid container id="main">
            {/* Title */}
            <Grid item xs={12} className={classes.mainTitle}>
                <Typography variant="h2">Stocks Portfolio</Typography>
            </Grid>
            <Grid item container xs={12}>
                <Grid item xs={8} className={classes.mainCard}>
                    <Typography variant="h3">Your Portfolio</Typography>

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
                                    <input type="text" name="ticker" />
                                </label>
                                <Button type="submit">Submit</Button>
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