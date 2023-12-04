import Typography from "@mui/material/Typography";
import React from "react";
import ReportsData from "./ReportsData";
import StoreData from "./StoreData";
import UserData from "./UserData";
import ProductData from "./ProductData";
import StatisticsData from "./StatisticsData";
import AccountData from "./AccountData";
import TransactionData from "./TransactionData";
import ChatData from "./ChatData"

const marginBottomStyle = {
  marginBottom: "2rem", // You can adjust the margin size as needed
};

const Dashboard = () => {
  return (
    <div className="w-full">
      <Typography paragraph>
        {/* Your existing text content */}
      </Typography>

      <StatisticsData />

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
  );
};

export default Dashboard;
