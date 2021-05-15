import * as React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import {
    Button,
    Checkbox,
    Fade,
    FormControlLabel,
    makeStyles,
    Snackbar,
    TextField,
    Typography,
} from "@material-ui/core";
import IWButton from "../integrals/button/IWButton";
import { AbstractProps } from "../../../..";
import Grow from "@material-ui/core/Grow";
import store from "../../../global/store/store";
import {
    asyncAuth,
    tryAutoAuthentication,
} from "../../../global/actions/userAction";
import { v4 as uuidv4 } from "uuid";
import { _apiCall } from "../../../../utils/Axios";
import { AxiosResponse } from "axios";

type UserLoginProps = AbstractProps & {
    open: boolean;
    handleUserLoginModal: () => void;
    type: string;
};

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: "white ",
        height: "400px",
        width: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    loginButton: {
        backgroundColor: "#808BEC",
        color: "#FFFFFF",
        fontSize: "15px",
        width: "80%",
        height: "12%",
        marginTop: "5%",
    },
    textField: {
        width: "80%",
        marginTop: "5%",
    },
}));

const UserLogin: React.FC<UserLoginProps> = (props: UserLoginProps) => {
    const [snacBarObj, setSnackBarObj] = React.useState({
        open: false,
        message: "",
    });
    const classes = useStyles();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [checked, setChecked] = React.useState({ val: false, chkTkn: "" });
    const handleChecked = async () => {
        if (
            !checked.val &&
            email.toString().trim() !== "" &&
            password.toString().trim() !== ""
        ) {
            localStorage.setItem("email", email);
            const chk = uuidv4();
            localStorage.setItem("chkTkn", chk);
            setChecked({ val: true, chkTkn: chk });
        } else if (
            checked.val ||
            email.toString().trim() === "" ||
            password.toString().trim() === ""
        ) {
            localStorage.removeItem("email");
            localStorage.removeItem("chkTkn");
            localStorage.removeItem("athTkn");
            setChecked({ val: false, chkTkn: "" });
        }
    };
    const handelInput = (event, type) => {
        if (type === "email") {
            setEmail(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    };
    const auth = async () => {
        const path = localStorage.getItem("path");
        if (path && path.trim() !== "") {
            localStorage.removeItem("path");
        }
        const result = await store.dispatch(
            asyncAuth({ email, password, chkTkn: checked["chkTkn"] })
        );
        if (!result) {
            setSnackBarObj({
                open: true,
                message: result ? result : "Email or password incorrect",
            });
        }
        // } else {
        //     props.history.push("/user/dashboard");
        // }
    };

    React.useEffect(() => {
        if (
            localStorage.getItem("email") &&
            localStorage.getItem("email").trim() !== "" &&
            localStorage.getItem("chkTkn") &&
            localStorage.getItem("chkTkn").trim() !== ""
        ) {
            setEmail(localStorage.getItem("email"));
            setChecked({ val: true, chkTkn: localStorage.getItem("chkTkn") });
            if (
                localStorage.getItem("athTkn") &&
                localStorage.getItem("athTkn").trim() !== ""
            ) {
                const chkTknAuthUrl =
                    process.env.REACT_APP_API +
                    "/users/rqpsd?athTkn=" +
                    localStorage.getItem("athTkn") +
                    "&email=" +
                    localStorage.getItem("email");
                _apiCall<AxiosResponse>("GET", chkTknAuthUrl)
                    .then((res) => {
                        const { isOk, psd } = res.data;
                        if (isOk) {
                            setPassword(psd);
                        } else {
                            setPassword(uuidv4());
                        }
                    })
                    .catch((err) => {
                        setPassword(uuidv4());
                    });
            } else {
                setPassword(uuidv4());
            }
        }
    }, []);

    const fadeModal = () => {
        return (
            <React.Fragment>
                <Typography variant="h3">Login</Typography>
                <TextField
                    className={classes.textField}
                    value={email}
                    onChange={(event) => handelInput(event, "email")}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    value={password}
                    onChange={(event) => handelInput(event, "password")}
                    id="outlined-basic"
                    label="Password"
                    type="password"
                    variant="outlined"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checked"
                            color="primary"
                            checked={checked.val}
                            onChange={handleChecked}
                        />
                    }
                    label="Save Credentials"
                />
                <IWButton
                    type="userLogin"
                    onClickEvent={() => {
                        auth();
                    }}
                    label="Login"
                />
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <Snackbar
                open={snacBarObj.open}
                onClose={() => {
                    setSnackBarObj({ open: false, message: "" });
                }}
                message={snacBarObj.message}
            />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.open}
                onClose={props.handleUserLoginModal}
                BackdropComponent={Backdrop}
                closeAfterTransition={true}
                BackdropProps={{
                    timeout: 500,
                }}
                className={classes.modal}
            >
                <Grow in={props.open}>
                    <div className={classes.paper}>
                        {props.type === "QS" ? (
                            <h1>Comming Soon</h1>
                        ) : (
                            fadeModal()
                        )}
                    </div>
                </Grow>
            </Modal>
        </React.Fragment>
    );
};

export default UserLogin;
