import { Paper } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

const AccountData = () => {
    const [accountData, setAccountData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/getAllAccounts')
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
                            <th className="w-1/5 pb-2" >Email</th>
                            <th className="w-1/5 pb-2" >Password</th>
                            <th className="w-1/5 pb-2" >Admin</th>
                            <th className="w-1/5 pb-2" >Vendor</th>
                            {/* <th className="w-1/5 pb-2" >Location Id</th>
                            <th className="w-1/5 pb-2" >Store Id</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {accountData.map(account => (
                            <tr key={account.accountId}>
                                <td className="py-2">{account.email}</td>
                                <td className="py-2">{account.password}</td>
                                <td className="py-2">{account.isAdmin ? 'Yes' : 'No'}</td>
                                <td className="py-2">{account.isVendor ? 'Yes' : 'No'}</td>
                                {/*<td className="py-2">{account.location.locationId}</td>
                                <td className="py-2">{account.store.storeId}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Paper>
    )
}

export default AccountData
