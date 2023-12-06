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

const ReportsData = () => {
  const [reportData, setReportData] = useState([]);
  const [edit, setEdit] = useState(0);
  const [editedReportData, setEditedReportData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [searchSender, setSearchSender] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [filterResolved, setFilterResolved] = useState("All");

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/getAllReports"
        );
        setReportData(response.data);
        setEditedReportData(response.data);
      } catch (error) {
        console.error("Error fetching reports data:", error);
      }
    };
    fetchReportData();
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
    const newEditedReportData = [...editedReportData];
    newEditedReportData[index][name] = value;
    setEditedReportData(newEditedReportData);
  };

  const handleCheckboxChange = (e, index) => {
    const { checked } = e.target;
    const newEditedReportData = [...editedReportData];
    newEditedReportData[index].isResolved = checked;
    setEditedReportData(newEditedReportData);
  };

  const handleSaveClick = async () => {
    for (let report of editedReportData) {
      try {
        await axios.put(
          `http://localhost:8080/api/updateReportById/${report.reportId}`,
          report
        );
      } catch (error) {
        console.error("Error updating report data:", error);
      }
    }
    setEdit(0);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/getAllReports"
      );
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching reports data:", error);
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

  const handleDeleteReport = async () => {
    const reportId = editedReportData[deleteIndex].reportId;
    try {
      await axios.delete(
        `http://localhost:8080/api/deleteReportById/${reportId}`
      );
    } catch (error) {
      console.error("Error deleting report data:", error);
    }
    try {
      const response = await axios.get(
        "http://localhost:8080/api/getAllReports"
      );
      setReportData(response.data);
      setEditedReportData(response.data);
    } catch (error) {
      console.error("Error fetching reports data:", error);
    }
    handleCloseDeleteDialog();
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchSender") {
      setSearchSender(value);
    } else if (name === "searchMessage") {
      setSearchMessage(value);
    }
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilterResolved(value);
  };

  const filterReportData = () => {
    let filteredReportData = reportData;
    if (searchSender) {
      filteredReportData = filteredReportData.filter((report) =>
        report.senderId.email.toLowerCase().includes(searchSender.toLowerCase())
      );
    }
    if (searchMessage) {
      filteredReportData = filteredReportData.filter((report) =>
        report.messageContent
          .toLowerCase()
          .includes(searchMessage.toLowerCase())
      );
    }
    if (filterResolved === "Resolved") {
      filteredReportData = filteredReportData.filter(
        (report) => report.isResolved
      );
    } else if (filterResolved === "Pending") {
      filteredReportData = filteredReportData.filter(
        (report) => !report.isResolved
      );
    }
    return filteredReportData;
  };

  return (
    <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
      <div>
        <div className="flex">
          <h1 className="text-2xl font-bold pb-6 text-[#0071B3]">Report</h1>
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
                  Sender
                  <input
                    type="text"
                    id="searchSender"
                    name="searchSender"
                    value={searchSender}
                    onChange={handleSearchChange}
                    placeholder="Search sender"
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  />
                </div>
              </th>
              <th className="w-2/5 pb-2">
                <div className="flex items-center">
                  Message Content
                  <input
                    type="text"
                    id="searchMessage"
                    name="searchMessage"
                    value={searchMessage}
                    onChange={handleSearchChange}
                    placeholder="Search message"
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  />
                </div>
              </th>
              <th className="w-1/5 pb-2">Time Stamp</th>
              <th className="w-1/10 pb-2">
                <div className="flex items-center">
                  <label htmlFor="filterResolved" className="pr-2">
                    Resolved
                  </label>
                  <select
                    id="filterResolved"
                    name="filterResolved"
                    value={filterResolved}
                    onChange={handleFilterChange}
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  >
                    <option value="All">All</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </th>
              {edit === 1 && <th className="w-1/10 pb-2">Delete</th>}
            </tr>
          </thead>
          <tbody>
            {filterReportData().map((report, index) => (
              <tr key={report.reportId}>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="senderName"
                      value={editedReportData[index].senderId.email}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    report.senderId.email
                  )}
                </td>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="messageContent"
                      value={editedReportData[index].messageContent}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    report.messageContent
                  )}
                </td>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="date"
                      name="timestamp"
                      value={editedReportData[index].timestamp}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    report.timestamp
                  )}
                </td>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="checkbox"
                      name="isResolved"
                      checked={editedReportData[index].isResolved}
                      onChange={(e) => handleCheckboxChange(e, index)}
                    />
                  ) : report.isResolved === true ? (
                    "Resolved"
                  ) : (
                    "Pending"
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
            onClick={handleDeleteReport}
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

export default ReportsData;
