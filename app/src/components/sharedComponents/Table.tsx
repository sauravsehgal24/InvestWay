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
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

import { AbstractProps } from "../../../..";
export type IWTablePath = "executions" | "orders" | "positions";
type IWTableProps = AbstractProps & {
    path: IWTablePath;
    data: any;
};

const useStyles = makeStyles({
    table: {
        border: "0.2px solid rgba(0,0,0,0.2)",
        boxShadow: "8px 13px 19px -12px rgba(0,0,0,0.63)",
    },
});

const IWTable: React.FC<IWTableProps> = (props) => {
    const classes = useStyles();
    const colVal = (val) => {
        if (val === true) {
            return <CheckIcon style={{ color: "green" }} />;
        } else if (val === false) {
            return <CloseIcon style={{ color: "red" }} />;
        } else return val;
    };
    return (
        <React.Fragment>
            <TableContainer component={Paper} className={classes.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {props.data &&
                                props.data.length !== 0 &&
                                Object.keys(props.data[0]).map((key) => {
                                    return (
                                        <TableCell style={{ fontSize: "20px" }}>
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
                                                    style={{ fontSize: "18px" }}
                                                >
                                                    {colVal(d[key])}
                                                </TableCell>
                                            );
                                        })}
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
