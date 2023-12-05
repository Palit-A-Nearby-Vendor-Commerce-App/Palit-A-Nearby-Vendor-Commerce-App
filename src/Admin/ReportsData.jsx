import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import CustomButton from "../components/CustomButton";

const ReportsData = () => {
  const [reportData, setReportData] = useState([]);
  const [edit, setEdit] = useState(0);
  const [editedReportData, setEditedReportData] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  // Add new states for the search and filter inputs
  const [searchSender, setSearchSender] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [filterResolved, setFilterResolved] = useState("All");

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/getAllReports");
        setReportData(response.data);
        setEditedReportData(response.data);
        console.log(response.data);
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

  // Add a new function to handle the checkbox change
  const handleCheckboxChange = (e, index) => {
    const { checked } = e.target;
    const newEditedReportData = [...editedReportData];
    newEditedReportData[index].isResolved = checked;
    setEditedReportData(newEditedReportData);
  };

  const handleSaveClick = async () => {
    for (let report of editedReportData) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/updateReportById/${report.reportId}`,
          report
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error updating report data:", error);
      }
    }
    setEdit(0);
    try {
      const response = await axios.get("http://localhost:8080/api/getAllReports");
      setReportData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching reports data:", error);
    }
  };

  const handleDeleteClick = async (index) => {
    setDeleteIndex(index);
    handleOpenDialog();
  };

  const handleDeleteReport = async () => {
    const report = editedReportData[deleteIndex];
    report.isDeleted = true;
    try {
      const response = await axios.put(
        `http://localhost:8080/api/updateReportById/${report.reportId}`,
        report
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting report data:", error);
    }
    handleCloseDialog();
    try {
      const response = await axios.get("http://localhost:8080/api/getAllReports");
      setReportData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching reports data:", error);
    }
  };

  // Add a new function to handle the search input change
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchSender") {
      setSearchSender(value);
    } else if (name === "searchMessage") {
      setSearchMessage(value);
    }
  };

  // Add a new function to handle the filter input change
  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilterResolved(value);
  };

  // Add a new function to filter the report data based on the search and filter inputs
  const filterReportData = () => {
    let filteredReportData = reportData;
    // Filter by sender name
    if (searchSender) {
      filteredReportData = filteredReportData.filter((report) =>
        report.senderId.email.toLowerCase().includes(searchSender.toLowerCase())
      );
    }
    // Filter by message content
    if (searchMessage) {
      filteredReportData = filteredReportData.filter((report) =>
        report.messageContent.toLowerCase().includes(searchMessage.toLowerCase())
      );
    }
    // Filter by resolved status
    if (filterResolved === "Resolved") {
      filteredReportData = filteredReportData.filter((report) => report.isResolved);
    } else if (filterResolved === "Pending") {
      filteredReportData = filteredReportData.filter((report) => !report.isResolved);
    }
    return filteredReportData;
  };

  return (
    <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
      <div>
        <h1 className="text-2xl font-bold pb-6">Report</h1>
        <CustomButton
          label={edit === 1 ? "Save" : "Edit"}
          onClick={edit === 1 ? handleOpenDialog : handleEditClick}
        ></CustomButton>
        {/* Add new inputs for the search and filter features */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <label htmlFor="searchSender" className="pr-2">Search by sender:</label>
            <input
              type="text"
              id="searchSender"
              name="searchSender"
              value={searchSender}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="searchMessage" className="pr-2">Search by message:</label>
            <input
              type="text"
              id="searchMessage"
              name="searchMessage"
              value={searchMessage}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="filterResolved" className="pr-2">Filter by resolved:</label>
            <select
              id="filterResolved"
              name="filterResolved"
              value={filterResolved}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="Resolved">Resolved</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
        <table className="w-full">
          <thead className="text-left border-b border-[#0071B3] text-slate-500">
            <tr>
              <th className="w-1/5 pb-2">Sender</th>
              <th className="w-1/5 pb-2">Message Content</th>
              <th className="w-1/5 pb-2">Time Stamp</th>
              <th className="w-1/10 pb-2">isResolved</th>
              {/* Use a conditional rendering to display the Delete column header only when edit is 1 */}
              {edit === 1 && <th className="w-1/10 pb-2">Delete</th>}
            </tr>
          </thead>
          <tbody>
            {/* Use the filterReportData function to display the filtered data */}
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
                    // Use the handleCheckboxChange function to update the isResolved value
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
          open={open}
          onClose={handleCloseDialog}
        >
          <DialogTitle>Confirm changes</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {edit === 1
                ? "Are you sure you want to make any changes to the report data?"
                : "Are you sure you want to delete this report?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <CustomButton
              label="Cancel"
              onClick={handleCloseDialog}
            ></CustomButton>
            <CustomButton
              label={edit === 1 ? "Confirm Changes" : "Confirm Deletion"}
              onClick={edit === 1 ? handleConfirmDialog : handleDeleteReport}
            ></CustomButton>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  };
  
  export default ReportsData;