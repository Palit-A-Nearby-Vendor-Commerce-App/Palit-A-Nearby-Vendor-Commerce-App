import React from "react";
import { Link } from "react-router-dom";

import NavigationBar from "../components/NavigationBar";
import map from "../assets/images/citmap.png";
import bardil from "../assets/images/bardil.png";
import alice from "../assets/images/alice.png";
import pri from "../assets/images/pri.png";
import casea from "../assets/images/casea.png";

const membersData = [
  {
    name: "Mark Kenneth Badilla",
    position: "Web Developer",
    img: bardil,
    quote: '"I’m not lazy. I’m energy-efficient."',
  },
  {
    name: "Alestair Cyril Coyoca",
    position: "Web Developer",
    img: alice,
    quote:
      '"To live is to suffer, to survive is to find some meaning in the suffering."',
  },
  {
    name: "Kheisa Selma",
    position: "Web Developer",
    img: casea,
    quote:
      '"The biggest risk is not taking any risk. In a world that’s changing really quickly, the only strategy that is guaranteed to fail is not taking risks"',
  },
  {
    name: "Joshua Briones",
    position: "Web Developer",
    img: pri,
    quote: '"Just wanna die ffs"',
  },
];

const Aboutus = () => {
  return (
    <div className="w-full font-custom">
      {/* Navigation bar to be added... */}
      <NavigationBar />
      <div className="w-full flex items-center flex-col py-[96px] px-20 text-center">
        <h4 className="text-primary text-[16px] font-semibold mb-4 ">
          About the company
        </h4>
        <h1 className="text-grayy text-5xl leading-[60px] font-semibold">
          Made with love, right here
          <br />
          in Cebu
        </h1>
        <p className="text-slate-500 pt-6 text-xl mb-[96px]">
          Come visit our friendly team at one of our offices.
        </p>

        <img src={map} alt="Palit's location" />

        <div className="h-[1px] w-full bg-gray-200 mt-[96px]"></div>

        <h4 className="text-primary text-[16px] font-semibold mb-4 mt-[96px] ">
          Join us!
        </h4>
        <h1 className="text-grayy text-5xl leading-[60px] font-semibold">
          Meet our team
        </h1>
        <p className="text-slate-500 pt-6 text-xl mb-[96px]">
          Our philosophy is simple &mdash; hire a team of diverse, passionate
          people and foster <br /> a culture that empowers you to do your best
          work.
        </p>

        <div className="pt-16 flex gap-8 w-auto">
          {membersData.map((member, index) => (
            <div className="w-full text-left bg-slate-50 shadow-md" key={index}>
              <div className="relative">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-[300px] mb-2 "
                />
                <marquee className="absolute bottom-[0px] p-1 bg-slate-800">
                  <span className="text-sm italic text-white">
                    {member.quote}
                  </span>
                </marquee>
              </div>
              <div className="px-4 py-2">
                <h5 className="text-xl font-semibold text-grayy">
                  {member.name}
                </h5>
                <p className="text-lg text-primary">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
