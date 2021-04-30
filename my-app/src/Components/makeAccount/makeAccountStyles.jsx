import { makeStyles } from '@material-ui/styles';

const MakeAccountStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 350,
        justifyContent: "center",
        align: "center"
    },
    media: {
        height: 140,
    },
    accountTitle: {
        justifyContent: "center",
        textAlign: "center",
        color: theme.palette.secondary.dark
    }
}))

export default MakeAccountStyles;