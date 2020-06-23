/**
 * author: Denis Kravchenko
 */
import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Main from "./components/Main/Main";
import Join from "./components/Join/Join";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Join} />
        <Route path="/chatandwatch" component={Main} />
      </Switch>
    </Router>
  );
};

export default App;
