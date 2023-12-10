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
} from "@material-ui/core";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const userId = user.userId;

  const fetchData = async () => {
    try {
      if (!userId) {
        history.push("/login");
        return;
      }
      const userResponse = await axios.get(
        `http://localhost:8080/api/getUserById/${userId}`
      );
      const userData = userResponse.data;
      setUser(userData);

      const accountResponse = await axios.get(
        `http://localhost:8080/api/getAccountById/${userData.account.accountId}`
      );
      const accountData = accountResponse.data;
      setAccount(accountData);
      if (!accountData.isVendor) {
        const transactionResponse = await axios.get(
          `http://localhost:8080/api/getTransactionsByCustomerId/${userData.account.accountId}`
        );
        const transactionData = transactionResponse.data;
        setTransactions(transactionData);
      } else {
        const transactionResponse = await axios.get(
          `http://localhost:8080/api/getTransactionsByVendorId/${userData.account.accountId}`
        );
        const transactionData = transactionResponse.data;
        setTransactions(transactionData);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    setOpen(true);
  };

  const handleConfirm = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/updateUserById/${user.userId}`,
        user
      );
      await axios.put(
        `http://localhost:8080/api/updateAccountById/${user.account.accountId}`,
        account
      );
      setMessage("Your changes have been saved successfully.");
      setEditMode(false);
    } catch (error) {
      setMessage(error.message);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/deleteUserById/${user.userId}`
      );
      await axios.delete(
        `http://localhost:8080/api/deleteAccountById/${user.account.accountId}`
      );
      setMessage("Your account has been deleted successfully.");
      localStorage.clear();
      history.push("/");
    } catch (error) {
      setMessage(error.message);
    }
    setOpen(false);
  };

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAccountChange = (event) => {
    const { name, value } = event.target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result.split(",")[1];
      setUser((prevUser) => ({
        ...prevUser,
        image: data,
      }));
    };
    reader.readAsDataURL(file);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const formatDetails = (details) => {
    if (details == null || details === "") return "";
    const regex = /(\w+) ₱(\d+) x(\d+); Total: ₱(\d+)/;
    const [, productName, productPrice, quantity, total] = details.match(regex);
    return `Product: ${productName}, Price: ${productPrice}, Quantity: ${quantity}, Total: ${total}`;
  };

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
            <div
              style={{ width: "350px", height: "350px" }}
              className="md:w-1/2 p-4 bg-white shadow-lg rounded-xl overflow-hidden"
            >
              <img
                src={`data:image/jpeg;base64,${user.image}`}
                alt="User profile"
                className="rounded-2xl w-full h-full object-cover"
              />
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-2"
                />
              )}
            </div>
            <div className="md:w-1/2 p-4 bg-white shadow-lg rounded-xl">
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
                      disabled
                      defaultValue={account.isVendor}
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
                      name="isAdmin"
                      disabled
                      defaultValue={account.isAdmin}
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
                        disabled
                        defaultValue={account.location.latitude}
                        placeholder="Latitude"
                        className="border-2 border-gray-300 rounded-xl p-2 mr-2 mb-2 w-full md:w-1/2"
                      />
                      <input
                        type="number"
                        id="longitude"
                        name="longitude"
                        disabled
                        defaultValue={account.location.longitude}
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
                      style={{ backgroundColor: "#0575B4" }}
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
      <br />
      <br />
      <hr />
      <h2 className="text-3xl font-bold text-center my-4">
        Transaction History
      </h2>
      {transactions.length > 0 ? (
        <div className="flex flex-col items-center justify-center">
          <table className="table-auto border-collapse border-2 border-gray-300 rounded-xl">
            <thead>
              <tr>
                <th className="border-2 border-gray-300 p-2">Transaction ID</th>
                {user.account.isVendor ? (
                  <th className="border-2 border-gray-300 p-2">
                    Customer Email
                  </th>
                ) : (
                  <th className="border-2 border-gray-300 p-2">Vendor Email</th>
                )}
                <th className="border-2 border-gray-300 p-2">Status</th>
                <th className="border-2 border-gray-300 p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0
                ? transactions.map((transaction) => (
                    <tr key={transaction.transactionId}>
                      <td className="border-2 border-gray-300 p-2 text-center">
                        {transaction.transactionId}
                      </td>
                      {user.account.isVendor ? (
                        <td className="border-2 border-gray-300 p-2 text-center">
                          {transaction.customer.email}
                        </td>
                      ) : (
                        <td className="border-2 border-gray-300 p-2 text-center">
                          {transaction.vendor.email}
                        </td>
                      )}
                      <td className="border-2 border-gray-300 p-2 text-center">
                        {transaction.status}
                      </td>
                      <td className="border-2 border-gray-300 p-2 text-center">
                        {formatDetails(transaction.details)}
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-xl text-center">You have no transactions.</p>
      )}
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: "15px",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {editMode ? "Confirm changes" : "Confirm deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {editMode
              ? "Are you sure you want to save the changes to your profile?"
              : "Are you sure you want to delete your account?"}
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
            onClick={editMode ? handleConfirm : handleDeleteConfirm}
            color="primary"
            autoFocus
            style={{
              backgroundColor: "#0575B4",
              color: "white",
              borderRadius: "15px",
            }}
          >
            {editMode ? "Confirm" : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
