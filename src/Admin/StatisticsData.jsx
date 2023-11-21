// import React from 'react';
// import { Bar, Line } from 'react-chartjs-2';

// const StatisticsData = () => {
//     const transactions = [
//         { status: 'Completed', rating: 5 },
//         { status: 'Pending', rating: 4 },
//         { status: 'Cancelled', rating: 3 },
//         { status: 'Completed', rating: 5 },
//         { status: 'Pending', rating: 4 },
//     ];

//     const reports = [
//         { isResolved: true },
//         { isResolved: true },
//         { isResolved: false },
//         { isResolved: false },
//         { isResolved: false },
//     ];

//     const users = [
//         { id: 1, fullname: 'John Doe', userType: 'Vendor' },
//         { id: 2, fullname: 'Jane Smith', userType: 'Customer' },
//         { id: 3, fullname: 'Joshua Briones', userType: 'Vendor' },
//         { id: 4, fullname: 'Eren Kuno', userType: 'Customer' },
//         { id: 5, fullname: 'Doe John', userType: 'Vendor' },
//     ];

//     const totalTransactions = transactions.length;

//     const resolvedReports = reports.filter(report => report.isResolved === true);
//     const resolutionRate = (resolvedReports.length / reports.length) * 100 || 0;

//     const totalUsers = users.length;

//     const websiteVisitorsData = {
//         labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
//         datasets: [
//             {
//                 label: 'Website Visitors',
//                 backgroundColor: 'rgba(75,192,192,0.4)',
//                 borderColor: 'rgba(75,192,192,1)',
//                 borderWidth: 1,
//                 hoverBackgroundColor: 'rgba(75,192,192,0.6)',
//                 hoverBorderColor: 'rgba(75,192,192,1)',
//                 data: [65, 59, 80, 81, 56],
//             },
//         ],
//     };

//     const salesAnalyticsData = {
//         labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
//         datasets: [
//             {
//                 label: 'Total Sales (in thousands)',
//                 fill: false,
//                 lineTension: 0.1,
//                 backgroundColor: 'rgba(75,192,192,0.4)',
//                 borderColor: 'rgba(75,192,192,1)',
//                 borderCapStyle: 'butt',
//                 borderDash: [],
//                 borderDashOffset: 0.0,
//                 borderJoinStyle: 'miter',
//                 pointBorderColor: 'rgba(75,192,192,1)',
//                 pointBackgroundColor: '#fff',
//                 pointBorderWidth: 1,
//                 pointHoverRadius: 5,
//                 pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//                 pointHoverBorderColor: 'rgba(220,220,220,1)',
//                 pointHoverBorderWidth: 2,
//                 pointRadius: 1,
//                 pointHitRadius: 10,
//                 data: [30, 40, 25, 45, 30, 50, 35],
//             },
//         ],
//     };

    

//     return (
        
//         <div className="container mx-auto p-4" >
//           <div className="flex flex-wrap -mx-2">
//             <div className="w-full md:w-1/3 px-2 mb-4">
//               <div className="border border-gray-300 p-4 bg-blue-400 rounded-lg shadow-md">
//                 <h2 className="text-2xl mb-2">Total Users</h2>
//                 <p className="text-5xl font-bold text-center">{totalUsers}</p>
//                 <p className='text-center'>From the running month</p>
//               </div>
//             </div>
    
//             {/* Total Transactions */}
//             <div className="w-full md:w-1/3 px-2 mb-4">
//               <div className="border border-gray-300 p-4 bg-yellow-300 rounded-lg shadow-md">
//                 <h2 className="text-2xl mb-2">Total Transactions</h2>
//                 <p className="text-5xl font-bold text-center">{totalTransactions}</p>
//                 <p className='text-center'>Daily Transactions for the month</p>
//               </div>
//             </div>
    
//             {/* Report Resolution Rate */}
//             <div className="w-full md:w-1/3 px-2 mb-4">
//               <div className="border border-gray-300 p-4 bg-red-400 rounded-lg shadow-md">
//                 <h2 className="text-2xl mb-2">Report Resolution Rate</h2>
//                 <p className="text-5xl font-bold text-center ">{resolutionRate.toFixed(2)}%</p>
//                 <p className='text-center'>+ 7.46% greater than last month</p>
//               </div>
//             </div>
//           </div>
    
//           {/* Display graphs side by side */}
//           <div className="flex flex-wrap -mx-2">
//             {/* Sales Analytics Line Graph */}
//             <div className="w-full md:w-1/2 px-2 mb-4 ">
//               <div className="border border-gray-300 p-4 rounded shadow-md bg-white">
//                 <h2 className="text-2xl font-bold mb-2">Sales Analytics (Past 7 Days)</h2>
//                 <Line data={salesAnalyticsData} />
//               </div>
//             </div>
    
//             {/* Website Visitors Bar Graph */}
//             <div className="w-full md:w-1/2 px-2 mb-4">
//               <div className="border border-gray-300 p-4 rounded shadow-md bg-white">
//                 <h2 className="text-2xl font-bold mb-2">Website Visitors</h2>
//                 <Bar data={websiteVisitorsData} />
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     };
    
//     export default StatisticsData;