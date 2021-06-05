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
import DiversificationChart from "../integrals/charts/diversificationRatio";

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
            {user && (
                <Grid container style={{ marginTop: "2%" }}>
                    <Grid item xs={12} xl={6} lg={6} md={12} sm={12}>
                        <OpenPnLChart balances={user.qsProfileData.balances} />
                    </Grid>
                    <Grid item xs={12} xl={6} lg={6} md={12} sm={12}>
                        <DiversificationChart
                            ratio={user.accountSettings.qsSettings.dVal}
                        />
                    </Grid>
                </Grid>
            )}
        </React.Fragment>
    );
};
export default Dashboard;
