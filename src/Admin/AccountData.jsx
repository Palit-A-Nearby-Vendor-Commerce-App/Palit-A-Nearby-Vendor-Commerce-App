import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import CustomButton from "../components/CustomButton";

const AccountData = () => {
  const [accountData, setAccountData] = useState([]);
  const [edit, setEdit] = useState(0);
  const [editedAccountData, setEditedAccountData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  // Add new states for the search and filter inputs
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPassword, setSearchPassword] = useState("");
  const [filterAdmin, setFilterAdmin] = useState("All");
  const [filterVendor, setFilterVendor] = useState("All");

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/getAllAccounts");
        setAccountData(response.data);
        setEditedAccountData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };
    fetchAccountData();
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
    const newEditedAccountData = [...editedAccountData];
    newEditedAccountData[index][name] = value;
    setEditedAccountData(newEditedAccountData);
  };

  // Add a new function to handle the checkbox change
  const handleCheckboxChange = (e, index) => {
    const { name, checked } = e.target;
    const newEditedAccountData = [...editedAccountData];
    newEditedAccountData[index][name] = checked;
    setEditedAccountData(newEditedAccountData);
  };

  const handleSaveClick = async () => {
    for (let account of editedAccountData) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/editAccountById/${account.accountId}`,
          account
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error updating account data:", error);
      }
    }
    setEdit(0);
    try {
      const response = await axios.get("http://localhost:8080/api/getAllAccounts");
      setAccountData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching account data:", error);
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
  

  const handleDeleteAccount = async () => {
    const accountId = editedAccountData[deleteIndex].accountId;
    try {
        const response = await axios.delete(
            `http://localhost:8080/api/deleteAccountById/${accountId}`
        );
        console.log("Update response:", response.data);
    } catch (error) {
        console.error("Error updating account data:", error);
    }

    try {
        const response = await axios.get("http://localhost:8080/api/getAllAccounts");
        console.log("Fetched account data:", response.data);
        setAccountData(response.data);
        setEditedAccountData(response.data);
    } catch (error) {
        console.error("Error fetching account data:", error);
    }

    handleCloseDeleteDialog();
};

  

  // Add a new function to handle the search input change
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchEmail") {
      setSearchEmail(value);
    } else if (name === "searchPassword") {
      setSearchPassword(value);
    }
  };

  // Add a new function to handle the filter input change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "filterAdmin") {
      setFilterAdmin(value);
    } else if (name === "filterVendor") {
      setFilterVendor(value);
    }
  };

  // Add a new function to filter the account data based on the search and filter inputs
  const filterAccountData = () => {
    let filteredAccountData = accountData;
    // Filter by email
    if (searchEmail) {
      filteredAccountData = filteredAccountData.filter((account) =>
        account.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
    }
    // Filter by password
    if (searchPassword) {
      filteredAccountData = filteredAccountData.filter((account) =>
        account.password.toLowerCase().includes(searchPassword.toLowerCase())
      );
    }
    // Filter by admin status
    if (filterAdmin === "Yes") {
      filteredAccountData = filteredAccountData.filter((account) => account.isAdmin);
    } else if (filterAdmin === "No") {
      filteredAccountData = filteredAccountData.filter((account) => !account.isAdmin);
    }
    // Filter by vendor status
    if (filterVendor === "Yes") {
      filteredAccountData = filteredAccountData.filter((account) => account.isVendor);
    } else if (filterVendor === "No") {
      filteredAccountData = filteredAccountData.filter((account) => !account.isVendor);
    }
    return filteredAccountData;
  };

  return (
    <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
      <div>
        <h1 className="text-2xl font-bold pb-6" >Accounts</h1>
        <CustomButton
          label={edit === 1 ? "Save" : "Edit"}
          onClick={edit === 1 ? handleOpenDialog : handleEditClick}
        ></CustomButton>
        {/* Add new inputs for the search and filter features */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <label htmlFor="searchEmail" className="pr-2">Search by email:</label>
            <input
              type="text"
              id="searchEmail"
              name="searchEmail"
              value={searchEmail}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="searchPassword" className="pr-2">Search by password:</label>
            <input
              type="text"
              id="searchPassword"
              name="searchPassword"
              value={searchPassword}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="filterAdmin" className="pr-2">Filter by admin:</label>
            <select
              id="filterAdmin"
              name="filterAdmin"
              value={filterAdmin}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="filterVendor" className="pr-2">Filter by vendor:</label>
            <select
              id="filterVendor"
              name="filterVendor"
              value={filterVendor}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
        <table className="w-full">
          <thead className="text-left border-b border-[#0071B3] text-slate-500">
            <tr>
              <th className="w-1/5 pb-2" >Email</th>
              <th className="w-1/5 pb-2" >Password</th>
              <th className="w-1/5 pb-2" >Admin</th>
              <th className="w-1/5 pb-2" >Vendor</th>
              {/* Use a conditional rendering to display the Delete column header only when edit is 1 */}
              {edit === 1 && <th className="w-1/10 pb-2">Delete</th>}
            </tr>
          </thead>
          <tbody>
            {/* Use the filterAccountData function to display the filtered data */}
            {filterAccountData().map((account, index) => (
              <tr key={account.accountId}>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="email"
                      value={editedAccountData[index].email}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    account.email
                    )}
                    </td>
                    <td className="py-2">
                      {edit === 1 ? (
                        <input
                          type="text"
                          name="password"
                          value={editedAccountData[index].password}
                          onChange={(e) => handleChange(e, index)}
                        />
                      ) : (
                        account.password
                      )}
                    </td>
                    <td className="py-2">
                      {edit === 1 ? (
                        // Use the handleCheckboxChange function to update the isAdmin value
                        <input
                          type="checkbox"
                          name="isAdmin"
                          checked={editedAccountData[index].isAdmin}
                          onChange={(e) => handleCheckboxChange(e, index)}
                        />
                      ) : account.isAdmin === true ? (
                        "Yes"
                      ) : (
                        "No"
                      )}
                    </td>
                    <td className="py-2">
                      {edit === 1 ? (
                        // Use the handleCheckboxChange function to update the isVendor value
                        <input
                          type="checkbox"
                          name="isVendor"
                          checked={editedAccountData[index].isVendor}
                          onChange={(e) => handleCheckboxChange(e, index)}
                        />
                      ) : account.isVendor === true ? (
                        "Yes"
                      ) : (
                        "No"
                      )}
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
                  Are you sure you want to delete this account?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <CustomButton
                  label="Cancel"
                  onClick={handleCloseDeleteDialog}
                ></CustomButton>
                <CustomButton
                  label="Confirm Deletion"
                  onClick={handleDeleteAccount}
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
                  Are you sure you want to make any changes to the account data?
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
      
      export default AccountData;