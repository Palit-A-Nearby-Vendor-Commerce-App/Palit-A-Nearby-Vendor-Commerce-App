import React from "react";
import logo from "../assets/images/logo-white.png";
import { Button } from "@material-ui/core";
import { BrowserRouter, Link } from "react-router-dom";

const Homepage = () => {
  return (
    <BrowserRouter>
      <div className="w-full h-screen bg-primary bg-stroke-bg bg-center bg-no-repeat bg-cover font-custom">
        <nav className="flex justify-between w-full py-10 px-20">
          <img src={logo} alt="Palit logo" className="w-30 h-16" />
          <Link to="/signin">
            <Button
              variant="outlined"
              style={{
                textTransform: "none",
                borderColor: "white",
                width: "120px",
                fontSize: "18px",
                color: "white",
                fontFamily: "Poppins",
                borderRadius: "20px",
              }}
            >
              Signin
            </Button>
          </Link>
        </nav>
        <div className="pt-14 text-center w-[600px] m-auto  text-white ">
          <h1 className=" text-7xl font-bold">
            Palit: Buy and sell on the go!
          </h1>
          <p className="mt-7 text-slate-300 mb-20">
            A commerce app for moving vendors and customers. Find, chat, and buy
            from nearby sellers on the map. Convenient, fair, and secure.
            Support local livelihoods.
          </p>
          <Link to="/signup">
            <Button
              variant="contained"
              size="large"
              style={{
                textTransform: "none",
                width: "250px",
                fontSize: "18px",
                backgroundColor: "#F4D23E",
                borderRadius: "20px",
                fontFamily: "Poppins",
                color: "#2A2C41",
              }}
            >
              Get started
            </Button>
          </Link>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Homepage;
