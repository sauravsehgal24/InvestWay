import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { Button, Box, makeStyles } from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PersonIcon from "@material-ui/icons/Person";
import { useSelector } from "react-redux";

type DashboardProps = {
    test: string;
};

const Dashboard: React.FC<DashboardProps> = (props) => {
    const user = useSelector<any>((state) => state.userInfo) as any;
    const [userEmail, setUserEmail] = React.useState("");
    console.log(user);
    React.useEffect(() => {
        if (user) setUserEmail(user.accountSettings.email);
    }, [user]);
    return (
        <React.Fragment>
            <h1>{props.test}</h1>
            <h1>{userEmail}</h1>
        </React.Fragment>
    );
};
export default Dashboard;
