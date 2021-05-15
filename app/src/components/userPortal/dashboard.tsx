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
    const [userEmail, setUserEmail] = React.useState("");
    React.useEffect(() => {
        if (user) setUserEmail(user.accountSettings.email);
    }, [user]);

    const syncCall = () => {
        _apiCall("GET", `${process.env.REACT_APP_SERVER}/cron/qsSync`, {
            Authorization: `Bearer ${localStorage.getItem("investway_token")}`,
        })
            .then((res) => {
                console.log(`\n\RES FROM SYNC CALL\n\n`);
                console.log(res);
            })
            .catch((err) => {
                console.log(`\n\nERROR IN SYNC CALL\n\n`);
                console.log(err);
            });
    };

    return (
        <React.Fragment>
            {props.test}
            <h1>{userEmail}</h1>
            <Button
                onClick={() => syncCall()}
                color="primary"
                variant="contained"
            >
                Sync
            </Button>
        </React.Fragment>
    );
};
export default Dashboard;
