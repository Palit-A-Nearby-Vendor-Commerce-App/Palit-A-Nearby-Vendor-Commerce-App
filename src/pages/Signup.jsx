import React, { useState } from "react";
import axios from "axios";
import moment from "moment"; // Import moment library
import logo from "../assets/images/logo.png";
import { useHistory } from "react-router-dom";

function Signup() {
  const history = useHistory();
  const [isImageEmpty, setIsImageEmpty] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
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
  const [alert, setAlert] = useState("");

  // Add state for confirmation popup
  const [confirm, setConfirm] = useState(false);

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

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the image field is empty
    if (!userData.image) {
      setIsImageEmpty(true);
      return;
    } else {
      setIsImageEmpty(false);
    }

    // Check if the user is at least 13 years old
    const today = moment();
    const birthDate = moment(userData.birthdate);
    const age = today.diff(birthDate, "years");
    if (age < 13) {
      setAlert("You must be at least 13 years old to sign up.");
      return;
    }

    // Check if the image field is empty
    if (!userData.image) {
      setAlert("You must upload an image to sign up.");
      return;
    }

    // Show the confirmation popup
    setConfirm(true);
  };

  const handleConfirm = async () => {
    try {
      if (
        !axios.post("http://localhost:8080/api/isEmailTaken", {
          email: userData.email,
        })
      ) {
        setAlert("Email already exists. Please use a different email.");
      } else {
        // Create user
        const formData = new FormData();
        formData.append("image", userData.image);
        formData.append("firstName", userData.firstName);
        formData.append("lastName", userData.lastName);
        formData.append(
          "birthDate",
          moment(userData.birthDate).format("YYYY-MM-DD")
        );
        formData.append("email", userData.email);
        formData.append("password", userData.password);
        const userResponse = await axios.post(
          // Use the URL for the POST mapping to create a new user
          "http://localhost:8080/api/createUser",
          formData
          // Use the FormData object to append the required parameters
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

        // Alert the user that the user creation is successful
        setAlert("User created successfully.");
        history.push("/signin");
      }
    } catch (error) {
      console.error(error);
      // Alert the user that the user creation is not successful
      setAlert("User creation failed. Please try again.");
    }
  };

  const handleCancel = () => {
    // Hide the confirmation popup
    setConfirm(false);
  };

  return (
    <div className="w-full bg-stroke-bg bg-center bg-no-repeat bg-cover font-custom mb-10">
      <div className="w-full flex items-center justify-center">
        <img src={logo} alt="Palit logo" className="w-[250px] h-[102px] mt-5" />
      </div>
      <div className="w-[500px] m-auto">
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mt-4 text-center">
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
                  className="hidden"
                />
                <span className="text-lg font-bold">+</span>
              </label>
            )}
            {isImageEmpty && <p className="text-red-500">Image is required</p>}
          </div>
          <div className="mt-4 flex">
            <div className="mr-2 w-full">
              <input
                name="firstName"
                onChange={handleChange}
                placeholder="First Name"
                required
                className="rounded-[20px] p-3 mt-1 text-grayy font-custom border border-grayy w-full"
              />
            </div>
            <div className="w-full">
              <input
                name="lastName"
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="rounded-[20px] p-3 mt-1 text-grayy font-custom border border-grayy w-full"
              />
            </div>
          </div>
          <div className="mt-4">
            <input
              type="email"
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
              className="w-full rounded-[20px] p-3 mt-1 text-gray-400 font-custom border border-grayy"
            />
          </div>
          <div className="mt-4">
            <select
              name="userType"
              onChange={handleChange}
              required
              className="w-full rounded-[20px] p-3 mt-1 text-gray-400 font-custom border border-grayy"
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
                <select
                  name="category"
                  onChange={handleChange}
                  placeholder="Category"
                  required
                  className="w-full rounded-[20px] p-3 mt-1 text-grayy font-custom border border-grayy"
                >
                  <option value="">Select category</option>
                  <option value="fish">Fish</option>
                  <option value="fruits">Fruits</option>
                  <option value="assorted">Assorted</option>
                  <option value="manicure">Manicure</option>
                </select>
              </div>
            </>
          )}
          <p className="text-center mt-4 text-red-600">
          {alert}
          </p>
          <button
            type="submit"
            className="w-full bg-primary p-3 text-white rounded-[20px] mt-10"
          >
            Sign Up
          </button>
        </form>
      </div>

      {confirm && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-[20px] p-5">
            <p className="text-lg font-bold">
              Are you sure you want to sign up?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCancel}
                className="bg-gray-300 p-2 rounded-[10px] mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-primary p-2 rounded-[10px] text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
