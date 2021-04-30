import React from 'react'
import MakeAccountStyles from './makeAccountStyles';
import { Typography, Card, CardActionArea, CardActions, CardContent, CardMedia, Button } from '@material-ui/core';
import portfolio from './portfolio.jpeg'

const MakeAccount = () => {
    const classes = MakeAccountStyles();
    return (
        <div className={classes.accountTitle}>
            <Typography variant="h2">Stocks Portfolio</Typography>
            <br />
            <Typography style={{ color: "black" }} variant="h4">Uh oh! It looks like you do not have a portfolio! To create a portfolio, type your name below!</Typography>
            <br />
            <br />
            <div className={classes.makeAccountCard}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={portfolio}
                            title="portfolio"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Create Your Portfolio
                        </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                It looks like you have not created your portfolio yet. Don't worry,
                                you can make it here in seconds! Type your name below and press submit
                                to get started.
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <form>
                            <label>
                                Name:
                                    <input type="text" name="ticker" />
                            </label>
                            <Button type="submit">Submit</Button>
                        </form>
                    </CardActions>
                </Card>
            </div>
        </div>
    )
}

export default MakeAccount
