import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import axios from "axios"; // Import axios
import logo from "../assets/images/logo-white.png";
import { NAV_HOVER_STYLE } from "../assets/styles/styles.js";
import storeSample from "../assets/images/storesample.png";

const NavigationBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [userData, setUserData] = useState(null);
  const loc = useLocation();
  const history = useHistory();

  // Function to fetch user data
  const fetchUserData = () => {
    axios
      .get("http://localhost:8080/api/getAllUsers")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        alert("Error fetching data:", error);
      });
  };

  // useEffect hook to fetch user data when the component mounts and not on the landing page
  useEffect(() => {
    if (loc.pathname !== "/landing") {
      fetchUserData();
    }
  }, [loc.pathname]);

  const handleLogout = () => {
    // Add logic for logout (e.g., clear authentication token, reset user state, etc.)
    // After logout, redirect to the landing page
    setUserData(null); // Assuming clearing user data
    history.push("/landing");
  };

  return (
    <nav className="flex justify-between w-full py-3 px-16 bg-primary">
      <img src={logo} alt="Palit logo" className="w-30 h-16" />
      <div className="flex items-center justify-center gap-8">
        <ul className="flex gap-8 items-center justify-center text-white text-xl">
          {userData === null && (
            <li className={NAV_HOVER_STYLE}>
              <Link to="/">Home</Link>
            </li>
          )}
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

        <div className="flex items-center">
          {userData ? (
            <>
              <Button
                variant="outlined"
                style={{
                  textTransform: "none",
                  width: "120px",
                  fontSize: "20px",
                  color: isHovered ? "#F4D23E" : "white",
                  fontFamily: "Poppins",
                  transition: "color 0.3s, border-color 0.3s",
                  border:"none"
                }}
                onClick={handleLogout}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Log Out
              </Button>

              <img src={storeSample} alt="User" className=" ml-7 w-14 h-14 rounded-full" />
            </>
          ) : (
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
      </div>
    </nav>
  );
};

export default NavigationBar;
