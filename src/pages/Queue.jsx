// Queue.js
import React from "react";
import { FaStore } from "react-icons/fa";

const Queue = ({ showManageStore }) => {
  const handleButtonClick = () => {
    showManageStore(true);
  };

  return (
    <div>
      Waiting for customers...
      <button
        type="button"
        onClick={handleButtonClick}
        className="w-full bg-primary p-3 text-white rounded-[20px] flex items-center justify-center mt-5"
      >
        <FaStore size={30} className="mr-2" />
        <span className="text-lg">My Store</span>
      </button>
    </div>
  );
};

export default Queue;
