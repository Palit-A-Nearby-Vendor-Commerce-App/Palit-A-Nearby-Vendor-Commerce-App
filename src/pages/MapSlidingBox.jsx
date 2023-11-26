import React from "react";
import { FaStore } from "react-icons/fa";
import stroke from "../assets/images/stroke.png";
import ManageStore from "./ManageStore";

const MapSlidingBox = ({ showSlider, handleSliderToggle }) => {
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
            <ManageStore />
            </div>
            <button style={buttonStyle} onClick={handleSliderToggle}>
                <img
                    src={showSlider ? dragiconexit : dragiconenter}
                    alt="Toggle Slider"
                    style={{
                        width: "30px",
                        height: "30px",
                        border: "1px solid",
                        backgroundColor: "white",
                    }}
                />
            </button>
        </div>
    );
};

export default MapSlidingBox;
