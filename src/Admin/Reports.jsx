import axios from "axios";
import React, { useEffect, useState } from "react";
import ReportsData from "./ReportsData";

const Reports = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3008/reports")
      .then((response) => setReportData(response.data))
      .catch((error) => console.error("Error fetching reports data:", error));
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold pb-6 mt-10">Reports</h1>
      <ReportsData />
    </div>
  );
};

export default Reports;
