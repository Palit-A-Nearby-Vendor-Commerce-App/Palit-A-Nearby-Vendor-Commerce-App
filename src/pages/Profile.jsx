import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { UserContext } from "../UserContext";
import NavigationBar from "../components/NavigationBar";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core"; // Import the dialog component from material UI library

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [account, setAccount] = useState(null); // The account entity
  const [transactions, setTransactions] = useState([]); // The list of transactions
  const [editMode, setEditMode] = useState(false); // The flag for editing mode
  const [message, setMessage] = useState(""); // The message to display
  const [open, setOpen] = useState(false); // The flag for dialog open state
  const history = useHistory(); // The history object for navigation

  const userId = user.userId;

  // The function to fetch the user and account data from the API
  const fetchData = async () => {
    try {
      // Get the user id from the local storage
      if (!userId) {
        // If no user id, redirect to login page
        history.push("/login");
        return;
      }
      // Get the user data by id
      const userResponse = await axios.get(
        `http://localhost:8080/api/getUserById/${userId}`
      );
      const userData = userResponse.data;
      // Set the user state
      setUser(userData);

      // Get the account data by id
      const accountResponse = await axios.get(
        `http://localhost:8080/api/getAccountById/${userData.account.accountId}`
      );
      const accountData = accountResponse.data;
      // Set the account state
      setAccount(accountData);

      // Get the transactions by customer id
      const transactionResponse = await axios.get(
        `http://localhost:8080/api/getTransactionsByCustomerId/${userData.account.accountId}`
      );
      const transactionData = transactionResponse.data;
      // Set the transaction state
      setTransactions(transactionData);
    } catch (error) {
      // If any error, display the message
      setMessage(error.message);
    }
  };

  // The function to handle the edit button click
  const handleEdit = () => {
    // Toggle the edit mode
    setEditMode(!editMode);
  };

  // The function to handle the save button click
  const handleSave = async () => {
    // Show a confirmation dialog
    setOpen(true); // Set the dialog open state to true
  };

  // The function to handle the confirm button click
  const handleConfirm = async () => {
    try {
      // Update the user data by id
      await axios.put(
        `http://localhost:8080/api/updateUserById/${user.userId}`,
        user
      );
      // Update the account data by id
      await axios.put(
        `http://localhost:8080/api/updateAccountById/${user.account.accountId}`,
        account
      );
      // Display a success message
      setMessage("Your changes have been saved successfully.");
      // Exit the edit mode
      setEditMode(false);
    } catch (error) {
      // If any error, display the message
      setMessage(error.message);
    }
    // Close the dialog
    setOpen(false);
  };

  // The function to handle the cancel button click
  const handleCancel = () => {
    // Close the dialog
    setOpen(false);
  };

  // The function to handle the delete button click
  const handleDelete = async () => {
    // Show a confirmation dialog
    setOpen(true); // Set the dialog open state to true
  };

  // The function to handle the delete confirm button click
  const handleDeleteConfirm = async () => {
    try {
      // Delete the user data by id
      await axios.delete(
        `http://localhost:8080/api/deleteUserById/${user.userId}`
      );
      // Delete the account data by id
      await axios.delete(
        `http://localhost:8080/api/deleteAccountById/${user.account.accountId}`
      );
      // Display a success message
      setMessage("Your account has been deleted successfully.");
      // Clear the local storage
      localStorage.clear();
      // Redirect to the home page
      history.push("/");
    } catch (error) {
      // If any error, display the message
      setMessage(error.message);
    }
    // Close the dialog
    setOpen(false);
  };

  // The function to handle the input change for user data
  const handleUserChange = (event) => {
    // Get the name and value of the input
    const { name, value } = event.target;
    // Update the user state
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // The function to handle the input change for account data
  const handleAccountChange = (event) => {
    // Get the name and value of the input
    const { name, value } = event.target;
    // Update the account state
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  // The function to handle the file change for user image
  const handleFileChange = (event) => {
    // Get the file from the input
    const file = event.target.files[0];
    // Create a file reader object
    const reader = new FileReader();
    // Set the onload event handler
    reader.onload = (e) => {
      // Get the base64 encoded data from the reader
      const data = e.target.result.split(",")[1];
      // Update the user state with the image data
      setUser((prevUser) => ({
        ...prevUser,
        image: data,
      }));
    };
    // Read the file as data URL
    reader.readAsDataURL(file);
  };

  // The function to format the date
  const formatDate = (dateString) => {
    // Create a date object from the string
    const date = new Date(dateString);
    // Return the formatted date
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  // The function to format the transaction details
const formatDetails = (details) => {
  // Define a regular expression to match the product name, price, quantity, and total
  const regex = /(\w+) Php(\d+) x(\d+); Total: Php(\d+)/;
  // Apply the regex to the details string and get the matching groups
  const [, productName, productPrice, quantity, total] = details.match(regex);
  // Return the formatted details
  return `Product: ${productName}, Price: ${productPrice}, Quantity: ${quantity}, Total: ${total}`;
};


  // The useEffect hook to fetch the data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="container gap-5 mx-auto px-4">
        <h1 className="text-4xl font-bold text-center my-4">Profile</h1>
        {message && <p className="text-green-600 text-center">{message}</p>}
        {user && account && (
          <div className="flex flex-col gap-5 md:flex-row items-center justify-center">
            <div className="md:w-1/2 p-4 bg-white shadow-lg rounded-xl">
              {" "}
              {/* Add a white background, a shadow, and a rounded border to the image section */}
              <img
                src={`data:image/jpeg;base64,${user.image}`}
                alt="User profile"
                className="rounded-2xl w-full h-full object-cover"
              />
              {editMode && ( // Add a file input for image upload when in edit mode
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-2"
                />
              )}
            </div>
            <div className="md:w-1/2 p-4 bg-white shadow-lg rounded-xl">
              {" "}
              {/* Add a white background, a shadow, and a rounded border to the details section */}
              <h2 className="text-3xl font-bold text-center my-2">
                User Details
              </h2>
              <div className="flex flex-col items-center">
                <div className="flex flex-col md:flex-row items-center justify-between w-full">
                  <label
                    htmlFor="firstName"
                    className="text-xl font-semibold mr-4"
                  >
                    First Name:
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleUserChange}
                      className="border-2 border-gray-300 rounded-xl p-2 w-full md:w-3/4"
                    />
                  ) : (
                    <p className="text-xl ml-4">{user.firstName}</p>
                  )}
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full">
                  <label
                    htmlFor="lastName"
                    className="text-xl font-semibold mr-4"
                  >
                    Last Name:
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleUserChange}
                      className="border-2 border-gray-300 rounded-xl p-2 w-full md:w-3/4"
                    />
                  ) : (
                    <p className="text-xl ml-4">{user.lastName}</p>
                  )}
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full">
                  <label
                    htmlFor="birthDate"
                    className="text-xl font-semibold mr-4"
                  >
                    Birth Date:
                  </label>
                  {editMode ? (
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={formatDate(user.birthDate)}
                      onChange={handleUserChange}
                      className="border-2 border-gray-300 rounded-xl p-2 w-full md:w-3/4"
                    />
                  ) : (
                    <p className="text-xl ml-4">{formatDate(user.birthDate)}</p>
                  )}
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full">
                  <label htmlFor="email" className="text-xl font-semibold mr-4">
                    Email:
                  </label>
                  {editMode ? (
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={account.email}
                      onChange={handleAccountChange}
                      className="border-2 border-gray-300 rounded-xl p-2 w-full md:w-3/4"
                    />
                  ) : (
                    <p className="text-xl ml-4">{account.email}</p>
                  )}
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full">
                  <label
                    htmlFor="password"
                    className="text-xl font-semibold mr-4"
                  >
                    Password:
                  </label>
                  {editMode ? (
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={account.password}
                      onChange={handleAccountChange}
                      className="border-2 border-gray-300 rounded-xl p-2 w-full md:w-3/4"
                    />
                  ) : (
                    <p className="text-xl ml-4">********</p>
                  )}
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full">
                  <label
                    htmlFor="isVendor"
                    className="text-xl font-semibold mr-4"
                  >
                    Vendor Status:
                  </label>
                  {editMode ? (
                    <select
                      id="isVendor"
                      name="isVendor"
                      contentEditable="false"
                      value={account.isVendor}
                      className="border-2 border-gray-300 rounded-xl p-2 w-full md:w-3/4"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  ) : (
                    <p className="text-xl ml-4">
                      {account.isVendor ? "Yes" : "No"}
                    </p>
                  )}
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full">
                  <label
                    htmlFor="isAdmin"
                    className="text-xl font-semibold mr-4"
                  >
                    Admin Status:
                  </label>
                  {editMode ? (
                    <select
                      id="isAdmin"
                      contentEditable="false"
                      name="isAdmin"
                      value={account.isAdmin}
                      className="border-2 border-gray-300 rounded-xl p-2 w-full md:w-3/4"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  ) : (
                    <p className="text-xl ml-4">
                      {account.isAdmin ? "Yes" : "No"}
                    </p>
                  )}
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full">
                  <label
                    htmlFor="location"
                    className="text-xl font-semibold mr-4"
                  >
                    Location:
                  </label>
                  {editMode ? (
                    <div className="flex flex-col md:flex-row items-center w-full md:w-3/4">
                      <input
                        type="number"
                        id="latitude"
                        name="latitude"
                        contentEditable="false"
                        value={account.location.latitude}
                        placeholder="Latitude"
                        className="border-2 border-gray-300 rounded-xl p-2 mr-2 mb-2 w-full md:w-1/2"
                      />
                      <input
                        type="number"
                        id="longitude"
                        name="longitude"
                        value={account.location.longitude}
                        contentEditable="false"
                        placeholder="Longitude"
                        className="border-2 border-gray-300 rounded-xl p-2 ml-2 mb-2 w-full md:w-1/2"
                      />
                    </div>
                  ) : (
                    <p className="text-xl ml-4">
                      {account.location.latitude}, {account.location.longitude}
                    </p>
                  )}
                </div>
                <div className="flex flex-row items-center justify-around w-full my-4">
                  {editMode ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={handleEdit}
                    style={{backgroundColor: "#0575B4"}}
                      className="text-white font-bold py-2 px-4 rounded-xl"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <h2 className="text-3xl font-bold text-center my-4">
        Transaction History
      </h2>
      {transactions.length > 0 ? (
        <div className="flex flex-col items-center justify-center">
          <table className="table-auto border-collapse border-2 border-gray-300 rounded-xl">
            <thead>
              <tr>
                <th className="border-2 border-gray-300 p-2">Transaction ID</th>
                <th className="border-2 border-gray-300 p-2">Vendor</th>
                <th className="border-2 border-gray-300 p-2">Status</th>
                <th className="border-2 border-gray-300 p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.transactionId}>
                  <td className="border-2 border-gray-300 p-2 text-center">
                    {transaction.transactionId}
                  </td>
                  <td className="border-2 border-gray-300 p-2 text-center">
                    {transaction.vendor.email}
                  </td>
                  <td className="border-2 border-gray-300 p-2 text-center">
                    {transaction.status}
                  </td>
                  <td className="border-2 border-gray-300 p-2 text-center">
                    {formatDetails(transaction.details)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-xl text-center">You have no transactions.</p>
      )}
      {/* Add a dialog component for confirmation and success messages */}
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: "15px", // Apply the borderRadius to the Paper component
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {editMode ? "Confirm changes" : "Confirm deletion"}{" "}
          {/* Change the title based on the edit mode */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {editMode
              ? "Are you sure you want to save the changes to your profile?"
              : "Are you sure you want to delete your account?"}{" "}
            {/* Change the message based on the edit mode */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancel}
            color="primary"
            style={{
              backgroundColor: "#E8594F",
              color: "white",
              borderRadius: "15px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={
              editMode ? handleConfirm : handleDeleteConfirm
            } /* Change the click handler based on the edit mode */
            color="primary"
            autoFocus
            style={{
              backgroundColor: "#0575B4",
              color: "white",
              borderRadius: "15px",
            }}
          >
            {editMode ? "Confirm" : "Delete"}{" "}
            {/* Change the button text based on the edit mode */}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
