import React from 'react';
import useHome from './useHome';
import HomeStyles from './HomeStyles';
import { Typography, Card, CardActionArea, CardActions, CardContent, CardMedia, Button } from '@material-ui/core';
import stockPrices from './stockPrices.png';

const Home = () => {
    const classes = HomeStyles();
    const {
        getName,
        setName
    } = useHome();

    return (
        <div id="home" style={{ height: "100vh" }}>
            <div className={classes.homeTitle}>
                <Typography variant="h2">Stocks Portfolio</Typography>
            </div>
            <br />
            <div className={classes.homeCard}>
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
        </div>

    )
}

export default Home
