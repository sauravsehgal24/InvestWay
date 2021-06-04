import { AbstractProps } from "../../../../..";
import * as React from "react";
import {
    withStyles,
    makeStyles,
    Theme,
    createStyles,
} from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
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
import IWButton from "../../integrals/button/IWButton";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../global/actions/userAction";

type IPersonalSettingsProps = AbstractProps & { editable: boolean; classes };

const PersonalSettings: React.FC<IPersonalSettingsProps> = (
    props: IPersonalSettingsProps
) => {
    const dispatch = useDispatch();
    const user = useSelector<any>((state) => state.userInfo) as any;
    const handlePersonalSettingsChange = (e, type) => {
        setPersonalSettings({ ...personalSettings, [type]: e.target.value });
    };
    const [personalSettings, setPersonalSettings] = React.useState({
        Name: "",
        Email: "",
        Address: "",
        Phone: "",
        ProfileStatus: false,
        debugMode: false,
        Password: "",
    });
    const personalSettingsData = [
        "Name",
        "Email",
        "Password",
        "Phone",
        "Address",
        "ProfileStatus",
        "Update",
    ];
    React.useEffect(() => {
        if (user) {
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

    const handleChangePassowrdModal = () => {
        dispatch(actions.toggleModal(true, "updatePasswordModal"));
    };

    return (
        <React.Fragment>
            <Grid
                item
                className={props.classes.gridItems}
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
                <div className={props.classes.cardHeadingDiv}>
                    <Card className={props.classes.cardHeadingCard}>
                        <Typography variant="h1">PROFILE SETTINGS</Typography>
                    </Card>
                </div>
                <Card className={props.classes.cards}>
                    <Grid container>
                        <Grid
                            item
                            md={12}
                            sm={12}
                            xs={12}
                            lg={4}
                            xl={4}
                            className={props.classes.card1Div1}
                        >
                            <Avatar
                                variant="square"
                                style={{
                                    height: "300px",
                                    width: "100%",
                                    border: "0.2px solid rgba(0,0,0,0.6)",
                                }}
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
                                    className={props.classes.card1Div2}
                                >
                                    {personalSettingsData
                                        .slice(
                                            count,
                                            count === 0
                                                ? count + 3
                                                : personalSettingsData.length
                                        )
                                        .map((pData) => {
                                            if (pData === "Password") {
                                                return (
                                                    <IWButton
                                                        label="Change Password"
                                                        type="updateSettings"
                                                        styles={{
                                                            width: "100%",
                                                            backgroundColor:
                                                                "red",
                                                        }}
                                                        onClickEvent={
                                                            handleChangePassowrdModal
                                                        }
                                                    />
                                                );
                                            } else if (pData === "Update") {
                                                return (
                                                    <IWButton
                                                        type="updateSettings"
                                                        onClickEvent={() => {}}
                                                    />
                                                );
                                            } else {
                                                return (
                                                    <React.Fragment>
                                                        <FormControl
                                                            className={
                                                                props.classes
                                                                    .formControl
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
                                                                disabled={
                                                                    !props.editable
                                                                }
                                                                aria-describedby={pData.toString()}
                                                                className={
                                                                    props
                                                                        .classes
                                                                        .textField
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
                                                                        : (
                                                                              e
                                                                          ) => {
                                                                              handlePersonalSettingsChange(
                                                                                  e,
                                                                                  pData.toString()
                                                                              );
                                                                          }
                                                                }
                                                            />
                                                            <FormHelperText id="error"></FormHelperText>
                                                        </FormControl>
                                                    </React.Fragment>
                                                );
                                            }
                                        })}
                                </Grid>
                            );
                        })}
                    </Grid>
                </Card>
            </Grid>
        </React.Fragment>
    );
};

export default PersonalSettings;
