import React from "react";
import StoreData from "./StoreData";
import NavigationBarAdmin from "../components/NavigationBarAdmin";

const Stores = () => {
  return <div>
    <NavigationBarAdmin />
    <div className="" style={{ marginLeft: "250px", padding: "20px"}}>
        <StoreData />
    </div>
  </div>;
}

export default Stores;