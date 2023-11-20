import React from "react";
import ProductData from "./ProductData";

const Products = () => {
    return <div>
        <div className="w-full">
        <h1 className="text-3xl font-bold pb-6 mt-10">Products</h1>
            <ProductData />
        </div>
        </div>;
}

export default Products;