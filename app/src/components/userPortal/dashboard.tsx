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
type DashboardProps = {
    test: string;
};
const useStyles = makeStyles({
    card: {
        width: "50%",
        border: "0.5px solid black",
        boxShadow: "8px 13px 19px -12px rgba(0,0,0,0.63)",
    },
});
const Dashboard: React.FC<DashboardProps> = (props) => {
    const user = useSelector<any>((state) => state.userInfo) as any;
    const classes = useStyles();
    //const chart1 = React.createRef<HTMLCanvasElement>();
    const buildBarChart = () => {
        const ctx = document.getElementById("chart1") as Chart.ChartItem;
        const chart1 = new Chart.Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [
                    {
                        label: "# of Votes",
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },

            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });
    };

    React.useEffect(() => {
        buildBarChart();
    }, []);

    return (
        <React.Fragment>
            <Card className={classes.card}>
                <CardContent>
                    <canvas id="chart1"></canvas>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};
export default Dashboard;
