import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { Button, Box, makeStyles } from "@material-ui/core";
import { _apiCall } from "../../../../utils/Axios";
import CardComponent from "../integrals/cards/defaultCard";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { AbstractProps } from "../../../..";
import { useSelector } from "react-redux";
import IWTable, { IWTablePath } from "../sharedComponents/IWTable";

type TabDataProps = AbstractProps & {
    test: string;
};
const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    filtersGrid: {
        // backgroundColor: "red",
    },
    cardFilters: {
        marginTop: "1%",
        width: "100%",
        border: "none",
        boxShadow: "15px 17px 0px -7px rgba(0,0,0,0.6)",
        backgroundColor: "rgba(23,227,123,0.92)",
        marginLeft: "0px",
    },
    tableGrid: {
        display: "flex",
        justifyContent: "center",
        marginTop: "3%",
    },
});
const TabData: React.FC<TabDataProps> = (props) => {
    const user = useSelector<any>((state) => state.userInfo) as any;
    const path = localStorage.getItem("path");
    const dataPath = props.match.params.path;
    const [data, setTabData] = React.useState();
    React.useEffect(() => {
        if (user) {
            setTabData(user.qsProfileData[dataPath]);
        }
    }, [dataPath]);
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container className={classes.root}>
                <Grid
                    item
                    xs={12}
                    md={12}
                    sm={12}
                    lg={12}
                    xl={12}
                    className={classes.filtersGrid}
                >
                    <Card className={classes.cardFilters}>
                        <Typography variant="h1">FILTERS</Typography>
                    </Card>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={12}
                    sm={12}
                    lg={12}
                    xl={12}
                    className={classes.tableGrid}
                >
                    <IWTable
                        path={dataPath as IWTablePath}
                        data={data}
                    ></IWTable>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default TabData;
