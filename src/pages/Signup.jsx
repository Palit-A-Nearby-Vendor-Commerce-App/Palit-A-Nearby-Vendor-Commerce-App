import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

import axios from "axios";

import logo from "../assets/images/logo.png";

const Signup = () => {
  const history = useHistory();
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    birthdate: "",
    password: "",
    userType: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleNameChange = (e) => {
    setFormData({ ...formData, fullname: e.target.value });
  };

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleBirthdateChange = (e) => {
    setFormData({ ...formData, birthdate: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleUserTypeChange = (e) => {
    setFormData({ ...formData, userType: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const errors = {};

    if (selectedImage === null) {
      errors.image = "Profile image is required";
    }
    if (formData.fullname.trim() === "") {
      errors.fullname = "Full name is required";
    }
    if (formData.email.trim() === "") {
      errors.email = "Email is required";
    }
    if (formData.password.trim() === "") {
      errors.password = "Password is required";
    }
    if (formData.userType.trim() === "") {
      errors.userType = "User type is required";
    }
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      alert("Missing fields");
      return;
    }

    const userData = {
      name: formData.fullname,
      email: formData.email,
      birthdate: formData.birthdate,
      password: formData.password,
      userType: formData.userType,
      image: selectedImage || "",
    };
      
    //here
    try {
      // Create a user entity using the http://localhost:8080/api/createUser API
      const userResponse = await axios.post("http://localhost:8080/api/createUser", userData);
      const user = userResponse.data;

      let account = null;

      const createAccount = async (userData) => {
        return new Promise(async (resolve, reject) => {
          let attempts = 0;
          const maxAttempts = 10;
          const delay = 1000; // 1 second

          while (account === null && attempts < maxAttempts) {
            try {
              const accountData = {
                isVendor: userData.userType === "vendor",
                isAdmin: false,
                userId: user.userId,
              };
              const accountResponse = await axios.post("http://localhost:8080/api/createAccount", accountData);
              account = accountResponse.data;
              resolve(account);
            } catch (error) {
              attempts++;
              if (attempts === maxAttempts) {
                axios.delete(`http://localhost:8080/api/deleteUser/${user.userId}`);
                reject(new Error("Failed to create account"));
              } else {
                await new Promise((resolve) => setTimeout(resolve, delay));
              }
            }
          }
        });
      };

      // Create a location entity using the http://localhost:8080/api/createLocation API
      // For simplicity, we assume the user provides their latitude and longitude
      // You can use other methods to get the user's location such as geolocation API
      const locationData = {
        latitude: userData.latitude,
        longitude: userData.longitude,
        accountId: account.accountId,
      };
      const locationResponse = await axios.post("http://localhost:8080/api/createLocation", locationData);
      const location = locationResponse.data;

      // If the user is a vendor, create a store entity using the http://localhost:8080/api/createStore API
      // For simplicity, we assume the user provides their store name, description, category and rating
      // You can use other methods to get the user's store information such as a form
      if (userData.userType === "vendor") {
        const storeData = {
          storeName: userData.storeName,
          description: userData.description,
          category: userData.category,
          rating: userData.rating,
          vendorAccountId: account.accountId,
        };
        const storeResponse = await axios.post("http://localhost:8080/api/createStore", storeData);
        const store = storeResponse.data;
      }

      // Redirect the user to the home page or dashboard
      history.push("/");
    } catch (error) {
      // Handle any errors that may occur
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen bg-stroke-bg bg-center bg-no-repeat bg-cover font-custom ">
      <div className="w-[500px] m-auto">
        <div className="w-full flex items-center justify-center">
          <img
            src={logo}
            alt="Palit logo"
            className="w-[250px] h-[102px] mt-5"
          />
        </div>

        <div className="w-full flex items-center justify-center flex-col mt-8">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="image-upload-input"
          />
          <label htmlFor="image-upload-input">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "20px",
                }}
              />
            ) : (
              <Button
                variant="contained"
                color="primary"
                component="span"
                style={{
                  width: "90px",
                  height: "90px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "20px",
                  backgroundColor: "#0071B3",
                  fontSize: "45px",
                  fontWeight: "bold",
                }}
              >
                +
              </Button>
            )}
          </label>

          <p className="mt-2">User/Store Picture</p>
        </div>

        <form>
          <div>
            <label>Full name</label>
            <CustomInput
              type="text"
              placeholder="John Doe"
              value={formData["fullname"]}
              onChange={handleNameChange}
            />
          </div>
          <div className="mt-4">
            <label>Email address</label>
            <CustomInput
              type="email"
              placeholder="yourname@gmail.com"
              value={formData["email"]}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mt-4">
            <label>Birth date</label>
            <CustomInput
              type="date"
              value={formData["birthdate"]}
              onChange={handleBirthdateChange}
            />
          </div>
          <div className="mt-4">
            <label>Create password</label>
            <CustomInput
              type="password"
              value={formData["password"]}
              onChange={handlePasswordChange}
            />
            <p className="text-red-500">
              Password must contain a minimum of 8 characters
            </p>
            <p className="text-red-500">
              Password must contain at least one symbol e.g. @, !
            </p>
          </div>
          <div className="mt-4">
            <label>Choose how you want to use Palit</label>
            <select
              value={formData["userType"]}
              onChange={handleUserTypeChange}
              className="w-full rounded-[20px] p-3 mt-1 text-grayy font-custom border border-grayy"
            >
              <option value="" disabled>
                Select user type
              </option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>
          <CustomButton
            btnStyle="w-full bg-primary p-3 text-white rounded-[20px] mt-10"
            label="Sign Up"
            onClick={handleSignup}
            type="submit"
          />
        </form>
        <Link to="signin">
          <div className="text-center mt-4 pb-6">
            Already a user?
            <span className="text-primary underline cursor-pointer">
              {" "}
              Login
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Signup;