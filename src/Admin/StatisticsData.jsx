import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";

const StatisticsData = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [resolutionRate, setResolutionRate] = useState(0);

  const reports = [
    { isResolved: true },
    { isResolved: true },
    { isResolved: false },
    { isResolved: false },
    { isResolved: false },
  ];



  const websiteVisitorsData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Website Visitors",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  const salesAnalyticsData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Total Sales (in thousands)",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [30, 40, 25, 45, 30, 50, 35],
      },
    ],
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getAllUsers")
      .then((response) => {
        setTotalUsers(response.data.length);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the total number of users!",
          error
        );
      });

    // New API call to get all transactions
    axios
      .get("http://localhost:8080/api/getAllTransactions")
      .then((response) => {
        setTotalTransactions(response.data.length);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the total number of transactions!",
          error
        );
      });

    // New API call to get all reports and calculate resolution rate
    axios
      .get("http://localhost:8080/api/getAllReports")
      .then((response) => {
        const reports = response.data;
        const resolvedReports = reports.filter(
          (report) => report.isResolved === true
        );
        const resolutionRate =
          (resolvedReports.length / reports.length) * 100 || 0;
        setResolutionRate(resolutionRate);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the total number of reports!",
          error
        );
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/3 px-2 mb-4">
          <div className="border border-gray-300 p-4 bg-blue-400 rounded-lg shadow-md">
            <h2 className="text-2xl mb-2">Total Users</h2>
            <p className="text-5xl font-bold text-center">{totalUsers}</p>
            <p className="text-center">From the running month</p>
          </div>
        </div>

        {/* Total Transactions */}
        <div className="w-full md:w-1/3 px-2 mb-4">
          <div className="border border-gray-300 p-4 bg-yellow-300 rounded-lg shadow-md">
            <h2 className="text-2xl mb-2">Total Transactions</h2>
            <p className="text-5xl font-bold text-center">
              {totalTransactions}
            </p>
            <p className="text-center">Daily Transactions for the month</p>
          </div>
        </div>

        {/* Report Resolution Rate */}
        <div className="w-full md:w-1/3 px-2 mb-4">
          <div className="border border-gray-300 p-4 bg-red-400 rounded-lg shadow-md">
            <h2 className="text-2xl mb-2">Report Resolution Rate</h2>
            <p className="text-5xl font-bold text-center ">
              {resolutionRate.toFixed(2)}%
            </p>
            <p className="text-center">From the running month</p>
          </div>
        </div>
      </div>

      {/* Display graphs side by side */}
      <div className="flex flex-wrap -mx-2">
        {/* Sales Analytics Line Graph */}
        <div className="w-full md:w-1/2 px-2 mb-4 ">
          <div className="border border-gray-300 p-4 rounded shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-2">
              Sales Analytics (Past 7 Days)
            </h2>
            <Line data={salesAnalyticsData} />
          </div>
        </div>

        {/* Website Visitors Bar Graph */}
        <div className="w-full md:w-1/2 px-2 mb-4">
          <div className="border border-gray-300 p-4 rounded shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-2">Website Visitors</h2>
            <Bar data={websiteVisitorsData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsData;
