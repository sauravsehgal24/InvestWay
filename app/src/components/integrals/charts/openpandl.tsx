import * as React from "react";
import { AbstractProps } from "../../../../..";
import { Button, Box, makeStyles, Card, CardContent } from "@material-ui/core";
import { Chart } from "chart.js";

type OpenPnLChartProps = AbstractProps & {
    balances: Array<any>;
};
const useStyles = makeStyles({
    card: {
        width: "50%",
        boxShadow: "21px 19px 0px -5px rgba(80,83,84,0.92)",
    },
});
const OpenPnLChart: React.FC<OpenPnLChartProps> = (props) => {
    const classes = useStyles();
    const buildBalancesChart = () => {
        const balances = props.balances;
        let labels = [];
        let openpnl = [];
        balances.map((balance) => {
            balance.recordHistory.map((history) => {
                labels = [...labels, history];
                openpnl = [...openpnl, balance.openPAndL];
            });
        });
        console.log(labels);
        console.log(openpnl);
        const ctx = document.getElementById("chart1") as Chart.ChartItem;
        const chart1 = new Chart.Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Open Profit and Loss",
                        data: openpnl,
                        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                        borderColor: ["rgba(255, 99, 132, 1)"],
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
                    xAxes: [
                        {
                            display: false, //this will remove all the x-axis grid lines
                            ticks: {
                                display: false, //this will remove only the label
                            },
                        },
                    ],
                },
                elements: {
                    line: {
                        fill: false,
                    },
                },
            },
        });
    };
    React.useEffect(() => {
        buildBalancesChart();
    }, []);
    return (
        <Card className={classes.card}>
            <CardContent>
                <canvas id="chart1"></canvas>
            </CardContent>
        </Card>
    );
};

export default OpenPnLChart;
