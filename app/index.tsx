import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import globalThemeObject from "./themes/globalTheme";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import store from "./global/store/store";

//https://embed.plnkr.co/JOI1fpgWIS0lvTeLUxUp/
const defaultTheme = createMuiTheme(globalThemeObject.globalTheme);
let path = window.location.pathname.substring(6);
console.log(`PATH = ${path}`);
localStorage.setItem("path", path);
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={defaultTheme}>
                <Router>
                    <App context="root" path={path} />
                </Router>{" "}
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
