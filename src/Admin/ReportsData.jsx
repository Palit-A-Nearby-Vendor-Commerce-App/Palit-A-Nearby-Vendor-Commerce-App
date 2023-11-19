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
      .get("http://localhost:3008/reports")
      .then((response) => setReportData(response.data))
      .catch((error) =>
        console.error("Error fetching reports data:", error)
      );
  }, []);

  const handleEditClick = () => {
    setEdit(1);
  };

  const handleCheckboxChange = (reportId) => {
    setResolvedCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [reportId]: !prevCheckboxes[reportId],
    }));
  };

  return (
    <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
      <div>
        <h1 className="text-2xl font-bold pb-6">Report</h1>
        <CustomButton label={`Edit`} onClick={handleEditClick}></CustomButton>
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
                      checked={resolvedCheckboxes[report.reportId] || false}
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
