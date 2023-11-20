import React from "react";
import TransactionData from "./TransactionData";

const Transactions = () => {
    return <div>
        <div className="w-full">
        <h1 className="text-3xl font-bold pb-6 mt-10">Transactions</h1>
            <TransactionData />
        </div>
    </div>;
}

export default Transactions;