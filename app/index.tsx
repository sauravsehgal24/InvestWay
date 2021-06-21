import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import globalThemeObject from "./themes/globalTheme";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import store from "./global/store/store";
var URLSearchParams = require('url-search-params');

//https://embed.plnkr.co/JOI1fpgWIS0lvTeLUxUp/
const defaultTheme = createMuiTheme(globalThemeObject.globalTheme);
let path = window.location.pathname.substring(6);
if (path[path.length - 1] === "/") {
    path = path.substring(0, path.length - 1);
}
console.log(`PATH = ${path}`);
console.log(window.location.search.substring(1).split("&"))

const _URLSearchParams = new URLSearchParams(window.location.search.substring(1));
console.log(_URLSearchParams.get("email"))
console.log(_URLSearchParams.get("password"))

if(_URLSearchParams.get("email") && _URLSearchParams.get("email").trim!=="" && _URLSearchParams.get("password") && _URLSearchParams.get("password").trim()!==""){
    localStorage.setItem("_email",_URLSearchParams.get("email"))
    localStorage.setItem("_password",_URLSearchParams.get("password"))
}

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
