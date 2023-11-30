import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import logo from "../assets/images/logo-white.png";
import { NAV_HOVER_STYLE, NAV_ACTIVE_STYLE } from "../assets/styles/styles.js";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min.js";
import { UserContext } from "../UserContext"; // Update the path based on your file structure
import sampleStore from "../assets/images/storesample.png";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";

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
    axios.put(`http://localhost:8080/api/updateLocationById/${user.id}`, {
      // user user's location but update the isActive to true
      ...user.account.location,
      isActive: false,
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
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
          <li
            className={
              loc.pathname === "/home" ? NAV_ACTIVE_STYLE : NAV_HOVER_STYLE
            }
          >
            <Link to="/home">Home</Link>
          </li>
          <li
            className={
              loc.pathname === "/aboutus" ? NAV_ACTIVE_STYLE : NAV_HOVER_STYLE
            }
          >
            <Link to="/aboutus">About us</Link>
          </li>
          <li
            className={
              loc.pathname === "/contactus" ? NAV_ACTIVE_STYLE : NAV_HOVER_STYLE
            }
          >
            <Link to="/contactus">Contact us</Link>
          </li>
          <li
            className={
              loc.pathname === "/services" ? NAV_ACTIVE_STYLE : NAV_HOVER_STYLE
            }
          >
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
                backgroundColor: "#F4D23E",
                color: "#2a2c41",
                border: "none",
                width: "120px",
                fontSize: "18px",
                backgroundColor: isHovered ? "#f5d751" : "#F4D23E",
                fontFamily: "Poppins",
                textDecoration: "semibold",
                borderRadius: "20px",
                transition: "color 0.3s, border-color 0.3s, box-shadow 0.3s", // Add box-shadow to the transition
                boxShadow: isHovered
                  ? "5px 5px 30px rgba(0, 0, 0, 0.2)"
                  : "none",
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
