import React, { useRef, useEffect } from "react";
import emailjs from "emailjs-com";
import gsap from "gsap";
import NavigationBar from "../components/NavigationBar";
import contactBg from "../assets/images/contactus.jpg";

const Contact = () => {
  const form = useRef();

  useEffect(() => {
    // Initial animation when the component mounts
    gsap.from(".contact-form", {
      x: -200,
      opacity: 0,
      duration: 1,
    });
    gsap.from(".contact-img", { x: 200, opacity: 0, duration: 1 });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ucxgho9",
        "template_0l01wc5",
        form.current,
        "H1_mvGGgFfArM3Z4L"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="w-full h-screen font-custom">
      <NavigationBar />
      <div className="w-full grid  grid-cols-2 xl:grid-cols-2 xl:px-[220px] py-24 lg:px-[150px] md:px-[80px] sm:grid-cols-2 sm:px-16 xs:grid-cols-1 xs:px-6">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="contact-form flex flex-col pr-5"
        >
          <h1 className="text-4xl font-semibold mb-4 text-dark">
            Get in touch
          </h1>
          <p className="text-base text-slate-600 mb-10">
            How can we assist you? please write down your query.
          </p>
          <input
            type="text"
            name="user_name"
            placeholder="Name"
            className="p-4 mb-5 border border-dark rounded-2xl"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Email address"
            className="p-4 mb-5 border border-dark rounded-2xl"
          />
          <textarea
            name="message"
            placeholder="Message"
            className="p-4 mb-5 border border-dark rounded-2xl"
          />
          <input
            type="submit"
            value="Send"
            className="cursor-pointer px-2 py-4 text-white bg-primary rounded-[100px] hover:bg-[#0066a1] transition-all duration-300 ease-in-out"
          />
        </form>
        <img
          src={contactBg}
          alt="Background img for contactus"
          className="contact-img col-span-1 w-full h-full sm:inline-block xs:hidden"
        />
      </div>
    </div>
  );
};

export default Contact;
