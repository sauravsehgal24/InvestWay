import { AbstractProps } from "../../../..";
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
import IWButton from "../integrals/button/IWButton";
const avatar = require("../../../assets/images/avatar.jpg").default;
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../global/actions/userAction";

type IQsAccountsPageProps = AbstractProps & {};

const QsAccountsPage: React.FC<IQsAccountsPageProps> = (
    props: IQsAccountsPageProps
) => {
    const dispatch = useDispatch();
    const user = useSelector<any>((state) => state.userInfo) as any;
    return <React.Fragment>QS ACCOUNTS</React.Fragment>;
};
export default QsAccountsPage;
