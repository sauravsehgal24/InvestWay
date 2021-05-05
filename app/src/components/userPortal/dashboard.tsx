import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { Button,Box, makeStyles } from "@material-ui/core";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';

type DashboardProps = {
    test:string
} 

const Dashboard:React.FC<DashboardProps> =  (props)=>{
    return (
        <h1>
            USER PORTAL DASHBOARD {props.test}
        </h1>
    )
}
export default Dashboard
