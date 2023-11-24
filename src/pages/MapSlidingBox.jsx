import React from "react";
import dragicon from "../assets/images/dragicon.png";

const MapSlidingBox = ({ showSlider, handleSliderToggle }) => {
    const sliderBoxStyle = {
        position: "absolute",
        top: 40,
        right: showSlider ? "30px" : "-350px",
        width: "300px",
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
        right: showSlider ? "340px" : "0",
        zIndex: 1,
        cursor: "pointer", // Add this line to make the cursor change on hover
    };

    return (
        <div>
            <div style={sliderBoxStyle}>
                <div>
                    <h2>Sliding Box Content</h2>
                    {/* Add your sliding box content here */}
                </div>
            </div>
            <button style={buttonStyle} onClick={handleSliderToggle}>
                <img
                    src={dragicon}
                    alt="Toggle Slider"
                    style={{ width: "30px", height: "30px", border: "1px solid", backgroundColor: "white" }} // Adjust size as needed
                />
            </button>
        </div>
    );
};

export default MapSlidingBox;
