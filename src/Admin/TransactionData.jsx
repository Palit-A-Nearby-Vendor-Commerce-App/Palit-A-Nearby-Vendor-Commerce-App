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

const TransactionData = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [edit, setEdit] = useState(0);
  const [editedTransactionData, setEditedTransactionData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [searchDetails, setSearchDetails] = useState("");
  const [searchCustomerId, setSearchCustomerId] = useState("");
  const [searchVendorId, setSearchVendorId] = useState("");

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/getAllTransactions");
        setTransactionData(response.data);
        setEditedTransactionData(response.data);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };
    fetchTransactionData();
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
    const newEditedTransactionData = [...editedTransactionData];
    newEditedTransactionData[index][name] = value;
    setEditedTransactionData(newEditedTransactionData);
  };

  const handleSaveClick = async () => {
    for (let transaction of editedTransactionData) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/updateTransactionById/${transaction.transactionId}`,
          transaction
        );
      } catch (error) {
        console.error("Error updating transaction data:", error);
      }
    }
    setEdit(0);
    try {
      const response = await axios.get("http://localhost:8080/api/getAllTransactions");
      setTransactionData(response.data);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
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

  const handleDeleteTransaction = async () => {
    const transactionId = editedTransactionData[deleteIndex].transactionId;
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/deleteTransactionById/${transactionId}`
      );
    } catch (error) {
      console.error("Error deleting transaction data:", error);
    }
    try {
      const response = await axios.get("http://localhost:8080/api/getAllTransactions");
      setTransactionData(response.data);
      setEditedTransactionData(response.data);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
    handleCloseDeleteDialog();
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchDetails") {
      setSearchDetails(value);
    } else if (name === "searchCustomerId") {
      setSearchCustomerId(value);
    } else if (name === "searchVendorId") {
      setSearchVendorId(value);
    }
  };

  const filterTransactionData = () => {
    let filteredTransactionData = transactionData;
    if (searchDetails) {
      filteredTransactionData = filteredTransactionData.filter((transaction) =>
        transaction.details.toLowerCase().includes(searchDetails.toLowerCase())
      );
    }
    if (searchCustomerId) {
      filteredTransactionData = filteredTransactionData.filter((transaction) =>
        transaction.customer.accountId.toString().toLowerCase().includes(searchCustomerId.toLowerCase())
      );
    }
    if (searchVendorId) {
      filteredTransactionData = filteredTransactionData.filter((transaction) =>
        transaction.vendor.accountId.toString().toLowerCase().includes(searchVendorId.toLowerCase())
      );
    }
    return filteredTransactionData;
  };

  return (
    <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
      <div>
        <div className="flex">
          <h1 className="text-2xl font-bold pb-6 text-[#0071B3]">Transactions</h1>
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
                <div>
                  Details
                  <input
                    type="text"
                    id="searchDetails"
                    name="searchDetails"
                    value={searchDetails}
                    onChange={handleSearchChange}
                    placeholder="Search details"
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  />
                </div>
              </th>
              <th className="w-1/5 pb-2">Status</th>
              <th className="w-1/5 pb-2">
                <div>
                  Customer ID
                  <input
                    type="text"
                    id="searchCustomerId"
                    name="searchCustomerId"
                    value={searchCustomerId}
                    onChange={handleSearchChange}
                    placeholder="Search customer id"
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  />
                </div>
              </th>
              <th className="w-1/5 pb-2">
                <div>
                  Vendor ID
                  <input
                    type="text"
                    id="searchVendorId"
                    name="searchVendorId"
                    value={searchVendorId}
                    onChange={handleSearchChange}
                    placeholder="Search vendor id"
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  />
                </div>
              </th>
              {edit === 1 && <th className="w-1/10 pb-2">Delete</th>}
            </tr>
          </thead>
          <tbody>
            {filterTransactionData().map((transaction, index) => (
              <tr key={transaction.transactionId}>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="details"
                      value={editedTransactionData[index].details}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    transaction.details
                  )}
                </td>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="status"
                      value={editedTransactionData[index].status}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    transaction.status
                  )}
                </td>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="customer.accountId"
                      value={editedTransactionData[index].customer.accountId}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    transaction.customer.accountId
                  )}
                </td>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="vendor.accountId"
                      value={editedTransactionData[index].vendor.accountId}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    transaction.vendor.accountId
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
            Are you sure you want to delete this transaction?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mr-5 mb-5">
          <CustomButton
            label="Cancel"
            onClick={handleCloseDeleteDialog}
          ></CustomButton>
          <CustomButton
            label="Delete"
            onClick={handleDeleteTransaction}
            btnStyle="bg-red-500 rounded-3xl text-white p-2 text-lg font-semibolds cursor-pointer p-3"
          ></CustomButton>
        </DialogActions>
      </Dialog>
      <Dialog open={open && edit === 1} onClose={handleCloseDialog}>
        <DialogTitle>Confirm changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to make any changes to the transaction data?
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

export default TransactionData;