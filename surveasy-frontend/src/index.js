import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import store from "helpers/store";
import history from "helpers/history";
import "./index.css";
import DashboardApp from "./DashboardApp";
import SurveyApp from "./SurveyApp";

let path = window.location.pathname.split("/")[1];

if (path === "survey") {
  document.body.classList.add("survey");
} else if (document.body.classList.contains("survey")) {
  document.body.classList.remove("survey");
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ChakraProvider>
        <Switch>
          <Route path="/survey" component={SurveyApp} />
          <Route component={DashboardApp} />
        </Switch>
      </ChakraProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
