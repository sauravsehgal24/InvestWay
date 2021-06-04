import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { Button, Box, makeStyles } from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PersonIcon from "@material-ui/icons/Person";
import { useSelector } from "react-redux";
import { _apiCall } from "../../../../utils/Axios";
import CardComponent from "../integrals/cards/defaultCard";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Chart } from "chart.js";
import { useDispatch } from "react-redux";
import OpenPnLChart from "../integrals/charts/openpandl";

type DashboardProps = {
    test: string;
};
const useStyles = makeStyles({
    card: {
        width: "50%",
        boxShadow: "8px 13px 19px -12px rgba(0,0,0,0.63)",
    },
});
const Dashboard: React.FC<DashboardProps> = (props) => {
    const user = useSelector<any>((state) => state.userInfo) as any;
    const classes = useStyles();

    React.useEffect(() => {}, []);

    return (
        <React.Fragment>
            {user && <OpenPnLChart balances={user.qsProfileData.balances} />}
        </React.Fragment>
    );
};
export default Dashboard;
