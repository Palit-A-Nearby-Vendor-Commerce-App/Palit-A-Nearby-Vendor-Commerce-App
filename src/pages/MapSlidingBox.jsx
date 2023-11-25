import React from "react";
import dragiconenter from "../assets/images/dragiconenter.png";
import dragiconexit from "../assets/images/dragiconexit.png";

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
        cursor: "pointer",
        transition: "right 0.3s ease", // Add this line to make the button transition smoothly
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
