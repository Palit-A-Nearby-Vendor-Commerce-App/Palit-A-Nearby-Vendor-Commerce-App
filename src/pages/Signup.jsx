import React, { useState } from "react";
import axios from "axios";
import moment from "moment"; // Import moment library
import logo from "../assets/images/logo.png";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "../assets/styles/styles.js";

function Signup() {
  const history = useHistory();
  const [imagePreview, setImagePreview] = useState(null);
  const [alert, setAlert] = useState("");
  const [isImageEmpty, setIsImageEmpty] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
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

  const validatePassword = (password) => {
    // At least 8 characters, includes uppercase, lowercase, number, and special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });

    // if (e.target.name === "password") {
    //   setIsPasswordValid(validatePassword(e.target.value));
    // }
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
    // if (age < 13) {
    //   setAlert("You must be at least 13 years old to sign up.");
    //   return;
    // }

    // // Check if the image field is empty
    // if (!userData.image) {
    //   setAlert("You must upload an image to sign up.");
    //   return;
    // }

    // Show the confirmation popup
    setConfirm(true);
  };

  const handleConfirm = async () => {
    try {
      // // Check if email is already taken
      // const emailCheckResponse = await axios.post(
      //   "http://localhost:8080/api/isEmailTaken",
      //   {
      //     email: userData.email,
      //   }
      // );

      // if (emailCheckResponse.data.exists) {
      //   setAlert("Email already exists. Please use a different email.");
      //   return;
      // }

      

      // Create location
      const locationData = {
        lat: 0, // Replace with actual latitude if available
        lng: 0, // Replace with actual longitude if available
        isActive: false
      };
      const locationResponse = await axios.post(
        "http://localhost:8080/api/createLocation",
        locationData
      );
      const location = locationResponse.data;

      // Optionally create a store and get its ID
      let store = null;
      if (userData.userType === "vendor") {
        const storeData = {
          storeName: userData.storeName,
          description: userData.description,
          category: userData.category
        };
        const storeResponse = await axios.post(
          "http://localhost:8080/api/createStore",
          storeData
        );
        store = storeResponse.data;
      }

      // Create account
      const accountData = {
        email: userData.email,
        password: userData.password,
        isVendor: userData.userType === "vendor",
        isAdmin: false,
        isDeleted: false,
      };
      const accountResponse = await axios.post(
        "http://localhost:8080/api/createAccount",
        accountData
      );
      const account = accountResponse.data;

      function convertToBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.onerror = (error) => reject(error);
        });
      }

      // Create user JSON with converted image, location, account, and store
      const userJson = {
        ...userData,
        image: userData.image ? await convertToBase64(userData.image) : null,
        account
      };

      console.log(userJson);

      // Create user
      await axios.post("http://localhost:8080/api/createUser", userJson);

      // Alert the user that the user creation is successful
      setSuccess(true);

      setTimeout(() => {
        setSuccess(null);
        history.push("/signin");
      }, 3000);
    } catch (error) {
      console.error(error);
      setError(true); // Add this line
    }
  };

  const handleCancel = () => {
    // Hide the confirmation popup
    setConfirm(false);
  };

  return (
    <div className="w-full pb-10 bg-stroke-bg bg-center bg-no-repeat bg-cover font-custom">
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
              <label className="w-[90px] h-[90px] flex justify-center items-center bg-primary rounded-[20px] cursor-pointer mx-auto">
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span className="text-5xl font-semibold` text-white">+</span>
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
              // type="email"
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
            {!isPasswordValid && (
              <p className="text-red-500">
                Password must be at least 8 characters, include an uppercase and
                lowercase letter, a number, and a special character.
              </p>
            )}
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
          <p className="text-center mt-4 text-red-600">{alert}</p>
          <button
            type="submit"
            className="w-full bg-primary p-3 text-white rounded-[20px] mt-10"
          >
            Sign Up
          </button>
        </form>
      </div>

      {confirm && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50
                      "
        >
          <React.Fragment>
            <Dialog
              fullScreen={fullScreen}
              open={confirm}
              onClose={handleCancel}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Sign up confirmation"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to become part of our community and
                  create an account?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={handleCancel}
                  style={{ backgroundColor: "#ccc", color: "#fff" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  style={{ backgroundColor: "#1976D2", color: "#fff" }}
                  autoFocus
                >
                  Confirm
                </Button>
              </DialogActions>
              {success && (
                <Snackbar
                  open={success}
                  autoHideDuration={6000}
                  onClose={() => false}
                >
                  <Alert
                    onClose={() => false}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Created account successfully!
                  </Alert>
                </Snackbar>
              )}
              {error && (
                <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={() => false}
              >
                <Alert
                  onClose={() => false}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  Failed to create account. Please try again.
                </Alert>
              </Snackbar>
              )}
            </Dialog>
          </React.Fragment>
        </div>
      )}
    </div>
  );
}

export default Signup;
