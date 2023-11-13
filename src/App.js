import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup"
import Signin from "./pages/Signin";
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/homepage" exact component={Landing} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/googlemapcomponent" exact component={Home} />

        <Route component={Landing} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;