import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import Aboutus from "./pages/Aboutus";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Services from "./pages/Services";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

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
          component={Admin}
        />
        <Route
          path="/admindashboardFMfcgzGwHfsnGkqTNMbzNZVStPCPDCxD"
          exact
          component={AdminDashboard}
        />
        <Route path="/home" exact component={Home} />
        <Route path="/admin" exact component={Admin} />

        <Route component={Landing} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
