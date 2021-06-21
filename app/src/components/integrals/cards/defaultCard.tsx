import * as React from "react";
import { AbstractProps } from "../../../../..";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
type DefaultCardProps = AbstractProps & {
    children: React.ReactNode;
};
const useStyles = makeStyles({
    root: {
        width: 300,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

//https://medium.com/@martin_hotell/react-children-composition-patterns-with-typescript-56dfc8923c64
const CardComponent: React.FC<DefaultCardProps> = (props) => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <Card className={classes.root}>
            <CardContent></CardContent>
            <CardActions></CardActions>
        </Card>
    );
};

export default CardComponent;
