import React, { useState }from 'react'
import MakeAccountStyles from './makeAccountStyles';
import { Typography, Card, CardActionArea, CardActions, CardContent, CardMedia, Button } from '@material-ui/core';
import portfolio from './portfolio.jpeg'
import { useHistory } from 'react-router-dom';
const axios = require('axios');

const MakeAccount = () => {
    const classes = MakeAccountStyles();
    const [account, setAccount] = useState();
    const history = useHistory();

    async function postPortfolio(e=null) {
        if (e) {
            e.preventDefault();
        }
        const result = await axios.post(`http://localhost:5000/portfolio/${account}`)
            .then((res) => {
                localStorage.setItem("name", account);
                history.push("/Main")
            })
            .catch((err) => {
                console.log(err);
            })
        return result;
    }

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
                                    <input onChange={(e) => setAccount(e.target.value)} type="text" name="ticker" />
                            </label>
                            <Button onClick={e => postPortfolio(e)} type="submit">Submit</Button>
                        </form>
                    </CardActions>
                </Card>
            </div>
        </div>
    )
}

export default MakeAccount
