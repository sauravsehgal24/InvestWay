import { CssBaseline, makeStyles } from "@material-ui/core";
import * as React from "react";
import { AbstractProps } from "../../../..";

import Nav from "../sharedComponents/Nav";

type IUserLandingPageProps = AbstractProps & {};

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const UserLandingPage: React.FC<IUserLandingPageProps> = (
    props: IUserLandingPageProps
) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.root}>
                <CssBaseline />
                <Nav {...props} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <h1>BODY</h1>
                </main>
            </div>
        </React.Fragment>
    );
};

export default UserLandingPage;
