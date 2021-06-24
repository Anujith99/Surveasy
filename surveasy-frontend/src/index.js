import React from "react";
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import history from "helpers/history";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <Router history={history}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Router>,
  document.getElementById("root")
);
