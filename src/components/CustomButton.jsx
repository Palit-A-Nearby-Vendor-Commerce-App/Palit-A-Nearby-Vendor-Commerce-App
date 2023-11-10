import React from "react";

const CustomButton = ({ btnStyle, label, onClick, type }) => {
  return (
    <button className={btnStyle} onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default CustomButton;
