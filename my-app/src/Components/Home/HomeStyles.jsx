
import { makeStyles } from '@material-ui/styles';

const HomeStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    homeTitle: {
        justifyContent: "center",
        textAlign: "center",
        color: theme.palette.secondary.dark
    }
}))

export default HomeStyles;