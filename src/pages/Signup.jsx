import React, { useState } from "react";
import axios from "axios";

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

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let user = null;
    while (!user) {
      try {
        // Create user
        const userResponse = await axios.post(
          "http://localhost:8080/api/createUser",
          {
            name: userData.name,
            email: userData.email,
            password: userData.password,
          }
        );
        user = userResponse.data;

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
      } catch (error) {
        console.error(error);
      }
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
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </>
      )}
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;