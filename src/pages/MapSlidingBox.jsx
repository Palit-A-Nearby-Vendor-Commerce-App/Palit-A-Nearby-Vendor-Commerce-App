import React from "react";
import dragiconenter from "../assets/images/dragiconenter.png";
import dragiconexit from "../assets/images/dragiconexit.png";
import stroke from "../assets/images/stroke.png";
import ManageStore from "./ManageStore";

const MapSlidingBox = ({ showSlider, handleSliderToggle }) => {
    const sliderBoxStyle = {
        position: "absolute",
        top: 40,
        right: showSlider ? "30px" : "-410px",
        width: "400px",
        height: "90%",
        backgroundColor: "#fff",
        transition: "right 0.3s ease",
        overflow: "hidden",
        borderRadius: "10px",
        padding: "20px",
    };

    const buttonStyle = {
        position: "absolute",
        top: 400,
        right: showSlider ? "440px" : "10px",
        zIndex: 1,
        cursor: "pointer",
        transition: "right 0.3s ease", // Add this line to make the button transition smoothly
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
