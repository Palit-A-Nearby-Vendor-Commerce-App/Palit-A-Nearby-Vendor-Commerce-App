import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import redRating from "../assets/images/redRating.png";
import { Button, TextField } from "@mui/material";

const ManageStore = () => {
    const { user, setUser } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedProduct, setEditedProduct] = useState({
        picture: "",
        name: "",
        price: "",
    });

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        console.log("Edit clicked");
        setEditMode(true);
    };

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedProduct({
            ...editedProduct,
            [name]: value,
        });
    };

    const handlePictureChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setEditedProduct({
                ...editedProduct,
                picture: reader.result,
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleChooseFile = () => {
        // Trigger the file input click
        document.getElementById("fileInput").click();
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <img
                    src={`data:image/png;base64, ${user.image}`}
                    alt="User"
                    className="w-14 h-15 rounded-full border-2 border-black"
                    onClick={handleMenu}
                />
                <div className="ml-3" style={{ flexDirection: 'column' }}>
                    <h2 className="text-xl font-semibold">Bentong's Kitchen</h2>
                    <p className="text-sm">Food</p>
                    <div className="flex">
                        <img src={redRating} alt="Rating" className="w-5 h-5" />
                        <p className="font-medium">4.8</p>
                    </div>
                </div>
            </div>
            <div className="p-2" style={{ height: "90px" }}>
                <p className="text-sm" style={{ textAlign: "justify" }}>Bentong’s Kariton combines the convenience of a mobile shop with the variety of a traditional Filipino convenience store.</p>
            </div>
            <h1 className="p-2 text-lg font-medium" style={{ fontSize: "25px", color: "#0071B3" }}>Products</h1>

            {editMode ? (
                <div>
                    {/* Input fields for editing */}
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handlePictureChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleChooseFile}
                        style={{ borderRadius: "15px", marginBottom: "10px" }}
                    >
                        Choose File
                    </Button>
                    <TextField
                        label="Product Name"
                        name="name"
                        variant="outlined"
                        placeholder="Enter product name"
                        value={editedProduct.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Product Price"
                        name="price"
                        variant="outlined"
                        placeholder="Enter product price"
                        value={editedProduct.price}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                </div>
            ) : null}

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
}

export default ManageStore;
