import * as React from "react";
import { AbstractProps } from "../../../../..";
import { Button, Box, makeStyles, Card, CardContent, TextField, Typography } from "@material-ui/core";
import { Chart } from "chart.js";
import {
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import IWButton from "../button/IWButton";

type OpenPnLChartProps = AbstractProps & {
    balances: Array<any>;
};
const useStyles = makeStyles((theme) => ({
    card: {
        width: "90%",
        //height: "100%",
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
        boxShadow: "21px 19px 0px -5px rgba(80,83,84,0.92)",
        display:"flex",
        flexDirection:"column",
        // justifyContent:"center",
        // alignItems:"center"
    },openPNLFilters:{
        width:"100%",
        margin:"3%",
        display:"flex",
        flexDirection:"row",
        //height:"40px"
    },textField:{
        width:"25%",
    }
}));
const OpenPnLChart: React.FC<OpenPnLChartProps> = (props) => {
    const classes = useStyles();
    const buildBalancesChart = () => {
        const balances = props.balances;
        let labels:any = [];
        let openpnl:any = [];
        let cash:any = [];
        let mktVal:any = [];
        balances.map((balance) => {
            balance.recordHistory.map((history) => {
                labels = [...labels, history];
                openpnl = [...openpnl, balance.openPAndL];
                cash = [...cash, balance.detail.perCurrencyBalances[0].cash];
                mktVal = [
                    ...mktVal,
                    balance.detail.perCurrencyBalances[0].marketValue,
                ];
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
                        borderColor: ["#03fcca"],
                        borderWidth: 1,
                    },
                    {
                        label: "Cash",
                        data: cash,
                        borderColor: ["#0ffc03"],
                        borderWidth: 1,
                    },
                    {
                        label: "Holding's Market Value",
                        data: mktVal,
                        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                        borderColor: ["#fc0324"],
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
            <div className={classes.openPNLFilters}>
                <Typography variant="h3" style={{marginRight:"3%"}}>
                    PoLo <br></br>Timeline
                </Typography>
            <TextField
        id="date"
        label="Start Date"
        type="date"
        variant="filled"
        defaultValue={"2017-05-24"}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      /><TextField
      id="date"
      label="End Date"
      type="date"
      style={{marginLeft:"2%"}}
      variant="filled"
      defaultValue="2017-05-24"
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
    />

        <IWButton
            type="userLogin"
            onClickEvent={() => {
               
            }}
            in={true}
            label="Pull"
            styles={{width:"10%",height:"97%",marginLeft:"4%",marginTop:"0"}}
        />


            </div>
            <CardContent>
                <canvas id="chart1"></canvas>
            </CardContent>
        </Card>
    );
};

export default OpenPnLChart;
