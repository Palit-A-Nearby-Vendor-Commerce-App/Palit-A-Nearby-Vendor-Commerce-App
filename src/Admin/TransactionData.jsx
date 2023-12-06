import { Paper } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

const TransactionData = () => {
    const [transactionData, setTransactionData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/getAllTransactions')
            .then(response => setTransactionData(response.data))
            .catch(error => console.error('Error fetching transaction data:', error));
    }, []);

    return (
        <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
            <div>
                <h1 className="text-2xl font-bold pb-6" >Transactions</h1>
                <table className="w-full">
                    <thead className="text-left border-b border-[#0071B3] text-slate-500">
                        <tr>
                            <th className="w-1/5 pb-2" >Customer ID</th>
                            <th className="w-1/5 pb-2" >Vendor ID</th>
                            <th className="w-1/5 pb-2" >Status</th>
                            <th className="w-1/5 pb-2" >Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {transactionData.map(transaction => (
                            <tr key={transaction.customer.accountId + transaction.vendor.accountId + transaction.transactionId}>
                                <td className="py-2">{transaction.customer.accountId}</td>
                                <td className="py-2">{transaction.vendor.accountId}</td>
                                <td className="py-2">{transaction.status}</td>
                                <td className="py-2">{transaction.rating}</td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </div>
        </Paper>
    )
}

export default TransactionData
