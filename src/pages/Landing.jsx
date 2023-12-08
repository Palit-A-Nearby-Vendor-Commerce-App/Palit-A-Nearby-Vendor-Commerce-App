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
    <div className="w-full h-screen bg-primary flex flex-col bg-stroke-bg bg-center bg-no-repeat bg-cover font-custom xl:h-screen">
      <NavigationBar />
      <div className="landing-content flex flex-row items-center gap-16 h-full text-left m-auto text-white xl:gap-16 lg:gap-12 lg:px-20 md:text-left md:flex-row md:gap-6 md:px-14 sm:gap-3 sm:flex-col sm:pt-10 xs:px-16 xs:text-center xs:self-center">
        <div className="flex-1">
          <h1 className="landing-header text-7xl font-bold xl:text-7xl md:text-6xl xs:text-5xl">
            <span className="text-customYellow">Palit:</span> Buy and sell on
            the go!
          </h1>
          <p className="landing-parag mt-7 text-slate-300 mb-14 xl:mb-14 sm:mb-5 sm:text-base xs:text-sm">
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
        <div className="landing-img w-full h-fit flex flex-1 xl:flex-1 sm:flex-1 justify-center sm:flex xs:hidden">
          <img
            alt="bg hero"
            src={hero}
            className="h-[640px] self-center xl:h-[640px] lg:h-[570px] md:h-[480px] sm:h-[320px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
