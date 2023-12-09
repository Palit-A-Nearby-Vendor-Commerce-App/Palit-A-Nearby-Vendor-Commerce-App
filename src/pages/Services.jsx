import { useEffect } from "react";
import gsap from "gsap";
import NavigationBar from "../components/NavigationBar";
import { services } from "../data/dummy";

const Services = () => {
  useEffect(() => {
    gsap.from(".service-header", {
      y: -50,
      opacity: 0,
      duration: 1,
    });
    gsap.from(".service-items", { y: 200, opacity: 0, duration: 1 });
  }, []);

  return (
    <div className="w-full bg-slate-50 font-custom">
      <NavigationBar />
      <div className="service-header w-full font-custom text-center p-10 flex flex-col items-center justify-center gap-5">
        <div>
          <h1 className="font-bold text-4xl xl:text-5xl">
            OUR <span className="text-primary">SERVICE</span>
          </h1>
          <p className="text-slate-500 pt-3">
            The app uses realtime geolocation to show the users' locations on a
            map and allows them to chat and transact with each other.
          </p>
        </div>

        <div className="flex gap-1 items-center ">
          <div className="w-12 h-[3px] bg-primary"></div>
          <div className="w-5 h-3 bg-primary"></div>
          <div className="w-12 h-[3px] bg-primary"></div>
        </div>
      </div>

      <div className="service-items w-full grid items-center justify-center gap-5 p-10 lg:grid-cols-3 md:grid-cols-2 sm:p-16">
        {services.map((service, index) => (
          <div
            className="flex flex-col items-center justify-center w-full bg-white p-10 rounded-lg text-center shadow-md h-[350px] md:h-[300px] sm:h-[250px] sm:p-5 xs:p-4"
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
