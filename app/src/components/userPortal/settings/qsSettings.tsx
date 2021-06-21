import { AbstractProps } from "../../../../..";
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
import IWButton from "../../integrals/button/IWButton";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../global/actions/userAction";

type IQsSettingsProps = AbstractProps & { editable: boolean; classes; user };
const useStyles = makeStyles((theme) => ({
    card: {
        width: "50%",
        height: "100%",
        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: "4%",
        },
        boxShadow: "21px 19px 0px -5px rgba(80,83,84,0.92)",
    },
    content: {
        display: "flex",
        height: "400px",
        justifyContent: "center",
        alignItems: "center",
    },
}));

const QsSettings: React.FC<IQsSettingsProps> = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid
                item
                className={props.classes.gridItems}
                md={12}
                sm={12}
                xs={12}
                lg={12}
                xl={12}
                style={{
                    width: "100%",
                    height: "400px",
                    marginTop: "3%",
                }}
            >
                <div className={props.classes.cardHeadingDiv}>
                    <Card className={props.classes.cardHeadingCard}>
                        <Typography variant="h1">QS SETTINGS</Typography>
                    </Card>
                </div>
                <Card className={classes.card}>
                    <Grid container>
                        <Grid
                            item
                            md={12}
                            sm={12}
                            xs={12}
                            lg={12}
                            xl={12}
                            className={classes.content}
                        >
                            <Typography variant="h1">Comming Soon</Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </React.Fragment>
    );
};
export default QsSettings;
