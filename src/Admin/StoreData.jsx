import { useState, useEffect } from "react";
import axios from "axios";
import { Paper } from "@material-ui/core";

const StoreData = ()=> {
    const [storeData, setStoreData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/getAllStores')
          .then(response => setStoreData(response.data))
          .catch(error => console.error('Error fetching store data:', error));
    }, []);

    return (
        <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
            <div>
                <h1 className="text-2xl font-bold pb-6" >Store</h1>
                <table className="w-full">
                <thead className="text-left border-b border-[#0071B3] text-slate-500">
                    <tr>
                    <th className="w-1/5 pb-2" >Store</th>
                    <th className="w-2/5 pb-2" >Description</th>
                    <th className="w-1/10 pb-2">Category</th>
                    <th className="w-3/10 pb-2">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {storeData.map(store => (
                    <tr key={store.id + store.storeName}>
                        <td className="py-2">{store.storeName}</td>
                        <td className="py-2">{store.description}</td>
                        <td className="py-2">{store.category}</td>
                        <td className="py-2">{store.imagePath}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </Paper>
    )
}

export default StoreData