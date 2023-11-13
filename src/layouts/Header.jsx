import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import logo from "../assets/images/logo-white.png";
import storesample from "../assets/images/storesample.png";

const Header = () => {
  return <AppBar position="static">
  <Toolbar className="bg-toolbarcustom">
    <img src={logo} alt="Palit logo" className="w-30 h-16" />
    <h6 className="text-2xl ml-auto">Logout</h6>
    <img src={storesample} alt="Store image" className="w-25 h-12 rounded-full ml-10" />
  </Toolbar>
</AppBar>;
};

export default Header;
