import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserProvider, UserContext } from "./UserContext";

import Admin from "./Admin/Admin";
import "./App.css";
import Aboutus from "./pages/Aboutus";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Services from "./pages/Services";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import Accounts from "./Admin/Accounts";
import NavigationBarAdmin from "./components/NavigationBarAdmin";
// import Dashboard from "./Admin/Dashboard";
import Products from "./Admin/Products";
import Reports from "./Admin/Reports";
import Statistics from "./Admin/Statistics";
import Stores from "./Admin/Stores";
import Transactions from "./Admin/Transactions";
import Users from "./Admin/Users";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/landing" exact component={Landing} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/aboutus" exact component={Aboutus} />
          <Route path="/contactus" exact component={Contact} />
          <Route path="/services" exact component={Services} />

          <Route path="/adminlogin122124962942022996" exact component={Admin} />
          <Route
            path="/admindashboard/dashboard"
            exact
            component={NavigationBarAdmin}
          />

          <Route
            path="/admindashboard/statistics"
            exact
            component={Statistics}
          />

          <Route path="/admindashboard/reports" exact component={Reports} />

          <Route path="/admindashboard/users" exact component={Users} />

          <Route path="/admindashboard/accounts" exact component={Accounts} />

          <Route path="/admindashboard/stores" exact component={Stores} />

          <Route
            path="/admindashboard/transactions"
            exact
            component={Transactions}
          />

          <Route path="/admindashboard/products" exact component={Products} />

          <Route path="/home" exact component={Home} />
          <Route path="/admin" exact component={Admin} />

          <Route component={Landing} />
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
