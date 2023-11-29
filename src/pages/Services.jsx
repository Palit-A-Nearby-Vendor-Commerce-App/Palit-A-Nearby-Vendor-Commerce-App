import React from "react";
import NavigationBar from "../components/NavigationBar";

import { services } from "../data/dummy";

const Services = () => {
  return (
    <div className="w-full h-screen bg-slate-50 font-custom">
      <NavigationBar />
      <div className="w-full font-custom text-center p-10 flex flex-col items-center justify-center gap-5">
        <div>
          <h1 className="font-bold text-5xl">
            OUR <span className="text-primary">SERVICE</span>
          </h1>
          <p className="text-slate-500 pt-3">
            The app uses realtime geolocation to show the users' locations on a
            <br />
            map and allows them to chat and transact with each other.
          </p>
        </div>

        <div className="flex gap-1 items-center ">
          <div className="w-12 h-[3px] bg-primary"></div>
          <div className="w-5 h-3 bg-primary"></div>
          <div className="w-12 h-[3px] bg-primary"></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 items-center justify-center p-10 bg-red w-full">
        {services.map((service, index) => (
          <div
            className="flex flex-col items-center bg-white p-10 rounded-lg text-center shadow-md"
            key={index}
          >
            <div className="bg-slate-100 rounded-full p-2">
              <img
                src={service.logo}
                className="w-12 h-12 rounded-full"
                alt="Service Logo"
              />
            </div>
            <h2 className="font-semibold text-2xl mt-5 mb-4">
              {service.title}
            </h2>
            <p className="text-slate-500">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
