import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReadOnly from "./components/Read";
import MainProvider from "./contexts/MainProvider";

ReactDOM.render(
  <React.StrictMode>
    <MainProvider>
      <Router>
        <Switch>
          <Route exact path="/read/:id" component={ReadOnly} />
          <Route exact path="/:id" component={App} />
          <Route exact path="/" component={App} />
        </Switch>
      </Router>
    </MainProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
