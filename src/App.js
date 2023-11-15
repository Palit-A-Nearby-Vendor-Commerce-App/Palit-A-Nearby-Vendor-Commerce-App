import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/landing" exact component={Landing} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/aboutus" exact component={Aboutus} />
        <Route path="/contactus" exact component={Contact} />
        <Route path="/services" exact component={Services} />
        <Route path="/home" exact component={Home} />

        <Route component={Landing} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
