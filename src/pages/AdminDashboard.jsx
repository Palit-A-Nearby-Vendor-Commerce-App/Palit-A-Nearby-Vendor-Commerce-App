import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import ReportIcon from "@mui/icons-material/Report";
import PeopleIcon from "@mui/icons-material/People";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import PaymentsIcon from "@mui/icons-material/Payments";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/images/logo.png";
import CustomInput from "../components/CustomInput";
import UserData from "../components/admin/UserData";
import StoreData from "../components/admin/StoreData";

const drawerWidth = 240;

export default function AdminDashboard() {
  const [searchInput, setSearchInput] = useState("");
  const currentDate = new Date();

  const formattedDate = currentDate.toDateString();



  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
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
              <ListItemButton>
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
        </section>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
        <UserData />
        <StoreData />
      </Box>
    </Box>
  );
}
