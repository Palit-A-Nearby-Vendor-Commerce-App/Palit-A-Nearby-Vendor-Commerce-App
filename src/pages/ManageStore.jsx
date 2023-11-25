import React, { useState } from "react";

const ManageStore = () => {
    const [stores, setStores] = useState([]);
    const [products, setProducts] = useState([]);

    const addStore = (newStore) => {
        setStores([...stores, newStore]);
    };

    const updateStore = (updatedStore) => {
        setStores((prevStores) =>
            prevStores.map((store) =>
                store.storeId === updatedStore.storeId ? updatedStore : store
            )
        );
    };

    const deleteStore = (storeId) => {
        setStores((prevStores) =>
            prevStores.filter((store) => store.storeId !== storeId)
        );
    };

    const addProduct = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    const updateProduct = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.productId === updatedProduct.productId ? updatedProduct : product
            )
        );
    };

    const deleteProduct = (productId) => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.productId !== productId)
        );
    };

    return (
        <div>
            <StoreList stores={stores} deleteStore={deleteStore} />
            <AddStore addStore={addStore} stores={stores} />
            <UpdateStore updateStore={updateStore} />
            <ProductList products={products} deleteProduct={deleteProduct} />
            <AddProduct addProduct={addProduct} />
            <UpdateProduct updateProduct={updateProduct} />
        </div>
    );
};

const StoreList = ({ stores, deleteStore }) => {
    return (
        <div>
            <h2>Stores</h2>
            <ul>
                {stores.map((store) => (
                    <li key={store.storeId}>
                        {store.storeName} -{" "}
                        <button onClick={() => deleteStore(store.storeId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const AddStore = ({ addStore, stores }) => {
    const [newStore, setNewStore] = useState({
        storeName: "",
        description: "",
        category: "",
        vendorAccountId: 0,
        rating: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStore({ ...newStore, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addStore({ ...newStore, storeId: stores.length + 1 });
        // Clear form fields
        setNewStore({
            storeName: "",
            description: "",
            category: "",
            vendorAccountId: 0,
            rating: 0,
        });
    };

    return (
        <div>
            <h2>Add Store</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Store Name:
                    <input
                        type="text"
                        name="storeName"
                        value={newStore.storeName}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={newStore.description}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Category:
                    <input
                        type="text"
                        name="category"
                        value={newStore.category}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Vendor Account ID:
                    <input
                        type="number"
                        name="vendorAccountId"
                        value={newStore.vendorAccountId}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Rating:
                    <input
                        type="number"
                        name="rating"
                        value={newStore.rating}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Add Store</button>
            </form>
        </div>
    );
};


const UpdateStore = ({ updateStore }) => {
    // Similar to AddStore, but with logic for updating an existing store
    return <div>Update Store Form</div>;
};

const ProductList = ({ products, deleteProduct }) => {
    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.productId}>
                        {product.name} -{" "}
                        <button onClick={() => deleteProduct(product.productId)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const AddProduct = ({ addProduct }) => {
    // Similar to AddStore, but with fields for adding a new product
    return <div>Add Product Form</div>;
};

const UpdateProduct = ({ updateProduct }) => {
    // Similar to AddStore, but with logic for updating an existing product
    return <div>Update Product Form</div>;
};

export default ManageStore;
