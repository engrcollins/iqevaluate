import React from "react";
import { Route, Switch } from "react-router-dom";
import NewLanding from "./components/Landing/NewLanding";
import Login from "./components/accounts/Login";
import Candidate from "./components/candidates/Login";
import WIDECAT from "./components/Restricted/Login";
import SignUp from "./components/accounts/SignUp";
import Dashboards from "./components/dashboards/Dashboard";
import Error from "./Error";
import "./App.css";
import "./index.css";
import DemoLanding from "./components/Demo/DemoLanding";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={NewLanding}></Route>
        <Route exact path="/organization/login" component={Login}></Route>
        <Route exact path="/organization/signup" component={SignUp}></Route>
        <Route exact path="/dashboard" component={Dashboards}></Route>
        <Route exact path="/myevaluationpanel" component={Candidate}></Route>
        <Route exact path="/demo" component={DemoLanding}></Route>
        <Route exact path="/widecat/admin" component={WIDECAT}></Route>
        <Route component={Error}></Route>
      </Switch>
    </>
  );
};

export default App;
