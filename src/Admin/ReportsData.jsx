import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper } from "@material-ui/core";
import CustomButton from "../components/CustomButton";

const ReportsData = () => {
  const [reportData, setReportData] = useState([]);
  const [edit, setEdit] = useState(0);
  const [resolvedCheckboxes, setResolvedCheckboxes] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getAllReports")
      .then((response) => {
        setReportData(response.data);
        const initialCheckboxes = {};
        response.data.forEach((report) => {
          initialCheckboxes[report.reportId] = report.isResolved === "true";
        });
        setResolvedCheckboxes(initialCheckboxes);
      })
      .catch((error) =>
        console.error("Error fetching reports data:", error)
      );
  }, []);

  const handleEditClick = () => {
    setEdit(1);
  };

  const handleSaveClick = () => {
    // Create a variable to store the updated reports data
    let updatedReportsData = [];
    // Loop through the reportData array
    reportData.forEach((report) => {
      // Compare the isResolved value of each report with the resolvedCheckboxes state
      if (report.isResolved !== resolvedCheckboxes[report.reportId]) {
        // If they are different, add that report to the updated reports data
        updatedReportsData.push(report);
      }
    });
    // Check if the updated reports data is not empty
    if (updatedReportsData.length > 0) {
      // Use axios to make a PUT request to the API endpoint with the updated reports data as the payload
      axios
        .put("http://localhost:3008/reports", updatedReportsData)
        .then((response) => {
          // Handle the response from the API request
          console.log("Reports data updated successfully:", response.data);
        })
        .catch((error) => {
          // Handle the error from the API request
          console.error("Error updating reports data:", error);
        });
    }
    // Set the edit state back to 0 to exit the edit mode
    setEdit(0);
  };
  
  const handleCheckboxChange = (reportId) => {
    // Copy the resolvedCheckboxes state into a new object
    const prevCheckboxes = { ...resolvedCheckboxes };
    // Update the resolvedCheckboxes state
    setResolvedCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [reportId]: !prevCheckboxes[reportId],
    }));
    // Update the report.isResolved value in the reportData array
    setReportData((prevData) =>
      prevData.map((report) =>
        report.reportId === reportId
          ? { ...report, isResolved: !prevCheckboxes[reportId] ? "true" : "false" }
          : report
      )
    );
  };
  
  return (
    <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
      <div>
        <h1 className="text-2xl font-bold pb-6">Report</h1>
        <CustomButton
          // Use a ternary operator to change the button label
          label={edit === 1 ? "Save" : "Edit"}
          // Pass the handleSaveClick function as a prop
          onClick={edit === 1 ? handleSaveClick : handleEditClick}
        ></CustomButton>
        <table className="w-full">
          <thead className="text-left border-b border-[#0071B3] text-slate-500">
            <tr>
              <th className="w-1/5 pb-2">Sender Name</th>
              <th className="w-1/5 pb-2">Message Content</th>
              <th className="w-1/5 pb-2">Time Stamp</th>
              <th className="w-1/10 pb-2">isResolved</th>
              {edit === 1 && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {reportData.map((report) => (
              <tr key={report.reportId}>
                <td className="py-2">{report.senderName}</td>
                <td className="py-2">{report.messageContent}</td>
                <td className="py-2">{report.timestamp}</td>
                {edit === 1 ? (
                  <td className="py-2">
                    <input
                      type="checkbox"
                      checked={resolvedCheckboxes[report.reportId]}
                      onChange={() => handleCheckboxChange(report.reportId)}
                    />
                  </td>
                ) : (
                  <td className="py-2">
                    {report.isResolved === "true" ? "Resolved" : "Pending"}
                  </td>
                )}
                {edit === 1 && <td>Delete button goes here</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Paper>
  );
};

export default ReportsData;
