import React, { useState } from "react";
import axios from "axios";
import moment from "moment"; // Import moment library
import logo from "../assets/images/logo.png";

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

  // Add state for image preview
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    setUserData({
      ...userData,
      image: e.target.files[0],
    });

    // Set the image preview
    if (e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const [alert, setAlert] = useState("");

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
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
      const existingUser = users.find((user) => user.email === userData.email);
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
            birthDate: moment(userData.birthdate).format("YYYY-MM-DD"),
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
    <div className="w-full bg-stroke-bg bg-center bg-no-repeat bg-cover font-custom">
      <div className="w-full flex items-center justify-center">
          <img
            src={logo}
            alt="Palit logo"
            className="w-[250px] h-[102px] mt-5"
          />
        </div>
      <div className="w-[500px] m-auto">
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mt-4">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-[90px] h-[90px] rounded-[20px] mx-auto"
              />
            ) : (
              <label className="w-[90px] h-[90px] flex justify-center items-center bg-gray-300 rounded-[20px] cursor-pointer mx-auto">
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="hidden"
                />
                <span className="text-lg font-bold">+</span>
              </label>
            )}
          </div>
          <div className="mt-4">
            <input
              name="name"
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full rounded-[20px] p-3 mt-1 text-grayy font-custom border border-grayy"
            />
          </div>
          <div className="mt-4">
            <input
              name="email"
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full rounded-[20px] p-3 mt-1 text-grayy font-custom border border-grayy"
            />
          </div>
          <div className="mt-4">
            <input
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
              type="password"
              className="w-full rounded-[20px] p-3 mt-1 text-grayy font-custom border border-grayy"
            />
          </div>
          <div className="mt-4">
            <input
              name="birthdate"
              type="date"
              onChange={handleChange}
              placeholder="Birthdate"
              required
              className="w-full rounded-[20px] p-3 mt-1 text-grayy font-custom border border-grayy"
            />
          </div>
          <div className="mt-4">
            <select
              name="userType"
              onChange={handleChange}
              required
              className="w-full rounded-[20px] p-3 mt-1 text-grayy font-custom border border-grayy"
            >
              <option value="">Select user type</option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          {userData.userType === "vendor" && (
            <>
              <div className="mt-4">
                <input
                  name="storeName"
                  onChange={handleChange}
                  placeholder="Store Name"
                  required
                  className="w-full rounded-[20px] p-3 mt-1 text-grayy font-custom border border-grayy"
                />
              </div>
              <div className="mt-4">
                <input
                  name="description"
                  onChange={handleChange}
                  placeholder="Description"
                  required
                  className="w-full rounded-[20px] p-3 mt-1 text-grayy font-custom border border-grayy"
                />
              </div>
              <div className="mt-4">
                <input
                  name="category"
                  onChange={handleChange}
                  placeholder="Category"
                  required
                  className="w-full rounded-[20px] p-3 mt-1 text-grayy font-custom border border-grayy"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-primary p-3 text-white rounded-[20px] mt-10"
          >
            Sign Up
          </button>
          {alert && <p className="text-red-500 mt-4">{alert}</p>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
