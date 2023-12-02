import React from "react";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import stroke from "../assets/images/stroke.png";
import ManageStore from "../pages/ManageStore";
import CustomerQueue from "../pages/CustomerQueue";
import { UserContext } from "../UserContext";

const MapSlidingBox = ({ showSlider, handleSliderToggle, selectedVendor }) => {
  
  const { user } = React.useContext(UserContext);
  const sliderBoxStyle = {
    position: "absolute",
    top: 25,
    right: showSlider ? "30px" : "-410px",
    width: "400px",
    height: "90%",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)",
    transition: "right 0.3s ease",
    overflow: "hidden",
    padding: "20px",
  };
  return (
    <div>
      <div style={sliderBoxStyle}>
        <img
          src={stroke}
          alt="Stroke"
          style={{
            width: "auto",
            height: "100%",
            position: "absolute",
          }}
        />
        {selectedVendor ? (
          user.account.isVendor ? (
            <ManageStore vendor={null} />
          ) : (
            <CustomerQueue />
          )
        ) : (
          <p>Click a vendor to see their store details</p>
        )}
      </div>
      <button
        style={{
          backgroundColor: "white",
          position: "absolute",
          right: showSlider ? "440px" : "80px",
          bottom: "20px",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)",
          marginBottom: "10px",
          transition: "right 0.3s ease", // Add a transition to make the movement smooth
        }}
        onClick={handleSliderToggle}
      >
        {showSlider ? (
          <GoSidebarCollapse size={30} />
        ) : (
          <GoSidebarExpand size={30} />
        )}
      </button>
    </div>
  );
};
export default MapSlidingBox;
