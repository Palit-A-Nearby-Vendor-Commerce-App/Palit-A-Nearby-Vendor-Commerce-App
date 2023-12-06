import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import CustomButton from "../components/CustomButton";

const UserData = () => {
  const [userData, setUserData] = useState([]);
  const [edit, setEdit] = useState(0);
  const [editedUserData, setEditedUserData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchBirthdate, setSearchBirthdate] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/getAllUsers"
        );
        setUserData(response.data);
        setEditedUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setEdit(1);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirmDialog = () => {
    handleSaveClick();
    handleCloseDialog();
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newEditedUserData = [...editedUserData];
    newEditedUserData[index][name] = value;
    setEditedUserData(newEditedUserData);
  };

  const handleSaveClick = async () => {
    for (let user of editedUserData) {
      try {
        await axios.put(
          `http://localhost:8080/api/updateUserById/${user.userId}`,
          user
        );
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
    setEdit(0);
    try {
      const response = await axios.get("http://localhost:8080/api/getAllUsers");
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleOpenDeleteDialog = () => {
    setOpenDelete(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
  };

  const handleDeleteClick = async (index) => {
    setDeleteIndex(index);
    handleOpenDeleteDialog();
  };

  const handleDeleteUser = async () => {
    const userId = editedUserData[deleteIndex].userId;
    try {
      await axios.delete(`http://localhost:8080/api/deleteUserById/${userId}`);
    } catch (error) {
      console.error("Error deleting user data:", error);
    }

    try {
      const response = await axios.get("http://localhost:8080/api/getAllUsers");
      setUserData(response.data);
      setEditedUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    handleCloseDeleteDialog();
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchName") {
      setSearchName(value);
    } else if (name === "searchBirthdate") {
      setSearchBirthdate(value);
    }
  };

  const filterUserData = () => {
    let filteredUserData = userData;
    if (searchFirstName) {
      // Add this condition
      filteredUserData = filteredUserData.filter((user) =>
        user.firstName.toLowerCase().includes(searchFirstName.toLowerCase())
      );
    }
    if (searchName) {
      filteredUserData = filteredUserData.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchName.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (searchBirthdate) {
      filteredUserData = filteredUserData.filter((user) =>
        user.birthDate.includes(searchBirthdate)
      );
    }
    return filteredUserData;
  };

  return (
    <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
      <div>
        <div className="flex">
          <h1 className="text-2xl font-bold pb-6 text-[#0071B3]">User</h1>
          <CustomButton
            label={edit === 1 ? "Save" : "Edit"}
            onClick={edit === 1 ? handleOpenDialog : handleEditClick}
            btnStyle={
              edit === 1
                ? "text-blue-500 ml-5 text-sm font-thin"
                : "text-red-500 ml-5 text-sm font-thin"
            }
          ></CustomButton>
        </div>
        <table className="w-full">
          <thead className="text-left border-b border-[#0071B3] text-slate-500">
            <tr>
              <th className="w-1/5 pb-2">
                <div className="flex items-center">
                  First Name
                  <input
                    type="text"
                    id="searchFirstName"
                    name="searchFirstName"
                    value={searchFirstName}
                    onChange={handleSearchChange}
                    placeholder="Search first name"
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  />
                </div>
              </th>
              <th className="w-1/5 pb-2">
                <div className="flex items-center">
                  Last Name
                  <input
                    type="text"
                    id="searchName"
                    name="searchName"
                    value={searchName}
                    onChange={handleSearchChange}
                    placeholder="Search last name"
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  />
                </div>
              </th>
              <th className="w-1/5 pb-2">
                <div>
                  Birthdate
                  <input
                    type="date"
                    id="searchBirthdate"
                    name="searchBirthdate"
                    value={searchBirthdate}
                    onChange={handleSearchChange}
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  />
                </div>
              </th>
              {/* <th className="w-3/10 pb-2">Image</th> */}
              {edit === 1 && <th className="w-1/10 pb-2">Delete</th>}
            </tr>
          </thead>
          <tbody>
            {filterUserData().map((user, index) => (
              <tr key={user.id + user.firstName}>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="firstName"
                      value={editedUserData[index].firstName}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    user.firstName
                  )}
                </td>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="lastName"
                      value={editedUserData[index].lastName}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    user.lastName
                  )}
                </td>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="date"
                      name="birthDate"
                      value={editedUserData[index].birthDate}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    user.birthDate
                  )}
                </td>
                {/* <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="image"
                      value={editedUserData[index].image}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    user.image && (
                      <img
                        src={user.image}
                        alt={`Profile for ${user.firstName} ${user.lastName}`}
                      />
                    )
                  )}
                </td> */}
                {edit === 1 && (
                  <td className="py-2">
                    <CustomButton
                      label="Delete"
                      onClick={() => handleDeleteClick(index)}
                    ></CustomButton>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={openDelete} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mr-5 mb-5">
          <CustomButton
            label="Cancel"
            onClick={handleCloseDeleteDialog}
          ></CustomButton>
          <CustomButton
            label="Delete"
            onClick={handleDeleteUser}
            btnStyle="bg-red-500 rounded-3xl text-white p-2 text-lg font-semibolds cursor-pointer p-3"
          ></CustomButton>
        </DialogActions>
      </Dialog>
      <Dialog open={open && edit === 1} onClose={handleCloseDialog}>
        <DialogTitle>Confirm changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to make any changes to the user data?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mr-5 mb-5">
          <CustomButton
            label="Cancel"
            onClick={handleCloseDialog}
          ></CustomButton>
          <CustomButton
            label="Save Changes"
            onClick={handleConfirmDialog}
            btnStyle="bg-blue-500 rounded-3xl text-white p-2 text-lg font-semibolds cursor-pointer p-3"
          ></CustomButton>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UserData;
