// import React, { useRef } from "react";
// import axios from "axios";

// import NavigationBar from "../components/NavigationBar";
// import contactBg from "../assets/images/contactus.jpg";



// const Report = () => {
//   const form = useRef();

//   const sendEmail = async (e) => {
//     e.preventDefault();

//     // get the form data
//     const formData = new FormData(form.current);

//     // create a report object from the form data
//     const report = {
//       senderId: formData.get("user_id"),
//       messageContent: formData.get("message"),
//       timestamp: new Date()
//     };

//     try {
//       // use async/await syntax for better readability
//       // send the report to the backend
//       const response = await axios.post(`http://localhost:8080/api/createReport`, report);
//       // Handle the response from the backend
//       console.log(response.data);
//       alert("Report created successfully");
//       form.current.reset();
//     } catch (error) {
//       // Handle the error from the backend or emailjs
//       console.log(error);
//       alert("Report creation failed");
//     }
//   };

//   return (
//     <div className="w-full h-screen font-custom">
//       <NavigationBar />
//       <div className="w-full grid grid-cols-2 px-[220px] py-24">
//         <form ref={form} onSubmit={sendEmail} className="flex flex-col pr-5">
//           <h1 className="text-4xl font-semibold mb-4 text-dark">
//             Get in touch
//           </h1>
//           <p className="text-base text-slate-600 mb-10">
//             How can we assist you? please write down your query.
//           </p>
//           {/* use a more descriptive name for the input field */}
//           <input
//             type="number"
//             name="user_id"
//             placeholder="User ID"
//             className="p-4 mb-5 border border-dark rounded-2xl"
//           />
//           <input
//             type="email"
//             name="user_email"
//             placeholder="Email address"
//             className="p-4 mb-5 border border-dark rounded-2xl"
//           />
//           <textarea
//             name="message"
//             placeholder="Message"
//             className="p-4 mb-5 border border-dark rounded-2xl"
//           />
//           <input
//             type="submit"
//             value="Send"
//             className="cursor-pointer px-2 py-4 text-white bg-primary rounded-[100px]"
//           />
//         </form>
//         <img
//           src={contactBg}
//           alt="Background image"
//           className="col-span-1 w-full h-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default Report;
import React, { useContext, useRef } from "react";
import NavigationBar from "../components/NavigationBar"
import { UserContext } from "../UserContext";
import axios from "axios";

const Report = () => {
  const { user } = useContext(UserContext);
  const reportRef = useRef(); // Change the ref name

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    const formData = new FormData(reportRef.current); // Use the ref name
    const reportData = {
      senderId: user.id,
      messageContent: formData.get("message"), // Use the get method to get form field value
      timestamp: new Date()
    };
    console.log(reportData);

    try {
      // use async/await syntax for better readability
      // send the report to the backend
      const response = await axios.post(`http://localhost:8080/api/createReport`, reportData);
      // Handle the response from the backend
      console.log(response.data);
      alert("Report created successfully");
      reportRef.current.reset();
    } catch (error) {
      // Handle the error from the backend or emailjs
      console.log(error);
      alert("Report creation failed");
    }
  }

  return (
    <div className="w-full h-screen bg-stroke-bg bg-center bg-no-repeat bg-cover font-custom flex flex-col items-center">
      <NavigationBar />
      <div className="my-auto bg-blue-500 w-300 h-250">
        <div className="flex">
          <div className="w-250 h-full bg-white p-4">
            <h1>Submit a report</h1>
            Details of the report
            <form ref={reportRef} onClick={handleSubmitReport} >
              <input
                type="text"
                name="message"
                placeholder="Message"
              />
              <input
                type="submit"
                value="Send"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export  default Report