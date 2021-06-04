import * as React from "react";
import { AbstractProps } from "../../../..";
import {
    withStyles,
    makeStyles,
    Theme,
    createStyles,
} from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import PrettoSlider from "../integrals/slider";
import {
    Card,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    TextField,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Avatar from "@material-ui/core/Avatar";
import IWButton from "../integrals/button/IWButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as actions from "../../../global/actions/userAction";
import Switch from "@material-ui/core/Switch";
import PersonalSettings from "./settings/profileSettings";

type ISettingsPageProps = AbstractProps & { test: string };
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    gridItems: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    cards: {
        width: "50%",
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
        border: "none",
        boxShadow: "none",
        backgroundColor: "rgba(240, 240, 240,0.8)",
        display: "flex",
        flexDirection: "row",
    },
    cardHeadingCard: {
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
        boxShadow: "none",
        backgroundColor: "rgba(240, 240, 240,0.8)",
        marginLeft: "0px",
        textAlign: "center",
    },
    cardHeadingDiv: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
    },
    card1Div1: {
        width: "33%",
        padding: "5%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    card1Div2: {
        width: "33%",
        padding: "2%",
        display: "flex",
        flexDirection: "column",
    },
    card2Divs: {
        width: "50%",
        padding: "2%",
        display: "flex",
        flexDirection: "column",
    },
    card1Div3: {
        width: "33%",
        padding: "2%",
        display: "flex",
        flexDirection: "column",
    },
    fcontrolTwo: {
        height: "100%",
        width: "50%",
    },
    fcontrolOne: {
        height: "100%",
        width: "50%",
    },
    textField: {
        fontSize: "20px",
        width: "100%",
        marginTop: "2%",
    },
    formControl: {
        marginTop: "10%",
    },
}));
const SettingsPage: React.FC<ISettingsPageProps> = (
    props: ISettingsPageProps
) => {
    const dispatch = useDispatch();
    const user = useSelector<any>((state) => state.userInfo) as any;
    const classes = useStyles();
    const [qsAccountData, setQsAcntData] = React.useState();

    return (
        <React.Fragment>
            <Grid container className={classes.root}>
                <PersonalSettings
                    editable={user && user.role === "User" ? true : false}
                    classes={classes}
                />

                {/* <Grid
                    item
                    xs={12}
                    style={{
                        width: "100%",
                        height: "400px",
                    }}
                ></Grid> */}
                {/* <PrettoSlider
                valueLabelDisplay="auto" 
                aria-label="pretto slider"
                defaultValue={20}
            /> */}
            </Grid>
        </React.Fragment>
    );
};

export default SettingsPage;
