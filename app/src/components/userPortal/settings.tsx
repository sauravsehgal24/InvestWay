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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as actions from "../../../global/actions/userAction";
import Switch from "@material-ui/core/Switch";

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
        border: "0.2px solid rgba(0,0,0,0.2)",
        boxShadow: "8px 13px 19px -12px rgba(0,0,0,0.63)",
        display: "flex",
        flexDirection: "row",
    },
    cardHeadingCard: {
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
        borderTop: "0.2px solid rgba(0,0,0,0.2)",
        borderLeft: "0.2px solid rgba(0,0,0,0.2)",
        borderRight: "0.2px solid rgba(0,0,0,0.2)",
        boxShadow: "8px 13px 19px -12px rgba(0,0,0,0.63)",
        backgroundColor: "#e8e8e8",
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

    const [personalSettings, setPersonalSettings] = React.useState({
        Name: "",
        Email: "",
        Address: "",
        Phone: "",
        ProfileStatus: false,
        debugMode: false,
        Password: "",
    });
    const [qsAccountData, setQsAcntData] = React.useState();

    const handlePersonalSettingsChange = (e, type) => {
        setPersonalSettings({ ...personalSettings, [type]: e.target.value });
    };

    React.useEffect(() => {
        if (user) {
            setQsAcntData(user.qsProfileData.accounts[0]);
            setPersonalSettings({
                Name: user.name,
                Address: user.accountSettings.address,
                Email: user.accountSettings.email,
                Phone: user.accountSettings.phone,
                ProfileStatus: user.isActivated,
                debugMode: user.debugMode,
                Password: "",
            });
        }
    }, []);

    const personalSettingsData = [
        "Name",
        "Email",
        "Password",
        "Phone",
        "Address",
        "ProfileStatus",
        "Update",
    ];

    return (
        <React.Fragment>
            <Grid container className={classes.root}>
                <Grid
                    item
                    className={classes.gridItems}
                    md={12}
                    sm={12}
                    xs={12}
                    lg={12}
                    xl={12}
                    style={{
                        width: "100%",
                        height: "400px",
                    }}
                >
                    <div className={classes.cardHeadingDiv}>
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
                                        height: "300px",
                                        width: "100%",
                                        border: "0.2px solid rgba(0,0,0,0.6)",
                                    }}
                                    src={avatar}
                                ></Avatar>
                                <IconButton aria-label="delete">
                                    <EditIcon />
                                </IconButton>
                            </Grid>

                            {[0, 3].map((count) => {
                                return (
                                    <Grid
                                        item
                                        md={12}
                                        sm={12}
                                        xs={12}
                                        lg={4}
                                        xl={4}
                                        className={classes.card1Div2}
                                    >
                                        {personalSettingsData
                                            .slice(
                                                count,
                                                count === 0
                                                    ? count + 3
                                                    : personalSettingsData.length
                                            )
                                            .map((pData) => {
                                                return pData === "Update" ? (
                                                    <IWButton
                                                        type="updateSettings"
                                                        onClickEvent={() => {}}
                                                    />
                                                ) : (
                                                    <FormControl
                                                        className={
                                                            classes.formControl
                                                        }
                                                    >
                                                        <InputLabel
                                                            error={false}
                                                            htmlFor={pData.toString()}
                                                            style={{
                                                                fontSize:
                                                                    "20px",
                                                            }}
                                                        >
                                                            <Typography variant="h3">
                                                                {pData}
                                                            </Typography>
                                                        </InputLabel>
                                                        <Input
                                                            id={pData.toString()}
                                                            aria-describedby={pData.toString()}
                                                            className={
                                                                classes.textField
                                                            }
                                                            value={
                                                                personalSettings[
                                                                    pData.toString()
                                                                ]
                                                            }
                                                            onChange={
                                                                pData ===
                                                                    "Password" ||
                                                                pData ===
                                                                    "ProfileStatus"
                                                                    ? () => {}
                                                                    : (e) => {
                                                                          handlePersonalSettingsChange(
                                                                              e,
                                                                              pData.toString()
                                                                          );
                                                                      }
                                                            }
                                                        />
                                                        <FormHelperText id="error"></FormHelperText>
                                                    </FormControl>
                                                );
                                            })}
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Card>
                </Grid>

                <Grid
                    item
                    className={classes.gridItems}
                    md={12}
                    sm={12}
                    xs={12}
                    lg={12}
                    xl={12}
                    style={{
                        width: "100%",
                        height: "400px",
                        marginTop: "2%",
                    }}
                >
                    <div className={classes.cardHeadingDiv}>
                        <Card className={classes.cardHeadingCard}>
                            <Typography variant="h1">
                                QUESTRADE ACCOUNT(S)
                            </Typography>
                        </Card>
                    </div>
                    <Card className={classes.cards}>
                        <Grid container>
                            {[0, 3].map((count) => {
                                return (
                                    <Grid
                                        item
                                        md={12}
                                        sm={12}
                                        xs={12}
                                        lg={6}
                                        xl={6}
                                        className={classes.card2Divs}
                                    >
                                        {qsAccountData &&
                                            Object.keys(qsAccountData)
                                                .slice(count, count + 3)
                                                .map((key) => {
                                                    return (
                                                        <FormControl
                                                            className={
                                                                classes.formControl
                                                            }
                                                        >
                                                            <InputLabel
                                                                error={false}
                                                                htmlFor={key}
                                                                style={{
                                                                    fontSize:
                                                                        "20px",
                                                                }}
                                                            >
                                                                <Typography variant="h3">
                                                                    {key[0]
                                                                        .toString()
                                                                        .toUpperCase()
                                                                        .concat(
                                                                            key
                                                                                .toString()
                                                                                .substring(
                                                                                    1,
                                                                                    key.length
                                                                                )
                                                                        )}
                                                                </Typography>
                                                            </InputLabel>
                                                            <Input
                                                                id={key}
                                                                aria-describedby={
                                                                    key
                                                                }
                                                                className={
                                                                    classes.textField
                                                                }
                                                                value={
                                                                    user
                                                                        .qsProfileData
                                                                        .accounts[0][
                                                                        key
                                                                    ]
                                                                }
                                                            />
                                                        </FormControl>
                                                    );
                                                })}
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Card>
                </Grid>
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
