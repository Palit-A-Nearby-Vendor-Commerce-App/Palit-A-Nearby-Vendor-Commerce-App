import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import NavigationBar from "../components/NavigationBar.jsx";

const Landing = () => {
  return (
    <div className="w-full h-screen bg-primary bg-stroke-bg bg-center bg-no-repeat bg-cover font-custom">
      <NavigationBar />
      <div className="pt-14 text-center w-[600px] m-auto  text-white ">
        <h1 className=" text-7xl font-bold">Palit: Buy and sell on the go!</h1>
        <p className="mt-7 text-slate-300 mb-20">
          A commerce app for moving vendors and customers. Find, chat, and buy
          from nearby sellers on the map. Convenient, fair, and secure. Support
          local livelihoods.
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
  );
};

export default Landing;
