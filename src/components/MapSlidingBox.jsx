import { React, useState } from "react";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import stroke from "../assets/images/stroke.png";
import ManageStore from "../pages/ManageStore";
import Queue from "../pages/Queue";
import Store from "../pages/Store";
import { FaArrowLeft, FaStore } from "react-icons/fa";

const MapSlidingBox = ({
  showSlider,
  handleSliderToggle,
  selectedVendor,
  user,
}) => {
  const [selectedButton, setSelectedButton] = useState("queue");
  const sliderBoxStyle = {
    position: "absolute",
    bottom: "20px",
    right: showSlider ? "30px" : "-410px",
    width: "400px",
    height: "95%",
    backgroundColor: "#fff",
    borderRadius: "20px",
    boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)",
    transition: "right 0.3s ease",
    overflow: "hidden",
    padding: "20px",
    backgroundImage: `url(${stroke})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const handleStoreButton = () => {
    setSelectedButton("store");
  };

  const handleQueueButton = () => {
    setSelectedButton("queue");
    console.log(selectedButton)
  };

  return (
    <div>
      <div style={sliderBoxStyle}>
        {user.account.isVendor? (
          selectedButton == "queue" ? (
            <>
              <Queue />
              <button
                type="button"
                onClick={handleStoreButton}
                className="bg-primary p-3 text-white rounded-[20px] flex items-center mt-4 absolute bottom-8 w-[360px] justify-center h-[50px]"
              >
                <FaStore size={30} className="mr-2" />
                <span className="text-lg">My Store</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={handleQueueButton}><FaArrowLeft /></button>
              <ManageStore user={user} showQueue={handleQueueButton} />
              <button
                type="button"
                onClick={handleQueueButton}
                className="w-full bg-primary p-3 text-white rounded-[20px] flex items-center justify-center"
              >
                <span className="text-lg">My Queue</span>
              </button>
            </>
          )
        ) : (
          <Store vendor={selectedVendor} />
        )}
      </div>
      <div>
        <button
          style={{
            backgroundColor: "white",
            position: "absolute",
            right: showSlider ? "440px" : "80px",
            bottom: "20px",
            padding: "10px",
            borderRadius: "20px",
            boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)",
            transition: "right 0.3s ease",
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
    </div>
  );
};
export default MapSlidingBox;
