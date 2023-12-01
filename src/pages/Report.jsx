import React, { useState, useContext, useRef } from "react";
import NavigationBar from "../components/NavigationBar";
import { UserContext } from "../UserContext";
import axios from "axios";
import reportBg from "../assets/images/reportpng.png";
import { Alert } from "../assets/styles/styles.js";

const Report = () => {
  const { user } = useContext(UserContext);
  const reportRef = useRef();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  console.log(user);

  const handleSubmitReport = async (e) => {
    e.preventDefault();

    const messageContent = reportRef.current.querySelector('textarea[name="message"]').value;

    if (!messageContent.trim()) {
      alert("Please enter a message before submitting the report");
      return;
    }

    const reportData = {
      senderId: user.account,
      messageContent: messageContent,
      timestamp: new Date(),
    };

    try {
      const response = await axios.post(`http://localhost:8080/api/createReport`, reportData);
      console.log(response.data);

      setAlertMessage("Report created successfully!");
      setShowAlert(true);

      reportRef.current.reset();
    } catch (error) {
      console.log(error);
      alert("Report creation failed");
    }
  };

  return (
    <div className="w-full h-screen bg-stroke-bg bg-center bg-no-repeat bg-cover font-custom flex flex-col items-center">
      <NavigationBar />
      <div className="my-auto bg-blue-500 w-1/2 h-3/10 rounded-2xl shadow-2xl">
        <div className="h-full flex">
          <div className="my-auto w-2/3 h-full bg-white px-14 py-20 flex flex-col justify-center">
            <h1 className="text-5xl font-bold mb-10">Submit a report</h1>
            <p className="text-xl mb-5">Details of the report</p>
            <form ref={reportRef} onSubmit={handleSubmitReport} className="flex flex-col text-left">
              <textarea
                name="message"
                placeholder="Message"
                rows="5"
                className="p-4 mb-5 border-b border-dark"
              />
              <input
                type="submit"
                value="Submit"
                className="w-1/3 bg-blue-500 rounded-3xl text-white p-2 text-lg font-semibolds"
              />
            </form>
          </div>
          <img src={reportBg} alt="Report bg" className="col-span-1" />
        </div>
      </div>
      {showAlert && (
        <Alert onClose={() => setShowAlert(false)} severity="success" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      )}
    </div>
  );
};

export default Report;
