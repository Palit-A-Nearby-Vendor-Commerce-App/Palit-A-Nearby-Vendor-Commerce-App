import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserProvider } from "./UserContext";

import Admin from "./Admin/Admin";
import "./App.css";
import Aboutus from "./pages/Aboutus";
import Chat from "./pages/Chat";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Report from "./pages/Report";
import Services from "./pages/Services";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Store from "./pages/Store";
import Profile from "./pages/Profile";
import AdminDashboard from "./components/AdminDashboard";
// import Dashboard from "./Admin/Dashboard";

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
          <Route path="/store" exact component={Store} />
          <Route path="/report" exact component={Report} />
          <Route path="/home" exact component={Home} />
          <Route path="/chat" exact component={Chat} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/adminlogin3x8Yz7!qA" exact component={Admin} />
          <Route
            path="/admindashboard/dashboard"
            exact
            component={AdminDashboard}
          />

          <Route
            path="/admindashboard/statistics"
            exact
            component={AdminDashboard}
          />

          <Route
            path="/admindashboard/reports"
            exact
            component={AdminDashboard}
          />
          <Route
            path="/admindashboard/users"
            exact
            component={AdminDashboard}
          />
          <Route
            path="/admindashboard/accounts"
            exact
            component={AdminDashboard}
          />
          <Route
            path="/admindashboard/stores"
            exact
            component={AdminDashboard}
          />
          <Route
            path="/admindashboard/transactions"
            exact
            component={AdminDashboard}
          />
          <Route
            path="/admindashboard/products"
            exact
            component={AdminDashboard}
          />

          <Route path="/admindashboard/chat" exact component={AdminDashboard} />

          <Route component={Landing} />
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
