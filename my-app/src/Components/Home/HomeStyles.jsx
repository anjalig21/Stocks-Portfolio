
import { makeStyles } from '@material-ui/styles';

const HomeStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 350,
        justifyContent: "center",
        align: "center"
    },
    media: {
        height: 140,
    },
    homeTitle: {
        justifyContent: "center",
        textAlign: "center",
        color: theme.palette.secondary.dark
    },
    homeCard: {
        display: 'flex', 
        justifyContent: 'center'
    }
}))

export default HomeStyles;