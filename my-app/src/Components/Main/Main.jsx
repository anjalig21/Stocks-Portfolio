import React, { useState } from 'react';
import MainStyles from './MainStyles';
import { Typography, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Grid } from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';
import add from './add.jpeg';
import deleteEntry from './deleteEntry.jpeg';
import get from './get.jpeg';
const axios = require('axios');

const Main = () => {
    const classes = MainStyles();
    return (
        <Grid container id="main">
            <Grid item xs={12} className={classes.mainTitle}>
                <Typography variant="h2">Stocks Portfolio</Typography>
            </Grid>
            <Grid item container xs={12}>
                <Grid item xs={4} className={classes.mainCard}>
                    <br />
                    <br />
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={get}
                                title="get"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Your Current Portfolio
                        </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Want to see your portfolio? 
                                    Click the button below to see the stocks you are invested in and their current price!
                        </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <form>
                                <Button type="submit">Click Here to See Your Portfolio</Button>
                            </form>
                        </CardActions>
                    </Card>
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
                <Grid item xs={4} className={classes.mainCard}>
                    <br />
                    <br />
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={deleteEntry}
                                title="delete"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Delete a Stock
                        </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Want to delete a stock from your portfolio? 
                                    Just type in the stock you want to delete from your portfolio and press submit!
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
