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
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import CustomInput from "../components/CustomInput";

import Dashboard from "../Admin/Dashboard";
import Statistics from "../Admin/Statistics";
import Reports from "../Admin/Reports";

const drawerWidth = 240;

export default function NavigationBarAdmin() {
  const [searchInput, setSearchInput] = useState("");
  const currentDate = new Date();
  const location = useLocation().pathname;

  const formattedDate = currentDate.toDateString();

  return (
    <Box sx={{ display: "flex" }}>
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
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {/* <Toolbar /> */}
        <section id="dashboard" className="font-custom">
          <div className="flex justify-between items-center ">
            <di>
              <h1 className="text-4xl font-bold ">Dashboard</h1>
              <p class="text-sm text-slate-400">{formattedDate}</p>
            </di>
            <div className="w-[250px]">
              <CustomInput
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          {location === "/admindashboard/statistics" && <Statistics />}
          {location === "/admindashboard/dashboard" && <Dashboard />}
          {location === "/admindashboard/reports" && <Reports />}
          {/* {(() => {
            switch (location) {
              case "/admindashboard/dashboard":
                return <Dashboard />;
              case "/admindashboard/statistics":
                return <Statistics />;
              case "/admindashboard/reports":
                return <Reports />;
              default:
                return null;
            }
          })()} */}
        </section>
      </Box>
    </Box>
  );
}
