import { Paper } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

const UserData = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/getAllUsers')
            .then(response => setUserData(response.data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    return (
        <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
            <div>
                <h1 className="text-2xl font-bold pb-6" >User</h1>
                <table className="w-full">
                    <thead className="text-left border-b border-[#0071B3] text-slate-500">
                        <tr>
                            <th className="w-1/5 pb-2" >Name</th>
                            <th className="w-1/5 pb-2" >Birthdate</th>
                            <th className="w-3/10 pb-2" >Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map(user => (
                            <tr key={user.id}>
                                <td className="py-2">{user.firstName} {user.lastName}</td>
                                <td className="py-2">{user.birthDate}</td>
                                <td className="py-2">{user.image && <img src={user.image} alt={`Profile for ${user.fullname}`} />}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Paper>
    )
}

export default UserData