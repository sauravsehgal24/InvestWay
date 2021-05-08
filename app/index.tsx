import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import globalThemeObject from "./themes/globalTheme";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import store from "./global/store/store";

const defaultTheme = createMuiTheme(globalThemeObject.globalTheme);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={defaultTheme}>
                <Router>
                    <App context="root" />
                </Router>{" "}
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
