import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// Your other component imports
import ReportsData from "./ReportsData";
import StoreData from "./StoreData";
import UserData from "./UserData";
import ProductData from "./ProductData";
import StatisticsData from "./StatisticsData";
import AccountData from "./AccountData";
import TransactionData from "./TransactionData";
import ChatData from "./ChatData";

const marginBottomStyle = {
  marginBottom: "2rem", // Adjust the margin size as needed
};

const Dashboard = () => {
  const exportPDF = () => {
    const input = document.getElementById("dashboard");

    setTimeout(() => {
      html2canvas(input, {
        scrollY: -window.scrollY,
        scale: 1,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "pt", [canvas.width, canvas.height]);
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("dashboard.pdf");
      });
    }, 1000); // Delay of 1000 milliseconds (1 second)
  };

  return (
    <div className="w-full">
      <Typography paragraph>
        {/* Replace with your existing text content */}
      </Typography>

      {/* Button for exporting the dashboard */}
      <Button variant="contained" color="primary" onClick={exportPDF}>
        Export Dashboard as PDF
      </Button>

        {/* Dashboard components */}
        <StatisticsData />
      <div id="dashboard">
        <div style={marginBottomStyle}>
          <ReportsData />
        </div>
        <div style={marginBottomStyle}>
          <UserData />
        </div>
        <div style={marginBottomStyle}>
          <AccountData />
        </div>
        <div style={marginBottomStyle}>
          <StoreData />
        </div>
        <div style={marginBottomStyle}>
          <TransactionData />
        </div>
        <div style={marginBottomStyle}>
          <ProductData />
        </div>
        <div style={marginBottomStyle}>
          <ChatData />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
