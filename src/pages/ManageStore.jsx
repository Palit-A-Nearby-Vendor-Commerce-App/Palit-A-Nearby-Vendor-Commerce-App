import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import editStore from "../assets/images/editStore.png";

const ManageStore = () => {
    const { user, setUser } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedProduct, setEditedProduct] = useState({
        picture: "",
        name: "",
        price: " 0.00",
    });
    const [products, setProducts] = useState([]);
    const [store, setStore] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [editedStore, setEditedStore] = useState({
        storeName: "",
        category: "",
        description: "",
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [actionType, setActionType] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchStore = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/getStoreById/${user.account.store.storeId}`);
                setStore(response.data);
                setEditedStore({
                    storeName: response.data.storeName,
                    category: response.data.category,
                    description: response.data.description,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching store:', error);
            }
        };
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/getProductServicesByStoreId/store/${user.account.store.storeId}`);
                setProducts(response.data);
                localStorage.setItem('products', JSON.stringify(response.data));
            } catch (error) {
                console.error('Error fetching products:', error);
                const localData = localStorage.getItem('products');
                if (localData) {
                    setProducts(JSON.parse(localData));
                }
            }
        };
        fetchStore();
        fetchProducts();
    }, []);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleEdit = () => {
        setEditMode(true);
    };
    useEffect(() => {
        if (user && user.account && user.account.store) {
            setEditedStore({
                storeName: user.account.store.storeName,
                category: user.account.store.category,
                description: user.account.store.description,
            });
        }
    }, [user, user?.account]);
    const handleStoreInputChange = (event) => {
        const { name, value } = event.target;
        setEditedStore({
            ...editedStore,
            [name]: value,
        });
    };

    const handleSaveConfirm = () => {
        console.log("Save clicked", products);
        products.forEach((product, index) => {
            if (product.image instanceof Blob) {
                const reader = new FileReader();
                reader.readAsDataURL(product.image);
                reader.onloadend = () => {
                    const base64Image = reader.result.split(',')[1];
                    const productData = {
                        ...product,
                        image: base64Image,
                    };
                    axios
                        .put(`http://localhost:8080/api/updateProductServiceById/${product.productId}`, productData)
                        .then((response) => {
                            console.log("Product updated:", response.data);
                            // Update the product image in the state
                            const newProducts = [...products];
                            newProducts[index].image = base64Image;
                            setProducts(newProducts);
                        })
                        .catch((error) => {
                            console.error("Error updating product:", error);
                        });
                };
            }
        });
        if (user && user.account && user.account.store) {
            axios
                .put(`http://localhost:8080/api/updateStoreById/${user.account.store.storeId}`, editedStore)
                .then((response) => {
                    console.log("Store updated:", response.data);
                    setStore(response.data);
                    setSuccessMessage('Successfully saved.');
                })
                .catch((error) => {
                    console.error("Error updating store:", error);
                });
        }
        setEditMode(false);
        setEditedProduct({
            picture: "",
            name: "",
            price: "",
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'price') {
            setEditedProduct({
                ...editedProduct,
                [name]: value,
            });
        } else {
            setEditedProduct({
                ...editedProduct,
                [name]: value,
            });
        }
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
        if (name === 'price') {
            newProducts[index][name] = value;
        } else {
            newProducts[index][name] = value;
        }
        setProducts(newProducts);
    };
    const handleAddConfirm = async () => {
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
            store: { storeId: user.account.store.storeId },
        };
        setProducts((prevProducts) => [...prevProducts, productData]);
        axios
            .post("http://localhost:8080/api/createProductService", productData)
            .then((response) => {
                console.log("Product created:", response.data);
                setSuccessMessage('Successfully added.');
            })
            .catch((error) => {
                console.error("Error creating product:", error);
            });
        setEditedProduct({
            picture: "",
            name: "",
            price: "",
        });
        setImagePreview(null);
    };

    const handleDeleteConfirm = (index) => {
        const newProducts = [...products];
        newProducts[index].isDeleted = 1;
        axios
            .delete(`http://localhost:8080/api/deleteProductServiceById/${newProducts[index].productId}`)
            .then((response) => {
                console.log("Product deleted:", response.data);
                setSuccessMessage('Successfully deleted.');
                setProducts(products.filter((product, productIndex) => productIndex !== index));
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            });
    };

    const openConfirmationDialog = (action, actionType) => {
        setConfirmAction(action);
        setActionType(actionType);
        setOpenDialog(true);
    };
    const handleSave = () => {
        openConfirmationDialog(() => handleSaveConfirm, 'save');
    };
    const handleAdd = () => {
        openConfirmationDialog(() => handleAddConfirm, 'add');
    };
    const handleDelete = (index) => {
        openConfirmationDialog(() => () => handleDeleteConfirm(index), 'delete');
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
                    {editMode ? (
                        <TextField
                            name="storeName"
                            variant="outlined"
                            InputProps={{
                                style: {
                                    fontSize: 15,
                                    height: 25,
                                    width: "267px",
                                    paddingRight: '10px',
                                    color: "black",
                                    fontWeight: "bold",
                                },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Icon>
                                            <img src={editStore} alt="Edit Store" />
                                        </Icon>
                                    </InputAdornment>
                                ),
                            }}
                            value={editedStore.storeName}
                            onChange={handleStoreInputChange}
                        />
                    ) : (
                        <h2 className="text-xl font-semibold">
                            {editedStore.storeName ? editedStore.storeName : "Loading..."}
                        </h2>
                    )}
                    {editMode ? (
                        <Select
                            name="category"
                            variant="outlined"
                            value={editedStore.category}
                            onChange={handleStoreInputChange}
                            style={{
                                fontSize: 15,
                                height: 20,
                                marginTop: "5px",
                                width: "267px",
                                paddingRight: '10px',
                                color: "black",
                            }}
                            IconComponent={() => <Icon><img src={editStore} alt="Edit Store" /></Icon>}
                        >
                            <MenuItem value="" style={{ fontSize: 12, height: 18 }}><em>Select category</em></MenuItem>
                            <MenuItem value="fish" style={{ fontSize: 12, height: 18 }}>Fish</MenuItem>
                            <MenuItem value="fruits" style={{ fontSize: 12, height: 18 }}>Fruits</MenuItem>
                            <MenuItem value="assorted" style={{ fontSize: 12, height: 18 }}>Assorted</MenuItem>
                            <MenuItem value="manicure" style={{ fontSize: 12, height: 18 }}>Manicure</MenuItem>
                        </Select>
                    ) : (
                        <p className="text-sm">
                            {editedStore.category ? editedStore.category : "Loading..."}
                        </p>
                    )}
                </div>
            </div>
            <div className="p-2" style={{ height: "90px" }}>
                {editMode ? (
                    <TextField
                        name="description"
                        variant="outlined"
                        multiline
                        rows={4}
                        InputProps={{
                            style: {
                                fontSize: 15,
                                height: 85,
                                width: "340px",
                                color: "black",
                                paddingBottom: "10px",
                                textAlign: "justify"
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon>
                                        <img src={editStore} alt="Edit Store" style={{
                                            position: 'absolute',
                                            top: 1,
                                            right: 15
                                        }} />
                                    </Icon>
                                </InputAdornment>
                            ),
                        }}

                        value={editedStore.description}
                        onChange={handleStoreInputChange}
                    />
                ) : (
                    <p className="text-sm" style={{ textAlign: "justify" }}>
                        {editedStore.description ? editedStore.description : "Loading..."}
                    </p>
                )}
            </div>
            <h1
                className="p-2 text-lg font-medium"
                style={{ fontSize: "25px", color: "#0071B3" }}
            >
                Products
            </h1>
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
                                <span className="text-lg font-semibold` text-white inline-block">   Choose image
                                </span>
                            )}
                        </label>
                        <div className="flex-1">
                            <TextField
                                label="Product Name"
                                name="name"
                                variant="outlined"
                                placeholder="Enter product"
                                value={editedProduct.name}
                                onChange={handleInputChange}
                                margin="normal"
                                size="small"
                                style={{
                                    width: "48%",
                                    fontSize: "12px",
                                    position: "absolute",
                                    marginTop: "5px",
                                    marginLeft: "10px",
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <img src={editStore} alt="Edit Store" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="Product Price"
                                name="price"
                                variant="outlined"
                                type="number"
                                value={editedProduct.price}
                                onChange={handleInputChange}
                                margin="normal"
                                size="small"
                                style={{
                                    width: "48%",
                                    fontSize: "12px",
                                    position: "absolute",
                                    marginTop: "50px",
                                    marginLeft: "10px",
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <img src={editStore} alt="Edit Store" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    borderRadius: "15px",
                                    width: "96%",
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
            <div style={{ maxHeight: editMode ? "350px" : "510px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", overflow: "auto", position: "relative" }}>
                {products.map((product, index) => (
                    <div key={product.productId} style={{ marginBottom: "20px", width: "48%", position: "relative" }}>
                        {editMode ? (
                            <>
                                <button
                                    style={{ position: 'absolute', top: 0, right: 0, fontWeight: 'bold', fontSize: '20px', color: 'red', backgroundColor: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}
                                    onClick={() => handleDelete(index)}
                                >
                                    X
                                </button>
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
                                    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '50px', fontWeight: 'bold' }}>+</span>
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
                                            fontSize: 16,
                                            height: 25,
                                            paddingRight: '10px',
                                            borderRadius: "15px",
                                            color: "white",
                                            fontWeight: "bold",

                                        },
                                        endAdornment: (
                                            <InputAdornment position="center" style={{ width: "3px", marginRight: "10px" }}>
                                                <Icon >
                                                    <img src={editStore} alt="Edit Store" style={{ marginTop: "3px" }} />
                                                </Icon>
                                            </InputAdornment>
                                        ),
                                    }}
                                    style={{
                                        position: "absolute",
                                        top: "-15px",
                                        left: "39%",
                                        width: "79%",
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
                                    type="number"
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
                                        endAdornment: (
                                            <InputAdornment position="center" style={{ width: "3px", marginRight: "5px" }}>
                                                <Icon >
                                                    <img src={editStore} alt="Edit Store" style={{ marginTop: "3px" }} />
                                                </Icon>
                                            </InputAdornment>
                                        ),
                                    }}
                                    style={{
                                        position: "absolute",
                                        bottom: "0px",
                                        left: "0%",
                                        width: "77%",
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
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {actionType === 'delete' && 'Are you sure you want to delete this?'}
                        {actionType === 'save' && 'Are you sure you want to save this?'}
                        {actionType === 'add' && 'Are you sure you want to add this?'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary" style={{ backgroundColor: "#E8594F", color: "white" }}>
                        Cancel
                    </Button>
                    <Button onClick={() => { confirmAction(); setOpenDialog(false); }} color="primary" autoFocus style={{ backgroundColor: "#0575B4", color: "white" }}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={!!successMessage}
                onClose={() => setSuccessMessage(null)}
                aria-labelledby="success-dialog-title"
                aria-describedby="success-dialog-description"
            >
                <DialogTitle id="success-dialog-title">{"Success"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="success-dialog-description">
                        {successMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSuccessMessage(null)} color="primary" autoFocus style={{ backgroundColor: "#0575B4", color: "white" }}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default ManageStore;