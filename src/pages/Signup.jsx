import React, { useState } from "react";
import axios from "axios";

function SignupPage() {
  // Define the state variables for the user input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Define a function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default browser behavior
    // Validate the user input
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      alert("Please fill in all the fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Create a user object to send to the backend
    const user = {
      name: name,
      email: email,
      password: password,
    };
    // Use axios to make a POST request to the backend API
    axios
      .post("/api/createUser", user)
      .then((response) => {
        // Handle the response from the backend
        console.log(response.data);
        alert("User created successfully");
      })
      .catch((error) => {
        // Handle the error from the backend
        console.log(error);
        alert("User creation failed");
      });
  };

  // Return the JSX code for the signup page
  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
