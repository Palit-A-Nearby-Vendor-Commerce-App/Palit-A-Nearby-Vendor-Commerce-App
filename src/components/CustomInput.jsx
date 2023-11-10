import React from "react";

const Input = ({ type, placeholder, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full rounded-[20px] p-3 mt-1 text-grayy font-custom border border-grayy "
      required
    />
  );
};

export default Input;
