import React from "react";
import { render } from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "./App.css";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import '@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css'
// ReactDOM.render(<Routes />, document.getElementById("root"));
render(<App />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
