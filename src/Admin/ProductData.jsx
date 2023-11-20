import { Paper } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductData = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3003/products')
            .then(response => setProductData(response.data))
            .catch(error => console.error('Error fetching product data:', error));
    }, []);

    return (
        <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
            <div>
                <h1 className="text-2xl font-bold pb-6" >Products</h1>
                <table className="w-full">
                    <thead className="text-left border-b border-[#0071B3] text-slate-500">
                        <tr>
                            <th className="w-1/5 pb-2" >Name</th>
                            <th className="w-1/5 pb-2" >Description</th>
                            <th className="w-1/5 pb-2" >Price</th>
                            <th className="w-1/10 pb-2" >Store ID</th>
                            <th className="w-3/10 pb-2" >Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData.map(product => (
                            <tr key={product.productId}>
                                <td className="py-2">{product.name}</td>
                                <td className="py-2">{product.description}</td>
                                <td className="py-2">{product.price}</td>
                                <td className="py-2">{product.storeId}</td>
                                <td className="py-2">{product.imagePath && <img src={product.imagePath} alt={`Image for ${product.name}`} />}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Paper>
    )
}

export default ProductData
