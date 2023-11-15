import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import { Button } from "@material-ui/core";
import logo from "../assets/images/logo-white.png";
import { NAV_HOVER_STYLE } from "../assets/styles/styles.js";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min.js";

const NavigationBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const loc = useLocation();
  console.log(loc);

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
      </div>
    </nav>
  );
};

export default NavigationBar;
