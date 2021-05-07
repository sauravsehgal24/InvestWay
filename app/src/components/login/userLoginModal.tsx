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

type UserLoginProps = {
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
        height: "500px",
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
        marginTop: "2%",
    },
    textField: {
        width: "80%",
        marginTop: "3%",
    },
    googleButton: {
        color: "#FFFFFF",
        fontSize: "15px",
        width: "80%",
        height: "12%",
        marginTop: "2%",
        marginBottom: "3%",
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
    const [checked, setChecked] = React.useState(false);
    const handleChecked = async () => {
        if (
            !checked &&
            email.toString().trim() !== "" &&
            password.toString().trim() !== ""
        ) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            setChecked(true);
        } else if (
            checked ||
            email.toString().trim() === "" ||
            password.toString().trim() === ""
        ) {
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            setChecked(false);
        }
    };
    const handelInput = (event, type) => {
        if (type === "email") {
            setEmail(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    };
    const auth = () => {
        console.log(
            `EMAIL: ${email},  PASSWORD: ${password}, CHECKED: ${checked}`
        );
    };

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
                            checked={checked}
                            onChange={handleChecked}
                        />
                    }
                    label="Save Credentials"
                />
                <Button
                    onClick={() => auth()}
                    variant="contained"
                    color="primary"
                    className={classes.loginButton}
                >
                    Login
                </Button>
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
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        {props.type === "QS" ? (
                            <h1>Comming Soon</h1>
                        ) : (
                            fadeModal()
                        )}
                    </div>
                </Fade>
            </Modal>
        </React.Fragment>
    );
};

export default UserLogin;
