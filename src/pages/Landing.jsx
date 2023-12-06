import React, { useContext, useEffect } from "react";
import { Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../UserContext";
import gsap from "gsap";

import NavigationBar from "../components/NavigationBar.jsx";
import hero from "../assets/images/landing-heroimg.png";

const Landing = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      return <Redirect to="/home" />;
    }

    const tl = gsap.timeline();
    tl.from(".landing-header", { opacity: 0, x: -20, duration: 1.5 });
    tl.from(".landing-parag", { opacity: 0, y: 20, duration: 1 }, "-=1");
    tl.from(".landing-img", { opacity: 0, x: 50, duration: 1 }, "-=1.5");
    tl.from(
      ".landing-cta",
      { scale: 2, opacity: 0, y: 60, duration: 3 },
      "-=2"
    );

    return () => {
      tl.kill();
    };
  }, [user]);

  return (
    <div className="w-full h-screen bg-primary flex flex-col bg-stroke-bg bg-center bg-no-repeat bg-cover font-custom">
      <NavigationBar />
      <div className="landing-content flex items-center gap-16 h-full text-left m-auto text-white px-20">
        <div className="flex-1">
          <h1 className="landing-header text-7xl font-bold">
            <span className="text-customYellow">Palit:</span> Buy and sell on
            the go!
          </h1>
          <p className="landing-parag mt-7 text-slate-300 mb-14">
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
              className="landing-cta"
            >
              Get started
            </Button>
          </Link>
        </div>
        <div className="landing-img w-full h-fit flex flex-1">
          <img src={hero} className="h-[640px] self-center" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
