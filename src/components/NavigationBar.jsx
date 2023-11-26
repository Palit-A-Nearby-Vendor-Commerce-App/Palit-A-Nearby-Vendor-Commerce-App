import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import logo from "../assets/images/logo-white.png";
import { NAV_HOVER_STYLE } from "../assets/styles/styles.js";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min.js";
import { UserContext } from "../UserContext"; // Update the path based on your file structure
import sampleStore from "../assets/images/storesample.png";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const NavigationBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const loc = useLocation();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    // Perform logout actions (e.g., clear user data)
    setUser(null);
    // Additional logout actions can be added here

    // Redirect to the default page ("/")
    history.push("/");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="flex justify-between w-full py-3 px-16 bg-primary">
      <img src={logo} alt="Palit logo" className="w-30 h-16" />
      <div className="flex items-center justify-center gap-8">
        <ul className="flex gap-8 items-center justify-center text-white text-xl">
          <li className={NAV_HOVER_STYLE}>
            <Link to="/">Home</Link>
          </li>
          <li className={NAV_HOVER_STYLE}>
            <Link to="/aboutus">About us</Link>
          </li>
          <li className={NAV_HOVER_STYLE}>
            <Link to="/contactus">Contact us</Link>
          </li>
          <li className={NAV_HOVER_STYLE}>
            <Link to="/services">Services</Link>
          </li>
        </ul>

        {user ? (
          // If the user is logged in, display Logout button and user image
          <div className="flex items-center gap-4">
            <img
              src={`data:image/png;base64, ${user.image}`}
              alt="User"
              className="w-12 h-12 rounded-full"
              onClick={handleMenu}
            />
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{ marginTop: "50px" }}
            >
              <MenuItem
                onClick={handleClose}
                style={{ display: "flex", gap: "10px" }}
              >
                <AccountCircleIcon /> Profile
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                style={{ display: "flex", gap: "10px" }}
              >
                <LogoutIcon />
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          // If the user is not logged in, display Sign In button
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              style={{
                textTransform: "none",
                borderColor: "white",
                width: "120px",
                fontSize: "18px",
                color: isHovered ? "#F4D23E" : "white",
                borderColor: isHovered ? "#F4D23E" : "white",
                fontFamily: "Poppins",
                borderRadius: "20px",
                transition: "color 0.3s, border-color 0.3s",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
