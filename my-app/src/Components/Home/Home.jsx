import React, { useState } from 'react';
import HomeStyles from './HomeStyles';
import { Typography, Card, CardActionArea, CardActions, CardContent, CardMedia, Button } from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';
import stockPrices from './stockPrices.png';
const axios = require('axios');

const Home = () => {
    // classes and queries
    const history = useHistory();
    const classes = HomeStyles();
    const [name, setName] = useState();
    const [login, setLogin] = useState(false);

    async function getName(e) {
        e.preventDefault();
        const result = await axios.get(`http://localhost:5000/portfolio/${name}`)
            .then((res) => {
                history.push("/Main");
            })
            .catch((err) => {
                history.push("/createAccount");
            })
        return result;
    }

    return (
        <div id="home" style={{ height: "100vh" }}>
            <div className={classes.homeTitle}>
                <Typography variant="h2">Stocks Portfolio</Typography>
            </div>

            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={stockPrices}
                        title="Stocks"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Organize Your Stocks Portfolio With Us!
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Track your investments with the FinnHub API! Make your portfolio now by typing your portfolio name below!
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <form>
                        <label>
                            Name:
                    <input onChange={(e) => setName(e.target.value)} type="text" name="ticker" />
                        </label>
                        <Button onClick={e => getName(e)} type="submit">Submit</Button>
                    </form>
                </CardActions>
            </Card>
        </div>

    )
}

export default Home
