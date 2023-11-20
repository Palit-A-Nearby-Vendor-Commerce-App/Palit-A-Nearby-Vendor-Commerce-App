import React from "react";
import UserData from "./UserData";

const Users = () => {
  return <div>
    <div className="w-full">
    <h1 className="text-3xl font-bold pb-6 mt-10">Users</h1>
        <UserData />
    </div>
  </div>;
}

export default Users;