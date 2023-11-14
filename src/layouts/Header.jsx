import React from "react";
import logo from "../assets/images/logo-white.png";
import storesample from "../assets/images/storesample.png";

const Header = () => {
  return (
    <header className="bg-toolbarcustom">
      <div className="flex items-center justify-between px-6">
        <img src={logo} alt="Palit logo" className="w-30 h-16" />
        <div className="flex items-center m-left-auto">
          <h6 className="text-2xl text-white">Logout</h6>
          <img
            src={storesample}
            alt="Store image"
            className="w-25 h-12 rounded-full ml-10"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
