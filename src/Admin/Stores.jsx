import React from "react";
import StoreData from "./StoreData";

const Stores = () => {
  return <div>
    <div className="w-full">
    <h1 className="text-3xl font-bold pb-6 mt-10">Stores</h1>
        <StoreData />
    </div>
  </div>;
}

export default Stores;