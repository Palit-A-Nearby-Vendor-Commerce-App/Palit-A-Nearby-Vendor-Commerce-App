import React from "react";
import NavigationBarAdmin from "../components/NavigationBarAdmin";
import TransactionData from "./TransactionData";

const Transactions = () => {
    return <div>
        <NavigationBarAdmin />
        <div className="" style={{ marginLeft: "250px", padding: "20px" }}>
            <TransactionData />
        </div>
    </div>;
}

export default Transactions;