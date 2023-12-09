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

const AccountData = () => {
  const [accountData, setAccountData] = useState([]);
  const [edit, setEdit] = useState(0);
  const [editedAccountData, setEditedAccountData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPassword, setSearchPassword] = useState("");
  const [filterAdmin, setFilterAdmin] = useState("All");
  const [filterVendor, setFilterVendor] = useState("All");

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/getAllAccounts"
        );
        setAccountData(response.data);
        setEditedAccountData(response.data);
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

  const handleCheckboxChange = (e, index) => {
    const { name, checked } = e.target;
    const newEditedAccountData = [...editedAccountData];
    newEditedAccountData[index][name] = checked;
    setEditedAccountData(newEditedAccountData);
  };

  const handleSaveClick = async () => {
    for (let account of editedAccountData) {
      try {
        await axios.put(
          `http://localhost:8080/api/updateAccountById/${account.accountId}`,
          account
        );
      } catch (error) {
        console.error("Error updating account data:", error);
      }
    }
    setEdit(0);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/getAllAccounts"
      );
      setAccountData(response.data);
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
      await axios.delete(
        `http://localhost:8080/api/deleteAccountById/${accountId}`
      );
    } catch (error) {
      console.error("Error updating account data:", error);
    }

    try {
      const response = await axios.get(
        "http://localhost:8080/api/getAllAccounts"
      );
      setAccountData(response.data);
      setEditedAccountData(response.data);
    } catch (error) {
      console.error("Error fetching account data:", error);
    }

    handleCloseDeleteDialog();
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchEmail") {
      setSearchEmail(value);
    } else if (name === "searchPassword") {
      setSearchPassword(value);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "filterAdmin") {
      setFilterAdmin(value);
    } else if (name === "filterVendor") {
      setFilterVendor(value);
    }
  };

  const filterAccountData = () => {
    let filteredAccountData = accountData;
    if (searchEmail) {
      filteredAccountData = filteredAccountData.filter((account) =>
        account.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
    }
    if (searchPassword) {
      filteredAccountData = filteredAccountData.filter((account) =>
        account.password.toLowerCase().includes(searchPassword.toLowerCase())
      );
    }
    if (filterAdmin === "Yes") {
      filteredAccountData = filteredAccountData.filter(
        (account) => account.isAdmin
      );
    } else if (filterAdmin === "No") {
      filteredAccountData = filteredAccountData.filter(
        (account) => !account.isAdmin
      );
    }
    if (filterVendor === "Yes") {
      filteredAccountData = filteredAccountData.filter(
        (account) => account.isVendor
      );
    } else if (filterVendor === "No") {
      filteredAccountData = filteredAccountData.filter(
        (account) => !account.isVendor
      );
    }
    return filteredAccountData;
  };

  return (
    <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
      <div>
        <div className="flex">
          <h1 className="text-2xl font-bold pb-6 text-[#0071B3]">Accounts</h1>
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
                <div className="flex">
                  Email
                  <input
                    type="text"
                    id="searchEmail"
                    name="searchEmail"
                    value={searchEmail}
                    onChange={handleSearchChange}
                    placeholder="Search email"
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  />
                </div>
              </th>
              <th className="w-1/5 pb-2">
                <div>
                  Password
                  <input
                    type="text"
                    id="searchPassword"
                    name="searchPassword"
                    value={searchPassword}
                    onChange={handleSearchChange}
                    placeholder="Search password"
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  />
                </div>
              </th>
              <th className="w-1/5 pb-2">
                <div className="flex">
                  Admin
                  <select
                    id="filterAdmin"
                    name="filterAdmin"
                    value={filterAdmin}
                    onChange={handleFilterChange}
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  >
                    <option value="All">All</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </th>
              <th className="w-1/5 pb-2">
                <div>
                  Vendor
                  <select
                    id="filterVendor"
                    name="filterVendor"
                    value={filterVendor}
                    onChange={handleFilterChange}
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  >
                    <option value="All">All</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </th>
              {edit === 1 && <th className="w-1/10 pb-2">Delete</th>}
            </tr>
          </thead>
          <tbody>
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
            Are you sure you want to delete this report?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mr-5 mb-5">
          <CustomButton
            label="Cancel"
            onClick={handleCloseDeleteDialog}
          ></CustomButton>
          <CustomButton
            label="Delete"
            onClick={handleDeleteAccount}
            btnStyle="bg-red-500 rounded-3xl text-white p-2 text-lg font-semibolds cursor-pointer p-3"
          ></CustomButton>
        </DialogActions>
      </Dialog>
      <Dialog open={open && edit === 1} onClose={handleCloseDialog}>
        <DialogTitle>Confirm changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to make any changes to the report data?
          </DialogContentText>
        </DialogContent>
        <DialogActions className=" mr-5 mb-5">
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

export default AccountData;
