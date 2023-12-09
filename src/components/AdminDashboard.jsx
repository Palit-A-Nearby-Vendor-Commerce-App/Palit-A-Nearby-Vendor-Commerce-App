import ChatIcon from "@mui/icons-material/Chat";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import HomeIcon from "@mui/icons-material/Home";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LogoutIcon from "@mui/icons-material/Logout";
import PaymentsIcon from "@mui/icons-material/Payments";
import PeopleIcon from "@mui/icons-material/People";
import ReportIcon from "@mui/icons-material/Report";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import CustomInput from "./CustomInput";
import { useHistory } from "react-router-dom";
import Accounts from "../Admin/Accounts";
import Dashboard from "../Admin/Dashboard";
import Products from "../Admin/Products";
import Chat from "../Admin/Chats";
import Reports from "../Admin/Reports";
import Statistics from "../Admin/Statistics";
import Stores from "../Admin/Stores";
import Transactions from "../Admin/Transactions";
import Users from "../Admin/Users";
import { UserContext } from "../UserContext";

const drawerWidth = 240;

export default function NavigationBarAdmin() {
  const [searchInput, setSearchInput] = useState("");
  const currentDate = new Date();
  const location = useLocation().pathname;
  const history = useHistory();
  const formattedDate = currentDate.toDateString();
  const { user, setUser } = React.useContext(UserContext);

  const handleLogout = () => {
    history.push("/adminlogin3x8Yz7!qA");
    setUser(null);
  };

  return (
    <Box sx={{ display: "flex " }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <img src={logo} alt="Palit app logo" className="w-3/4" />
        <Divider />
        <List>
          {[
            "Dashboard",
            "Statistics",
            "Reports",
            "Users",
            "Accounts",
            "Stores",
            "Transactions",
            "Products",
            "Chat",
          ].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{
                "&:hover": {
                  backgroundColor: "#0071B3",
                  color: "white",
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                },
              }}
            >
              <ListItemButton
                component={Link}
                to={`/admindashboard/${text.toLowerCase()}`}
              >
                <ListItemIcon>
                  {(() => {
                    switch (text) {
                      case "Dashboard":
                        return <HomeIcon />;
                      case "Statistics":
                        return <StackedLineChartIcon />;
                      case "Reports":
                        return <ReportIcon />;
                      case "Users":
                        return <PeopleIcon />;
                      case "Accounts":
                        return <FolderSharedIcon />;
                      case "Stores":
                        return <LocalGroceryStoreIcon />;
                      case "Transactions":
                        return <PaymentsIcon />;
                      case "Products":
                        return <ShoppingBagIcon />;
                      case "Chat":
                        return <ChatIcon />;
                      default:
                        return null;
                    }
                  })()}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List
          sx={{
            "&:hover": {
              backgroundColor: "#E8594F",
              color: "white",
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            },
          }}
        >
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#D6F3F9",
          height: "100vh",
          overflow: "auto",
        }}
      >
        {/* <Toolbar /> */}
        <section className="font-custom">
          <div className="flex justify-between items-center ">
            <div>
              <h1 className="text-4xl font-bold ">Dashboard</h1>
              <p className="text-sm text-slate-400">{formattedDate}</p>
            </div>
            <div className="w-[250px]">
              <CustomInput
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          {location === "/admindashboard/dashboard" && <Dashboard />}
          {location === "/admindashboard/statistics" && <Statistics />}
          {location === "/admindashboard/reports" && <Reports />}
          {location === "/admindashboard/users" && <Users />}
          {location === "/admindashboard/accounts" && <Accounts />}
          {location === "/admindashboard/stores" && <Stores />}
          {location === "/admindashboard/transactions" && <Transactions />}
          {location === "/admindashboard/products" && <Products />}
          {location === "/admindashboard/chat" && <Chat />}
        </section>
      </Box>
    </Box>
  );
}
