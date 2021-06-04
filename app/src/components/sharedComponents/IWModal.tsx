import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {
    Button,
    Box,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Modal,
    Grow,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";

import { AbstractProps } from "../../../..";
import IWButton from "../integrals/button/IWButton";
import { PromiseProvider } from "mongoose";
export type IWModalProps = AbstractProps & {
    modalOpen: boolean;
    handleOnClose;
    modalType: "balanceModal" | "loginModal" | "updatePasswordModal";
    user: any;
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
        width: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
}));

const IWModal: React.FC<IWModalProps> = (props: IWModalProps) => {
    const [snacBarObj, setSnackBarObj] = React.useState({
        open: false,
        message: "",
    });

    const [passwordUpdateObj, setPasswordUpdateObj] = React.useState({
        currentPassword: { val: "", error: false, errorMessage: "" },
        newPassword: { val: "", error: false, errorMessage: "" },
        confirmPassword: { val: "", error: false, errorMessage: "" },
    });

    const classes = useStyles();

    const _balanceModal = () => {
        return (
            <React.Fragment>
                <Typography variant="h1" style={{ marginBottom: "2%" }}>
                    <u>
                        <strong>Balance</strong>
                    </u>
                </Typography>
                {Object.keys((props.user as any).qsProfileData.latestBalance)
                    .filter((key) => {
                        return key !== "updateDate" && key !== "createdDate";
                    })
                    .map((key) => {
                        return (
                            <Typography
                                variant="h3"
                                style={{ marginTop: "3%" }}
                            >
                                <strong>{key}:</strong> &nbsp;
                                {key !== "isRealTime"
                                    ? props.user.qsProfileData.latestBalance[
                                          key
                                      ]
                                    : props.user.qsProfileData.latestBalance[
                                          key
                                      ]
                                    ? "Yes"
                                    : "No"}
                            </Typography>
                        );
                    })}
            </React.Fragment>
        );
    };

    const _loginModal = () => {
        return (
            <React.Fragment>
                <Typography variant="h3">Login</Typography>
            </React.Fragment>
        );
    };
    const validatePasswordStuff = () => {
        if (
            passwordUpdateObj.currentPassword.val.trim() === "" ||
            (passwordUpdateObj.confirmPassword.val.trim() === "" &&
                passwordUpdateObj.newPassword.val.trim() === "")
        ) {
            setPasswordUpdateObj({
                ...passwordUpdateObj,
                currentPassword: {
                    val: passwordUpdateObj.currentPassword.val,
                    error: true,
                    errorMessage: "Incorrect Current Password",
                },
            });
        }
        if (
            passwordUpdateObj.newPassword.val.trim() !==
            passwordUpdateObj.confirmPassword.val.trim()
        ) {
            setPasswordUpdateObj({
                ...passwordUpdateObj,
                confirmPassword: {
                    val: passwordUpdateObj.confirmPassword.val,
                    error: true,
                    errorMessage: "No Match",
                },
            });
        } else {
            //make api call to validate password
        }
    };
    const _updatePasswordModal = () => {
        return (
            <React.Fragment>
                {[
                    { label: "Current Password", text: "currentPassword" },
                    { label: "New Password", text: "newPassword" },
                    { label: "Confirm New Password", text: "confirmPassword" },
                ].map((key) => {
                    return (
                        <TextField
                            error={passwordUpdateObj[key.text].error}
                            value={passwordUpdateObj[key.text].val}
                            type="password"
                            onChange={(e) => {
                                setPasswordUpdateObj({
                                    ...passwordUpdateObj,
                                    [key.text]: {
                                        val: e.target.value,
                                        error: "",
                                        errorMessage: "",
                                    },
                                });
                            }}
                            helperText={
                                passwordUpdateObj[key.text].errorMessage
                            }
                            placeholder={key.label}
                            style={{ width: "70%", marginBottom: "3%" }}
                        ></TextField>
                    );
                })}
                <IWButton
                    type="updateSettings"
                    label="Update Password"
                    onClickEvent={validatePasswordStuff}
                />
            </React.Fragment>
        );
    };

    const renderModal = {
        balanceModal: _balanceModal,
        loginModal: _loginModal,
        updatePasswordModal: _updatePasswordModal,
    }[props.modalType];
    return (
        <React.Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.modalOpen}
                onClose={props.handleOnClose}
                BackdropComponent={Backdrop}
                closeAfterTransition={true}
                BackdropProps={{
                    timeout: 500,
                }}
                className={classes.modal}
            >
                <Grow in={props.modalOpen}>
                    <div
                        className={classes.paper}
                        style={{
                            height:
                                props.modalType === "updatePasswordModal"
                                    ? "300px"
                                    : "600px",
                        }}
                    >
                        {renderModal()}
                    </div>
                </Grow>
            </Modal>
        </React.Fragment>
    );
};
export default IWModal;
