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
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

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
        <Route
          path="/adminlogin122124962942022996"
          exact
          component={AdminLogin}
        />
        <Route
          path="/admindashboardFMfcgzGwHfsnGkqTNMbzNZVStPCPDCxD"
          exact
          component={AdminDashboard}
        />
        <Route path="/home" exact component={Home} />

        <Route component={Landing} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
