import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MuiAlert from "@mui/material/Alert";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export const NAV_HOVER_STYLE =
  "relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-customYellow after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center";

export const NAV_ACTIVE_STYLE =
  "relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-customYellow after:w-full after:scale-x-100";

export const GRADIENT_BG = {
  backgroundColor: "hsla(0, 0%, 100%, 1)",
  backgroundImage:
    "linear-gradient(315deg, hsla(0, 0%, 100%, 1) 0%, hsla(190, 42%, 76%, 1) 100%)",
  MozBackgroundImage:
    "-moz-linear-gradient(315deg, hsla(0, 0%, 100%, 1) 0%, hsla(190, 42%, 76%, 1) 100%)",
  WebkitBackgroundImage:
    "-webkit-linear-gradient(315deg, hsla(0, 0%, 100%, 1) 0%, hsla(190, 42%, 76%, 1) 100%)",
  filter:
    'progid:DXImageTransform.Microsoft.gradient(startColorstr="#FFFFFF", endColorstr="#AAD4DC", GradientType=1)',
};
export const GRADIENT_BG_DM = {
  background: "hsla(0, 0%, 100%, 1)",
  backgroundImage:
    "linear-gradient(315deg, hsla(0, 0%, 100%, 1) 0%, hsla(189, 40%, 13%, 1) 100%)",
  MozBackgroundImage:
    "-moz-linear-gradient(315deg, hsla(0, 0%, 100%, 1) 0%, hsla(189, 40%, 13%, 1) 100%)",
  WebkitBackgroundImage:
    "-webkit-linear-gradient(315deg, hsla(0, 0%, 100%, 1) 0%, hsla(189, 40%, 13%, 1) 100%)",
  filter:
    'progid:DXImageTransform.Microsoft.gradient(startColorstr="#FFFFFF", endColorstr="#142B2F", GradientType=1)',
};

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const mapContainerStyle = {
  width: "100%",
  height: "calc(100vh - 90px)",
};

export const mapOptions = {
  streetViewControl: false,
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  rotateControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
  ],
};


