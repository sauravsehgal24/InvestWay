import {
    Button,
    makeStyles,
    SvgIconTypeMap,
    Typography,
} from "@material-ui/core";
import * as React from "react";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { Variant } from "@material-ui/core/styles/createTypography";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PersonIcon from "@material-ui/icons/Person";

type IWButtonProps = {
    type: "qsLogin" | "userLogin" | "updateSettings";
    label?: string;
    variant?: "text" | "outlined" | "contained";
    size?: "small" | "large" | "medium";
    onClickEvent?: any;
    classes?: any;
    labelType?: "inherit" | Variant;
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    styles?: any;
};

const useStyles = makeStyles((theme) => ({
    qsLogin: {
        fontSize: "17px",
        color: "white",
        height: "70px",
        width: "350px",
        marginTop: "2%",
        backgroundColor: "#00a152",
    },
    userLogin: {
        fontSize: "17px",
        color: "white",
        height: "70px",
        width: "350px",
        marginTop: "1%",
    },
}));

const QsLoginButton = (props) => {
    return (
        <React.Fragment>
            <Button
                onClick={() => {
                    props.onClickEvent();
                }}
                startIcon={<VpnKeyIcon />}
                style={props.styles ? props.styles : {}}
                className={props.classes["qsLogin"]}
                variant="contained"
                size="large"
            >
                <Typography variant="button">
                    {props.label ? props.label : "Login With Questrade"}
                </Typography>
            </Button>
        </React.Fragment>
    );
};

const UserLoginButton = (props) => {
    return (
        <React.Fragment>
            <Button
                onClick={() => {
                    props.onClickEvent();
                }}
                startIcon={<PersonIcon />}
                style={props.styles ? props.styles : {}}
                className={props.classes["userLogin"]}
                variant="contained"
                size="large"
                color="secondary"
            >
                <Typography variant="button">
                    {props.label ? props.label : "Login With Email"}
                </Typography>
            </Button>
        </React.Fragment>
    );
};

const UpdateSettingsButton = () => {
    return <React.Fragment></React.Fragment>;
};

const _button = (props) => {
    return {
        qsLogin: <QsLoginButton {...props} />,
        userLogin: <UserLoginButton {...props} />,
        updateSettings: {},
    }[props.type];
};

const IWButton: React.FC<IWButtonProps> = (props: IWButtonProps) => {
    const classes = useStyles();
    return <React.Fragment>{_button({ ...props, classes })}</React.Fragment>;
};

export default IWButton;
