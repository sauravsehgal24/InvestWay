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
    IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import * as actions from "../../../global/actions/userAction";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { AbstractProps } from "../../../..";
import { useDispatch, useSelector } from "react-redux";
export type IWTablePath = "executions" | "orders" | "positions" | "accounts";
type IWTableProps = AbstractProps & {
    path: IWTablePath;
    data: any;
};

const useStyles = makeStyles({
    table: {
        border: "none",
        boxShadow: "none",
        backgroundColor: "rgba(224, 224, 224,0.5)",
    },
});

const IWTable: React.FC<IWTableProps> = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const colVal = (val) => {
        if (val === true) {
            return <CheckIcon style={{ color: "green" }} />;
        } else if (val === false) {
            return <CloseIcon style={{ color: "red" }} />;
        } else return val;
    };
    const setBalanceInfo = () => {
        if (props.path === "accounts") {
        }
    };
    const user = useSelector<{ userInfo }>((state) => state.userInfo);
    return (
        <React.Fragment>
            <TableContainer component={Paper} className={classes.table}>
                <Table>
                    <TableHead
                        style={{
                            backgroundColor: "rgba(212, 212, 212,0.6)",
                            boxShadow: "none",
                        }}
                    >
                        <TableRow style={{}}>
                            {props.data &&
                                props.data.length !== 0 &&
                                Object.keys(props.data[0]).map((key) => {
                                    return (
                                        <TableCell
                                            style={{
                                                fontSize: "20px",
                                                textAlign: "center",
                                            }}
                                        >
                                            {key[0]
                                                .toString()
                                                .toUpperCase()
                                                .toString()
                                                .concat(
                                                    key.substring(1, key.length)
                                                )}
                                        </TableCell>
                                    );
                                })}
                            {props.path === "accounts" && (
                                <TableCell
                                    style={{
                                        fontSize: "20px",
                                        textAlign: "center",
                                    }}
                                >
                                    Balance Info
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data &&
                            props.data.length !== 0 &&
                            props.data.map((d, index, array) => {
                                return (
                                    <TableRow>
                                        {Object.keys(d).map((key) => {
                                            return (
                                                <TableCell
                                                    style={{
                                                        fontSize: "18px",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {colVal(d[key])}
                                                </TableCell>
                                            );
                                        })}
                                        {props.path === "accounts" && (
                                            <TableCell
                                                style={{ textAlign: "center" }}
                                                onClick={(e) => {
                                                    dispatch(
                                                        actions.toggleModal(
                                                            true,
                                                            "balanceModal"
                                                        )
                                                    );
                                                }}
                                            >
                                                <IconButton>
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
};
export default IWTable;
