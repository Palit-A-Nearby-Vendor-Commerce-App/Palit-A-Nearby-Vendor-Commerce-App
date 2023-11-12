import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

import Main from "./layouts/Main";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/landing" exact component={Homepage} />
        <Route path="/main" exact component={Main} />
        // other routes...
        <Route component={Homepage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
