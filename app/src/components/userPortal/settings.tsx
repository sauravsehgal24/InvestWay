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
const avatar = require("../../../assets/images/avatar.jpg").default;
type ISettingsPageProps = AbstractProps & { test: string };
const useStyles = makeStyles({
    root: {
        marginTop: "5%",
    },
    gridItems: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    cards: {
        width: "50%",
        height: "100%",
        border: "0.5px solid black",
        boxShadow: "8px 13px 19px -12px rgba(0,0,0,0.63)",
        display: "flex",
        flexDirection: "row",
    },
    cardHeadingCard: {
        //width: "20%",
        border: "0.5px solid black",
        boxShadow: "8px 13px 19px -12px rgba(0,0,0,0.63)",
        backgroundColor: "#e8e8e8",
        marginLeft: "0px",
    },
    card1Div1: {
        height: "100%",
        width: "30%",
        padding: "5%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    card1Div2: {
        height: "100%",
        width: "70%",
        padding: "2%",
        display: "flex",
        flexDirection: "row",
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
    },
    formControl: {
        marginTop: "4%",
    },
});
const SettingsPage: React.FC<ISettingsPageProps> = (
    props: ISettingsPageProps
) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container className={classes.root}>
                <Grid
                    item
                    className={classes.gridItems}
                    xs={12}
                    style={{
                        width: "100%",
                        height: "400px",
                    }}
                >
                    <div
                        style={{
                            width: "50%",
                            display: "flex",
                            alignItems: "flex-start",
                        }}
                    >
                        <Card className={classes.cardHeadingCard}>
                            <Typography variant="h1">
                                PROFILE SETTINGS
                            </Typography>
                        </Card>
                    </div>
                    <Card className={classes.cards}>
                        <Grid container>
                            <Grid
                                item
                                md={12}
                                sm={12}
                                xs={12}
                                lg={4}
                                xl={4}
                                className={classes.card1Div1}
                            >
                                <Avatar
                                    variant="square"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        border: "0.2px solid rgba(0,0,0,0.6)",
                                    }}
                                    src={avatar}
                                ></Avatar>
                                <IconButton aria-label="delete">
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                            <Grid
                                item
                                md={12}
                                sm={12}
                                xs={12}
                                lg={8}
                                xl={8}
                                className={classes.card1Div2}
                            >
                                <div
                                    id="fcontrolOne"
                                    className={classes.fcontrolOne}
                                >
                                    <FormControl
                                        className={classes.formControl}
                                    >
                                        <InputLabel
                                            error={false}
                                            htmlFor="name"
                                            style={{ fontSize: "20px" }}
                                        >
                                            <Typography variant="h3">
                                                Name
                                            </Typography>
                                        </InputLabel>
                                        <Input
                                            id="name"
                                            aria-describedby="name"
                                            value="sdadasads"
                                            className={classes.textField}
                                        />
                                        <FormHelperText id="error"></FormHelperText>
                                    </FormControl>
                                    <FormControl
                                        className={classes.formControl}
                                    >
                                        <InputLabel
                                            error={false}
                                            htmlFor="email"
                                            style={{ fontSize: "20px" }}
                                        >
                                            <Typography variant="h3">
                                                Email
                                            </Typography>
                                        </InputLabel>
                                        <Input
                                            id="email"
                                            aria-describedby="email"
                                            value="sdadasads"
                                            className={classes.textField}
                                        />
                                        <FormHelperText id="error"></FormHelperText>
                                    </FormControl>
                                    <FormControl
                                        className={classes.formControl}
                                    >
                                        <InputLabel
                                            error={false}
                                            htmlFor="password"
                                            style={{ fontSize: "20px" }}
                                        >
                                            <Typography variant="h3">
                                                Password
                                            </Typography>
                                        </InputLabel>
                                        <Input
                                            id="email"
                                            aria-describedby="password"
                                            value="sdadasads"
                                            className={classes.textField}
                                        />
                                        <FormHelperText id="error"></FormHelperText>
                                    </FormControl>
                                </div>
                                <div
                                    id="fcontrolTwo"
                                    className={classes.fcontrolTwo}
                                >
                                    <FormControl
                                        className={classes.formControl}
                                    >
                                        <InputLabel
                                            error={false}
                                            htmlFor="phone"
                                            style={{ fontSize: "20px" }}
                                        >
                                            <Typography variant="h3">
                                                Phone
                                            </Typography>
                                        </InputLabel>
                                        <Input
                                            id="email"
                                            aria-describedby="phone"
                                            value="sdadasads"
                                            className={classes.textField}
                                        />
                                        <FormHelperText id="error"></FormHelperText>
                                    </FormControl>
                                    <FormControl
                                        className={classes.formControl}
                                    >
                                        <InputLabel
                                            error={false}
                                            htmlFor="Address"
                                            style={{ fontSize: "20px" }}
                                        >
                                            <Typography variant="h3">
                                                Address
                                            </Typography>
                                        </InputLabel>
                                        <Input
                                            id="email"
                                            aria-describedby="email"
                                            value="sdadasads"
                                            className={classes.textField}
                                        />
                                        <FormHelperText id="error"></FormHelperText>
                                    </FormControl>

                                    <FormControl
                                        className={classes.formControl}
                                    >
                                        <InputLabel
                                            error={false}
                                            htmlFor="Profile Status"
                                            style={{ fontSize: "20px" }}
                                        >
                                            <Typography variant="h3">
                                                Profile Status
                                            </Typography>
                                        </InputLabel>
                                        <Input
                                            id="Profile Status"
                                            aria-describedby="Profile Status"
                                            value="Active"
                                            className={classes.textField}
                                        />
                                        <FormHelperText id="error"></FormHelperText>
                                    </FormControl>
                                    <IWButton
                                        type="updateSettings"
                                        onClickEvent={() => {}}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{
                        width: "100%",
                        height: "400px",
                    }}
                ></Grid>
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
