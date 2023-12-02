import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import redRating from "../assets/images/redRating.png";

const ManageStore = () => {
    const { user, setUser } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedProduct, setEditedProduct] = useState({
        picture: "",
        name: "",
        price: "",
    });
    const [products, setProducts] = useState([]);
    const [store, setStore] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        // Replace with your actual API endpoints
        const userApiEndpoint = `http://localhost:8080/api/getUserById/${user.id}`;
        const accountApiEndpoint = "http://localhost:8080/api/getAccountById/";
        const storeApiEndpoint = "http://localhost:8080/api/getStoreById/";

        axios
            .get(userApiEndpoint)
            .then((response) => {
                if (response.data && response.data.accountId) {
                    return axios.get(accountApiEndpoint + response.data.accountId);
                } else {
                    throw new Error("Account ID not found in user data");
                }
            })
            .then((response) => {
                if (response.data && response.data.store) {
                    return axios.get(storeApiEndpoint + response.data.store.storeId);
                } else {
                    throw new Error("Store ID not found in account data");
                }
            })
            .then((response) => {
                if (response.data) {
                    setStore(response.data); // Set the store state
                    console.log("Store data:", response.data); // Log the store data
                }
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });

        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/getProductServicesByStoreId/store/${user.account.store.storeId}`);
                setProducts(response.data);
                // Store the product data in local storage
                localStorage.setItem('products', JSON.stringify(response.data));
            } catch (error) {
                console.error('Error fetching products:', error);
                // If there's an error, try to load the product data from local storage
                const localData = localStorage.getItem('products');
                if (localData) {
                    setProducts(JSON.parse(localData));
                }
            }
        };

        fetchProducts();
    }, []);

    // Handle click on user image
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Handle click on "Edit" button
    const handleEdit = () => {
        setEditMode(true);
    };

    // Handle click on "Save" button
    const handleSave = () => {
        console.log("Save clicked", editedProduct);
        // Perform the save operation with editedProduct data
        // Update the user context or make an API call to save the changes

        // Reset state after saving
        setEditMode(false);
        setEditedProduct({
            picture: "",
            name: "",
            price: "",
        });
    };

    // Handle input change for text fields
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedProduct({
            ...editedProduct,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setEditedProduct({
            ...editedProduct,
            picture: e.target.files[0],
        });
        setImagePreview(
            e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null
        );
    };

    const handleProductImageChange = (e, index) => {
        const newProducts = [...products];
        newProducts[index].image = e.target.files[0];
        newProducts[index].imagePreview = e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null;
        setProducts(newProducts);
    };

    const handleProductInputChange = (e, index) => {
        const { name, value } = e.target;
        const newProducts = [...products];
        newProducts[index][name] = value;
        setProducts(newProducts);
    };

    // Handle click on "Choose File" button

    // Handle click on "Add" button
    const handleAdd = async () => {
        // Validate that all required fields are filled
        if (!editedProduct.picture || !editedProduct.name || !editedProduct.price) {
            alert("Please fill in all product details.");
            return;
        }

        function convertToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result.split(",")[1]);
                reader.onerror = (error) => reject(error);
            });
        }

        const imageBase64 = await convertToBase64(editedProduct.picture);

        const productData = {
            name: editedProduct.name,
            price: editedProduct.price,
            image: imageBase64,
            store: { storeId: user.account.store.storeId }, // Add the storeId
        };

        // Add the edited product to the list of products
        setProducts((prevProducts) => [...prevProducts, productData]);

        // Make a POST request to the ProductService API endpoint
        axios
            .post("http://localhost:8080/api/createProductService", productData)
            .then((response) => {
                console.log("Product created:", response.data);
            })
            .catch((error) => {
                console.error("Error creating product:", error);
            });

        // Clear the edited product state
        setEditedProduct({
            picture: "",
            name: "",
            price: "",
        });

        setImagePreview(null);
    };

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            {/* User details */}
            <div style={{ display: "flex" }}>
                <img
                    src={`data:image/png;base64, ${user.image}`}
                    alt="User"
                    className="w-14 h-15 rounded-full border-2 border-black"
                    style={{ width: "70px", height: "70px" }}
                    onClick={handleMenu}
                />
                <div className="ml-3" style={{ flexDirection: "column" }}>
                    {/* Store Name */}
                    <h2 className="text-xl font-semibold">
                        {user.account.store ? user.account.store.storeName : "Loading..."}
                    </h2>
                    {/* Category */}
                    <p className="text-sm">
                        {user.account.store ? user.account.store.category : "Loading..."}
                    </p>
                    <div className="flex">
                        <img src={redRating} alt="Rating" className="w-5 h-5" />
                        <p className="font-medium">4.8</p>
                    </div>
                </div>
            </div>

            {/* Store description */}
            <div className="p-2" style={{ height: "90px" }}>
                <p className="text-sm" style={{ textAlign: "justify" }}>
                    {user.account.store ? user.account.store.description : "Loading..."}
                </p>
            </div>

            {/* Products section */}
            <h1
                className="p-2 text-lg font-medium"
                style={{ fontSize: "25px", color: "#0071B3" }}
            >
                Products
            </h1>

            {/* Edit mode */}
            {editMode ? (
                <div
                    className="productscomponent"
                    style={{
                        marginBottom: "20px", width: "95%", position: "relative"

                    }}
                >
                    <div className="flex">
                        <label className="flex-1  justify-center items-center bg-primary rounded-[20px] cursor-pointer mx-auto flex">
                            <input
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-[136px] rounded-[20px] inline-block border-[3px] border-green-400 "
                                />
                            ) : (
                                <span className="text-lg font-semibold` text-white inline-block">
                                    Choose image
                                </span>
                            )}
                        </label>
                        <div className="flex-1">
                            <TextField
                                label="Product Name"
                                name="name"
                                variant="outlined"
                                placeholder="Enter product name"
                                value={editedProduct.name}
                                onChange={handleInputChange}
                                margin="normal"
                                size="small"
                                style={{
                                    width: "40%",
                                    fontSize: "12px",
                                    position: "absolute",
                                    marginTop: "5px",
                                    marginLeft: "10px",
                                }}
                            />
                            <TextField
                                label="Product Price"
                                name="price"
                                variant="outlined"
                                placeholder="Enter product price"
                                value={editedProduct.price}
                                onChange={handleInputChange}
                                margin="normal"
                                size="small"
                                style={{
                                    width: "40%",
                                    fontSize: "12px",
                                    marginTop: "50px",
                                    position: "absolute",
                                    marginLeft: "10px",
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    borderRadius: "15px",
                                    width: "80%",
                                    marginTop: "100px",
                                    marginLeft: "10px",
                                }}
                                onClick={handleAdd}
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>{ }</div>
            )}

            {/* Display products */}
            <div style={{ maxHeight: editMode ? "300px" : "450px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", overflow: "auto", position: "relative" }}>
                {products.map((product, index) => (
                    <div key={product.productId} style={{ marginBottom: "20px", width: "48%", position: "relative" }}>
                        {editMode ? (
                            <>
                                <label
                                    style={{
                                        width: "100%",
                                        height: "150px",
                                        border: "1px solid black",
                                        borderRadius: "15px",
                                        backgroundImage: `url(${product.imagePreview || `data:image/png;base64,${product.image}`})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        display: 'inline-block'
                                    }}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleProductImageChange(e, index)}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                                <TextField
                                    name="name"
                                    variant="outlined"
                                    value={product.name}
                                    onChange={(e) => handleProductInputChange(e, index)}
                                    margin="normal"
                                    size="small"
                                    InputProps={{
                                        style: {
                                            fontSize: 20,
                                            height: 25,
                                            paddingRight: '10px',
                                            borderRadius: "15px",
                                            color: "white",
                                            fontWeight: "bold",
                                        },
                                    }}
                                    style={{
                                        position: "absolute",
                                        top: "-15px",
                                        left: "49%",
                                        width: "100%",
                                        transform: "translateX(-50%)",
                                        color: "white",
                                        fontWeight: "bold",
                                        backgroundColor: "rgba(136, 170, 204, 0.7)",
                                        borderRadius: "15px",
                                    }}
                                />
                                <TextField
                                    name="price"
                                    variant="outlined"
                                    value={product.price}
                                    onChange={(e) => handleProductInputChange(e, index)}
                                    margin="normal"
                                    size="small"
                                    InputProps={{
                                        style: {
                                            fontSize: 15,
                                            height: 20,
                                            paddingRight: '5x',
                                            borderRadius: "15px",
                                            fontWeight: "bold",
                                        },
                                    }}
                                    style={{
                                        position: "absolute",
                                        bottom: "0px",
                                        left: "0%",
                                        width: "50%",
                                        textAlign: "left",
                                        color: "black",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        backgroundColor: "#c0d8f0",
                                        borderRadius: "10px"
                                    }}
                                />
                            </>
                        ) : (
                            <>
                                <img
                                    src={`data:image/png;base64,${product.image}`}
                                    alt={`Product ${index + 1}`}
                                    style={{ width: "100%", height: "150px", border: "1px solid black", borderRadius: "15px" }}
                                />
                                <p style={{ position: "absolute", top: "1px", left: "49%", width: "100%", transform: "translateX(-50%)", paddingLeft: "10px", paddingRight: "5px", color: "white", fontSize: "16px", fontWeight: "bold", backgroundColor: "rgba(136, 170, 204, 0.7)", borderRadius: "15px" }}>
                                    {product.name}
                                </p>
                                <p style={{ position: "absolute", bottom: "1px", left: "3%", textAlign: "left", color: "black", fontSize: "14px", fontWeight: "bold", backgroundColor: "#c0d8f0", paddingLeft: "10px", paddingRight: "5px", borderRadius: "10px" }}>
                                    ₱ {product.price}
                                </p>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Save/Edit button */}
            <div className="flex mt-4 absolute bottom-8 w-full">
                {editMode ? (
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: "15px", width: "90%" }}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: "15px", width: "90%" }}
                        onClick={handleEdit}
                    >
                        Edit Store and Products
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ManageStore;
