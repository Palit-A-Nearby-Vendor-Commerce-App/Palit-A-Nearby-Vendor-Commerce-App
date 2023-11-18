import React from "react";
import NavigationBarAdmin from "../components/NavigationBarAdmin";
import ProductData from "./ProductData";

const Products = () => {
    return <div>
        <NavigationBarAdmin />
        <div className="" style={{ marginLeft: "250px", padding: "20px"}}>
            <ProductData />
        </div>
        </div>;
}

export default Products;