import { Paper } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

const AccountData = () => {
    const [accountData, setAccountData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3009/account')
            .then(response => setAccountData(response.data))
            .catch(error => console.error('Error fetching account data:', error));
    }, []);

    return (
        <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
            <div>
                <h1 className="text-2xl font-bold pb-6" >Accounts</h1>
                <table className="w-full">
                    <thead className="text-left border-b border-[#0071B3] text-slate-500">
                        <tr>
                            <th className="w-1/5 pb-2" >Account ID</th>
                            <th className="w-1/5 pb-2" >Is Vendor</th>
                            <th className="w-1/5 pb-2" >Is Admin</th>
                            <th className="w-1/5 pb-2" >User ID</th>
                            <th className="w-1/5 pb-2" >Username</th>
                            <th className="w-1/5 pb-2" >Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accountData.map(account => (
                            <tr key={account.accountId}>
                                <td className="py-2">{account.accountId}</td>
                                <td className="py-2">{account.isVendor ? 'Yes' : 'No'}</td>
                                <td className="py-2">{account.isAdmin ? 'Yes' : 'No'}</td>
                                <td className="py-2">{account.user.userId}</td>
                                <td className="py-2">{account.user.username}</td>
                                <td className="py-2">{account.user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Paper>
    )
}

export default AccountData
