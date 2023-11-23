import React, { useRef } from "react";
import emailjs from "emailjs-com";

import NavigationBar from "../components/NavigationBar";
import contactBg from "../assets/images/contactus.jpg";

const Contact = () => {
  const form = useRef();

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
      <div className="w-full grid grid-cols-2 px-[220px] py-24">
        <form ref={form} onSubmit={sendEmail} className="flex flex-col pr-5">
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
            className="cursor-pointer px-2 py-4 text-white bg-primary rounded-[100px]"
          />
        </form>
        <img
          src={contactBg}
          alt="Background image"
          className="col-span-1 w-full h-full"
        />
      </div>
    </div>
  );
};

export default Contact;