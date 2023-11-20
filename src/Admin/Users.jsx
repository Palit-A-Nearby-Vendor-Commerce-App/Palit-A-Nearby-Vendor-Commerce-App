import React from "react";
import UserData from "./UserData";
import NavigationBarAdmin from "../components/NavigationBarAdmin";

const Users = () => {
  return <div>
    <NavigationBarAdmin />
    <div className="" style={{ marginLeft: "250px", padding: "20px"}}>
        <UserData />
    </div>
  </div>;
}

export default Users;