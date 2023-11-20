import React from "react";
import NavigationBarAdmin from "../components/NavigationBarAdmin";
import AccountData from "./AccountData";

const Accounts = () => {
    return <div>
        <NavigationBarAdmin />
        <div style={{ marginLeft: "250px", padding: "20px"}}><AccountData /></div>
    </div>;
}

export default Accounts;