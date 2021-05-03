import { makeStyles } from '@material-ui/styles';

const MainStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 350,
    },
    media: {
        height: 140,
    },
    mainTitle: {
        justifyContent: "center",
        textAlign: "center",
        color: theme.palette.secondary.dark
    },
    portTitle: {
        justifyContent: "center",
        textAlign: "center"
    },
    tickers: {
        paddingLeft: "34%",
        textAign: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    mainCard: {
        paddingLeft: "10%"
    },
    mainButton: {
        margin: '0 auto', 
        display: "flex"
    }
}))

export default MainStyles;