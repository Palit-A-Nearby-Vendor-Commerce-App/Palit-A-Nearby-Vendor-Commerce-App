import React, { useState } from "react";
import axios from "axios";
import moment from "moment"; // Import moment library

function Signup() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
    storeName: "",
    description: "",
    category: "",
    birthdate: "",
    image: "",
  });

  const [alert, setAlert] = useState("");

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setUserData({
      ...userData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get all users
      const usersResponse = await axios.get(
        "http://localhost:8080/api/getAllUsers"
      );
      const users = usersResponse.data;

      // Check if email already exists
      const existingUser = users.find(
        (user) => user.email === userData.email
      );
      if (existingUser) {
        // Alert the user that the email already exists
        setAlert("Email already exists. Please use a different email.");
      } else {
        // Create user
        const userResponse = await axios.post(
          "http://localhost:8080/api/createUserWOutImage",
          {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            birthDate: moment(userData.birthdate).format("YYYY-MM-DD")
          }
        );
        const user = userResponse.data;

        // Create account
        const accountData = {
          isVendor: userData.userType === "vendor",
          isAdmin: false,
          userId: user.userId,
        };
        await axios.post(
          "http://localhost:8080/api/createAccount",
          accountData
        );

        // If user is a vendor, create store
        if (userData.userType === "vendor") {
          const storeData = {
            storeName: userData.storeName,
            description: userData.description,
            category: userData.category,
            vendorAccountId: user.userId,
          };
          await axios.post("http://localhost:8080/api/createStore", storeData);
        }

        // Update user image
        const formData = new FormData();
        formData.append("image", userData.image);
        await axios.put(
          `http://localhost:8080/api/updateUserImage/${user.userId}`,
          formData
        );

        // Alert the user that the user creation is successful
        setAlert("User created successfully.");
      }
    } catch (error) {
      console.error(error);
      // Alert the user that the user creation is not successful
      setAlert("User creation failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Name" required />
      <input
        name="email"
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="password"
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        name="birthdate"
        type="date"
        onChange={handleChange}
        placeholder="Birthdate"
        required
      />
      <select name="userType" onChange={handleChange} required>
        <option value="">Select user type</option>
        <option value="customer">Customer</option>
        <option value="vendor">Vendor</option>
      </select>
      <input
        name="image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      {userData.userType === "vendor" && (
        <>
          <input
            name="storeName"
            onChange={handleChange}
            placeholder="Store Name"
            required
          />
          <input
            name="description"
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            name="category"
            onChange={handleChange}
            placeholder="Category"
            required
          />
        </>
      )}
      <button type="submit">Sign Up</button>
      {alert && <p>{alert}</p>}
    </form>
  );
}

export default Signup;