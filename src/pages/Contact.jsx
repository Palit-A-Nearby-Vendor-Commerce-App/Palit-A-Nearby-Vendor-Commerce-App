import React, { useRef } from "react";
import emailjs from "emailjs-com";
import axios from "axios";

import NavigationBar from "../components/NavigationBar";
import contactBg from "../assets/images/contactus.jpg";

// use a constant for the API URL
const API_URL = "http://localhost:8080/api/createReport";

// use a constant for the email service details
const EMAIL_SERVICE = {
  serviceId: "service_ucxgho9",
  templateId: "template_0l01wc5",
  userId: "H1_mvGGgFfArM3Z4L"
};

const Contact = () => {
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    // get the form data
    const formData = new FormData(form.current);

    // create a report object from the form data
    const report = {
      senderId: formData.get("user_id"),
      messageContent: formData.get("message"),
      timestamp: new Date()
    };

    try {
      // use async/await syntax for better readability
      // send the report to the backend
      const response = await axios.post(API_URL, report);
      // Handle the response from the backend
      console.log(response.data);
      alert("Report created successfully");

      // send the email using emailjs
      // const result = await emailjs.sendForm(
      //   EMAIL_SERVICE.serviceId,
      //   EMAIL_SERVICE.templateId,
      //   form.current,
      //   EMAIL_SERVICE.userId
      // );
      // console.log(result.text);

      // clear the input fields using the reset method
      form.current.reset();
    } catch (error) {
      // Handle the error from the backend or emailjs
      console.log(error);
      alert("Report creation failed");
    }
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
          {/* use a more descriptive name for the input field */}
          <input
            type="number"
            name="user_id"
            placeholder="User ID"
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
