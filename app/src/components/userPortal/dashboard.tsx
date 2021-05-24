import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { Button, Box, makeStyles } from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PersonIcon from "@material-ui/icons/Person";
import { useSelector } from "react-redux";
import { _apiCall } from "../../../../utils/Axios";

type DashboardProps = {
    test: string;
};

const Dashboard: React.FC<DashboardProps> = (props) => {
    const user = useSelector<any>((state) => state.userInfo) as any;
    return <React.Fragment>{props.test}</React.Fragment>;
};
export default Dashboard;
