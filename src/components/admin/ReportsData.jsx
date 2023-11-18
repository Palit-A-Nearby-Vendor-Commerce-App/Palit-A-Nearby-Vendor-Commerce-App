import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper } from "@material-ui/core";

const ReportsData = () => {
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3008/reports')
          .then(response => setReportData(response.data))
          .catch(error => console.error('Error fetching reports data:', error));
    }, []);

    
    return (
        <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
            <div>
                <h1 className="text-2xl font-bold pb-6" >report</h1>
                <table className="w-full">
                <thead className="text-left border-b border-[#0071B3] text-slate-500">
                    <tr>
                    <th className="w-1/5 pb-2" >Sender Name</th>
                    <th className="w-1/5 pb-2" >Message Content</th>
                    <th className="w-1/5 pb-2" >Time Stamp</th>
                    <th className="w-1/10 pb-2" >isResolved</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map(report => (
                    <tr key={report.reportId}>
                        <td className="py-2">{report.senderName}</td>
                        <td className="py-2">{report.messageContent}</td>
                        <td className="py-2">{report.timestamp}</td>
                        {report.isResolved === "true" ? <td className="py-2">Revolved</td> : <td className="py-2">Pending</td>}
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </Paper>
    );
}

export default ReportsData;