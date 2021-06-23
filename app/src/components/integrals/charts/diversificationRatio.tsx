import * as React from "react";
import {
    makeStyles,
    Button,
    Typography,
    CardHeader,
    CardContent,
    Card,
} from "@material-ui/core";
import { AbstractProps } from "../../../../..";
import { Chart } from "chart.js";

type IDiversificationProps = AbstractProps & {
    ratio: number;
};
const useStyles = makeStyles((theme) => ({
    card: {
        width: "90%",
        height: "55%",
        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: "4%",
            height:"100%"
        },
        boxShadow: "21px 19px 0px -5px rgba(80,83,84,0.92)",
    },
    cardBody: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    ratio: {
        textAlign: "center",
        marginTop: "30%",
        fontSize: "70px",
        fontWeight: 1000,
        [theme.breakpoints.down("md")]: {
            fontSize: "40px",
        },
    },
    standing: {
        fontSize: "50px",
        fontWeight: 1000,
        [theme.breakpoints.down("md")]: {
            fontSize: "30px",
        }
    },heading:{
      width:"100%",
      margin:"3%"      
    }
}));

const DiversificationChart: React.FC<IDiversificationProps> = (props) => {
    const getStanding = () => {
        if (props.ratio < 40) {
            return { text: "Bad ", color: "#00ffa6" };
        } else if (props.ratio <= 50) {
            return { text: "Average ", color: "#00ffa6" };
        } else {
            return { text: "Good ", color: "#00ffa6" };
        }
    };
    const buildChart = () => {
        const data = {
            labels: [],
            datasets: [
                {
                    label: "My First Dataset",
                    data: [16, 16, 16, 16, 16, 16],
                    backgroundColor: [
                        "rgba(255, 99, 132,0)",
                        "rgba(54, 162, 235,0)",
                        "rgba(255, 205, 86,0)",
                        "rgb(255, 99, 132)",
                        "rgb(255, 205, 86)",
                        "rgba(3, 252, 144,0.8)",
                    ],
                    hoverOffset: 0,
                },
            ],
        };
        const ctx = document.getElementById("chart2") as Chart.ChartItem;
        const ctx22 = document.getElementById("chart2.2") as Chart.ChartItem;
        var options1 = {
            type: "doughnut",
            data: {
                labels: ["Red", "Orange", "Green"],
                datasets: [
                    {
                        label: "# of Votes",
                        data: [33, 33, 33],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.8)",
                            "rgba(255, 205, 86,0.8)",
                            "rgba(3, 252, 144, 0.8)",
                        ],
                        borderColor: [
                            "rgba(255, 255, 255 ,1)",
                            "rgba(255, 255, 255 ,1)",
                            "rgba(255, 255, 255 ,1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            //Here: by default r is considered constant so circumference is equated with angle directly
            options: {
                animation: false,
                rotation: Math.PI,
                circumference: Math.PI,
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: false,
                },
                cutoutPercentage: 70,
            },
        };

        var options2 = {
            type: "doughnut",
            data: {
                labels: ["", "Purple", ""],
                datasets: [
                    {
                        data: [props.ratio - 1, 1, 100 - props.ratio],
                        backgroundColor: [
                            "rgba(0,0,0,0)",
                            "rgba(255,255,255,1)",
                            "rgba(0,0,0,0)",
                        ],
                        borderColor: [
                            "rgba(0, 0, 0 ,0)",
                            "rgba(0, 0, 0, 1)",
                            "rgba(0, 0, 0 ,0)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                cutoutPercentage: 50,
                rotation: 1 * Math.PI,
                circumference: 1 * Math.PI,
                legend: {
                    display: false,
                },
                tooltips: {
                    enabled: false,
                },
            },
        };

        const chart2 = new Chart.Chart(ctx, options1);
        const chart22 = new Chart.Chart(ctx22, options2);
    };
    const classes = useStyles();
    React.useEffect(() => {
        buildChart();
    }, []);
    return (
        <React.Fragment>
            <Card className={classes.card}>
            <div className={classes.heading}>
                <Typography variant="h3">
                    Diversification Standing
                </Typography>
            </div>
                <CardContent className={classes.cardBody}>
                    <div
                        style={{
                            width: "100%",
                        }}
                    >
                        <canvas
                            style={{ position: "absolute" }}
                            id="chart2"
                        ></canvas>
                        <canvas
                            style={{ position: "absolute" }}
                            id="chart2.2"
                        ></canvas>
                        <h1 className={classes.ratio}>{props.ratio} %</h1>
                    </div>
                </CardContent>
            </Card>

            {/* <Typography
                        variant="h1"
                        style={{ color: "rgba(0, 0, 0,0.5)" }}
                    >
                        <span style={{ fontWeight: 1000 }}>
                            Diversification
                        </span>
                    </Typography>
                    <div
                        style={{
                            marginTop: "3%",
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <span className={classes.ratio}>{props.ratio} %</span>
                        <hr></hr>
                        <span
                            className={classes.standing}
                            style={{ color: getStanding().color }}
                        >
                            {getStanding().text}
                        </span>
                    </div> */}
        </React.Fragment>
    );
};

export default DiversificationChart;
