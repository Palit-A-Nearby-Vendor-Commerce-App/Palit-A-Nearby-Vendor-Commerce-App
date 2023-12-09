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
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";

const NavigationBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const loc = useLocation();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleLogout = () => {
    // Additional logout actions can be added here
    console.log("LOGGIN OUT", user);
    if (user.account.location) {
      axios
        .put(
          `http://localhost:8080/api/updateLocationById/${user.account.location.locationId}`,
          {
            ...user.account.location,
            isActive: false,
          }
        )
        .then((response) => {
          setUser(null);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // Redirect to the default page ("/")
    history.push("/landing");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    history.push("/profile");
  };

  const handleHamburger = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <nav className="flex items-center justify-between w-full py-3 px-16 bg-primary lg:py-3 lg:px-16 md:px-12 xs:px-8 xs:py-2">
      <img
        src={logo}
        alt="Palit logo"
        className="w-30 h-16 lg:w-30 lg:h-16 xs:w-26 xs:h-14"
      />
      <div className="flex items-center justify-center gap-8 md:flex xs:hidden">
        <ul className="flex gap-8 items-center justify-center text-white text-xl">
          <li
            className={
              loc.pathname === "/home" || loc.pathname === "/landing"
                ? NAV_ACTIVE_STYLE
                : NAV_HOVER_STYLE
            }
          >
            <Link
              to={user == null ? "/landing" : "/home"}
              className="text-xl xl:text-xl md:text-lg"
            >
              Home
            </Link>
          </li>
          <li
            className={
              loc.pathname === "/aboutus" ? NAV_ACTIVE_STYLE : NAV_HOVER_STYLE
            }
          >
            <Link to="/aboutus" className="text-xl xl:text-xl md:text-lg">
              About us
            </Link>
          </li>
          <li
            className={
              loc.pathname === "/contactus" ? NAV_ACTIVE_STYLE : NAV_HOVER_STYLE
            }
          >
            <Link to="/contactus" className="text-xl xl:text-xl md:text-lg">
              Contact us
            </Link>
          </li>
          <li
            className={
              loc.pathname === "/services" ? NAV_ACTIVE_STYLE : NAV_HOVER_STYLE
            }
          >
            <Link to="/services" className="text-xl xl:text-xl md:text-lg">
              Services
            </Link>
          </li>
        </ul>

        {user ? (
          // If the user is logged in, display Logout button and user image
          
          <>
          
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
                style={{
                  display: "flex",
                  gap: "10px",
                  paddingLeft: "3px",
                  paddingRight: "3px",
                }}
              >
                <LogoutIcon />
                Logout
              </MenuItem>
              
              <MenuItem
                    onClick={handleProfile}
                    style={{
                      display: "flex",
                      gap: "10px",
                      paddingLeft: "3px",
                      paddingRight: "3px",
                    }}
                  >
                    <AccountCircleIcon />
                    Profile
                  </MenuItem>
            </Menu>
          </div>
          <p style={{color: "white", fontWeight: "bold", marginRight: "20px" }}>{user.firstName}</p></>
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
      <div className="hidden md:hidden xs:block relative">
        <button onClick={handleHamburger}>
          <MenuIcon sx={{ color: "white" }} />
        </button>
        {toggleMenu && (
          <div className="absolute z-[9999] flex flex-col items-center justify-center gap-8 bg-primary h-[400px] w-[200px] right-0 top-12">
            <ul className="flex flex-col gap-8 items-center justify-center text-white text-xl">
              <li
                className={
                  loc.pathname === "/home" || loc.pathname === "/landing"
                    ? NAV_ACTIVE_STYLE
                    : NAV_HOVER_STYLE
                }
              >
                <Link
                  to={user == null ? "/landing" : "/home"}
                  className="text-xl xl:text-xl md:text-lg"
                >
                  Home
                </Link>
              </li>
              <li
                className={
                  loc.pathname === "/aboutus"
                    ? NAV_ACTIVE_STYLE
                    : NAV_HOVER_STYLE
                }
              >
                <Link to="/aboutus" className="text-xl xl:text-xl md:text-lg">
                  About us
                </Link>
              </li>
              <li
                className={
                  loc.pathname === "/contactus"
                    ? NAV_ACTIVE_STYLE
                    : NAV_HOVER_STYLE
                }
              >
                <Link to="/contactus" className="text-xl xl:text-xl md:text-lg">
                  Contact us
                </Link>
              </li>
              <li
                className={
                  loc.pathname === "/services"
                    ? NAV_ACTIVE_STYLE
                    : NAV_HOVER_STYLE
                }
              >
                <Link to="/services" className="text-xl xl:text-xl md:text-lg">
                  Services
                </Link>
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
                
              <span>{user.firstname}</span>
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
                  style={{ marginTop: "60px", zIndex: "99999" }}
                >
                  <MenuItem
                    onClick={handleLogout}
                    style={{
                      display: "flex",
                      gap: "10px",
                      paddingLeft: "3px",
                      paddingRight: "3px",
                    }}
                  >
                    <LogoutIcon />
                    Logout
                  </MenuItem>
                  <MenuItem
                    onClick={handleProfile}
                    style={{
                      display: "flex",
                      gap: "10px",
                      paddingLeft: "3px",
                      paddingRight: "3px",
                    }}
                  >
                    <AccountCircleIcon />
                    Profile
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
                    transition:
                      "color 0.3s, border-color 0.3s, box-shadow 0.3s", // Add box-shadow to the transition
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
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
