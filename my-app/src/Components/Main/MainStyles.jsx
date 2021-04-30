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
    }
}))

export default MainStyles;