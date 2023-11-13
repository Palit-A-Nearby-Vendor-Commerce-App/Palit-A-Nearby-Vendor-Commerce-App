import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup"
import Signin from "./pages/Signin";
import GoogleMapComponent from "./pages/GoogleMapComponent";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/homepage" exact component={Homepage} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/googlemapcomponent" exact component={GoogleMapComponent} />

        // other routes...
        <Route component={Homepage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;