import React from 'react'
import MakeAccountStyles from './makeAccountStyles';
import { Typography, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Grid } from '@material-ui/core';

const MakeAccount = () => {
    const classes = MakeAccountStyles();
    return (
        <div item xs={12} className={classes.accountTitle}>
            <Typography variant="h2">Stocks Portfolio</Typography>
        </div>
    )
}

export default MakeAccount
