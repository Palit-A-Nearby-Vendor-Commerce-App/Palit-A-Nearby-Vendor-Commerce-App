import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";

const StatisticsData = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [resolutionRate, setResolutionRate] = useState(0);
  const [reportsData, setReportsData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  

  const ageDistributionData = {
    labels: ['10-20', '20-30', '30-40', '40-50', '50+'],
    datasets: [
      {
        label: 'Number of Users',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: ageData,
      },
    ],
  };

  const reportsAnalyticsData = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [
      {
        label: "Total Reports",
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
        data: reportsData,
      },
    ],
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:8080/api/getAllUsers")
        .then((response) => {
          const users = response.data;
          setTotalUsers(users.length);
  
          const ageCounts = {};
          users.forEach(user => {
            const birthDate = moment(user.birthDate);
            const age = moment().diff(birthDate, 'years');
  
            let ageRange;
            if (age < 20) ageRange = '10-20';
            else if (age < 30) ageRange = '20-30';
            else if (age < 40) ageRange = '30-40';
            else if (age < 50) ageRange = '40-50';
            else ageRange = '50+';
  
            ageCounts[ageRange] = (ageCounts[ageRange] || 0) + 1;
          });
  
          const ageRanges = ['10-20', '20-30', '30-40', '40-50', '50+'];
          const counts = ageRanges.map(range => ageCounts[range] || 0);
          setAgeData(counts);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the total number of users!",
            error
          );
        });
  
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
  
          const pastWeekReports = Array(7).fill(0);
          const oneWeekAgo = moment().subtract(7, 'days');
          reports.forEach(report => {
            const reportDate = moment(report.timestamp);
            if (reportDate.isAfter(oneWeekAgo)) {
              const dayOfWeek = reportDate.day();
              pastWeekReports[dayOfWeek]++;
            }
          });
          setReportsData(pastWeekReports);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the total number of reports!",
            error
          );
        });
    };
  
    fetchData();
    const intervalId = setInterval(fetchData, 100); 
  
    return () => clearInterval(intervalId);
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

        <div className="w-full md:w-1/3 px-2 mb-4">
          <div className="border border-gray-300 p-4 bg-yellow-300 rounded-lg shadow-md">
            <h2 className="text-2xl mb-2">Total Transactions</h2>
            <p className="text-5xl font-bold text-center">
              {totalTransactions}
            </p>
            <p className="text-center">Daily Transactions for the month</p>
          </div>
        </div>

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

      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4 ">
          <div className="border border-gray-300 p-4 rounded shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-2">
              Reports Analytics for this week
            </h2>
            <Line
              data={reportsAnalyticsData}
              options={{
                scales: {
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Days of the Week'
                    }
                  }],
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Number of Reports'
                    },
                    ticks: {
                      stepSize: 1
                    }
                  }]
                }
              }}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 px-2 mb-4">
          <div className="border border-gray-300 p-4 rounded shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-2">Age Distribution</h2>
            <Bar
              data={ageDistributionData}
              options={{
                scales: {
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Age Ranges'
                    }
                  }],
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Number of Users'
                    },
                    ticks: {
                      stepSize: 1
                    }
                  }]
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsData;
