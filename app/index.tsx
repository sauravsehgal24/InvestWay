import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import './index.css'
import {
    Route,
    Link,
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from "react-router-dom";

ReactDOM.render(
<Router>
    <App test="saurav"/>
</Router>
, document.getElementById("root"))