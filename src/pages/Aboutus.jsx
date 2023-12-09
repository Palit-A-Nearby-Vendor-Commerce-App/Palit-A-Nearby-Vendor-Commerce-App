import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import NavigationBar from "../components/NavigationBar";
import map from "../assets/images/citmap.png";
import bardil from "../assets/images/bardil.png";
import alice from "../assets/images/alice.png";
import pri from "../assets/images/pri.png";
import casea from "../assets/images/casea.png";

gsap.registerPlugin(ScrollTrigger);

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
    quote:
      '"I would like to change the world, but they wont give me the source code."',
  },
];

const Aboutus = () => {
  useEffect(() => {
    gsap.from(".aboutus-header", {
      y: 100,
      opacity: 0,
      duration: 2,
      ease: "power3.out",
    });

    gsap.from(".aboutus-map", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".aboutus-map",
        start: "top 90%",
        end: "top 30%",
        scrub: true,
      },
    });

    gsap.from(".aboutus-secondheader", {
      y: 200,
      opacity: 0,
      scrollTrigger: {
        trigger: ".aboutus-secondheader",
        start: "top 80%",
        end: "top 50%",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="w-full font-custom">
      <NavigationBar />
      <div className="aboutus-header w-full flex items-center flex-col py-[96px] px-20 text-center ">
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

        <img src={map} alt="Palit's location" className="aboutus-map" />

        <div className="h-[1px] w-full bg-gray-200 mt-[96px]"></div>

        <div className="aboutus-secondheader">
          <h4 className="text-primary text-[16px] font-semibold mb-4 mt-[96px] ">
            Join us!
          </h4>
          <h1 className="text-grayy text-5xl leading-[60px] font-semibold">
            Meet our team
          </h1>
          <p className="text-slate-500 pt-6 text-xl xl:mb-[96px] md:mb-[42px]">
            Our philosophy is simple — hire a team of diverse, passionate
            people and foster <br /> a culture that empowers you to do your best
            work.
          </p>
        </div>

        <div className="aboutus-members pt-16 grid gap-8 w-auto grid-cols-4 xl:gap-8 lg:grid-cols-4 lg:gap-6 md:gap-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-3 xs:grid-cols-1">
          {membersData.map((member, index) => (
            <div className="w-full text-left bg-slate-50 shadow-md" key={index}>
              <div className="relative">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full mb-2 xl:h-[300px] lg:h-[240px]"
                />
                <marquee className="absolute bottom-[0px] p-1 bg-slate-800">
                  <span className="text-sm italic text-white">
                    {member.quote}
                  </span>
                </marquee>
              </div>
              <div className="px-4 py-2">
                <h5 className="text-xl xl:text-xl md:text-base font-semibold text-grayy">
                  {member.name}
                </h5>
                <p className="text-lg xl:text-lg md:text-sm text-primary">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
