import NavigationBarAdmin from "../components/NavigationBarAdmin";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper } from "@material-ui/core";
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
      <ReportsData />
    </div>
  );
};

export default Reports;
