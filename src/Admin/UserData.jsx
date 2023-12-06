import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import CustomButton from "../components/CustomButton";

const UserData = () => {
  const [userData, setUserData] = useState([]);
  const [edit, setEdit] = useState(0);
  const [editedUserData, setEditedUserData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  // Add new states for the search and filter inputs
  const [searchName, setSearchName] = useState("");
  const [searchBirthdate, setSearchBirthdate] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/getAllUsers");
        setUserData(response.data);
        setEditedUserData(response.data);
        console.log(response.data);
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
        const response = await axios.put(
          `http://localhost:8080/api/updateUserById/${user.userId}`,
          user
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
    setEdit(0);
    try {
      const response = await axios.get("http://localhost:8080/api/getAllUsers");
      setUserData(response.data);
      console.log(response.data);
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
      const response = await axios.delete(
        `http://localhost:8080/api/deleteUserById/${userId}`
      );
      console.log(response.data);
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
  

  // Add a new function to handle the search input change
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchName") {
      setSearchName(value);
    } else if (name === "searchBirthdate") {
      setSearchBirthdate(value);
    }
  };

  // Add a new function to filter the user data based on the search inputs
  const filterUserData = () => {
    let filteredUserData = userData;
    // Filter by name
    if (searchName) {
      filteredUserData = filteredUserData.filter((user) =>
        user.firstName.toLowerCase().includes(searchName.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    // Filter by birthdate
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
        <h1 className="text-2xl font-bold pb-6" >User</h1>
        <CustomButton
          label={edit === 1 ? "Save" : "Edit"}
          onClick={edit === 1 ? handleOpenDialog : handleEditClick}
        ></CustomButton>
        {/* Add new inputs for the search features */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <label htmlFor="searchName" className="pr-2">Search by name:</label>
            <input
              type="text"
              id="searchName"
              name="searchName"
              value={searchName}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="searchBirthdate" className="pr-2">Search by birthdate:</label>
            <input
              type="date"
              id="searchBirthdate"
              name="searchBirthdate"
              value={searchBirthdate}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <table className="w-full">
          <thead className="text-left border-b border-[#0071B3] text-slate-500">
            <tr>
              <th className="w-1/5 pb-2" >First Name</th>
              <th className="w-1/5 pb-2" >Last Name</th>
              <th className="w-1/5 pb-2" >Birthdate</th>
              <th className="w-3/10 pb-2" >Image</th>
              {/* Use a conditional rendering to display the Delete column header only when edit is 1 */}
              {edit === 1 && <th className="w-1/10 pb-2">Delete</th>}
            </tr>
          </thead>
          <tbody>
            {/* Use the filterUserData function to display the filtered data */}
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
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="image"
                      value={editedUserData[index].image}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : user.image && <img src={user.image} alt={`Profile for ${user.firstName} ${user.lastName}`} />}
                </td>
                {/* Use a conditional rendering to display the delete button only when edit is 1 */}
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
      <Dialog
          open={openDelete}
          onClose={handleCloseDeleteDialog}
        >
          <DialogTitle>Confirm deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <CustomButton
              label="Cancel"
              onClick={handleCloseDeleteDialog}
            ></CustomButton>
            <CustomButton
              label="Confirm Deletion"
              onClick={handleDeleteUser}
            ></CustomButton>
          </DialogActions>
        </Dialog>
        <Dialog
          open={open && edit === 1}
          onClose={handleCloseDialog}
        >
          <DialogTitle>Confirm changes</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to make any changes to the user data?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <CustomButton
              label="Cancel"
              onClick={handleCloseDialog}
            ></CustomButton>
            <CustomButton
              label="Confirm Changes"
              onClick={handleConfirmDialog}
            ></CustomButton>
          </DialogActions>
        </Dialog>
</Paper>
  );
                };

                export default UserData;