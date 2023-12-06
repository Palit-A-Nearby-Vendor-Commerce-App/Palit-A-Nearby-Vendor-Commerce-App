import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
    price: "",
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
  const [operationSuccess, setOperationSuccess] = useState(false);

  useEffect(() => {
    const userApiEndpoint = `http://localhost:8080/api/getUserById/${user.userId}`;
    const accountApiEndpoint = "http://localhost:8080/api/getAccountById/";
    const storeApiEndpoint = "http://localhost:8080/api/getStoreById/";

    axios
      .get(userApiEndpoint)
      .then((response) => {
        if (response.data && response.data.account.accountId) {
          return axios.get(
            accountApiEndpoint + response.data.account.accountId
          );
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
          setStore(response.data);
          console.log("Store data:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/getProductServicesByStoreId/store/${user.account.store.storeId}`
        );
        setProducts(response.data);
        localStorage.setItem("products", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching products:", error);
        const localData = localStorage.getItem("products");
        if (localData) {
          setProducts(JSON.parse(localData));
        }
      }
    };

    fetchProducts();
  }, [operationSuccess]);

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
    if (user.account.store) {
      setEditedStore({
        storeName: user.account.store.storeName,
        category: user.account.store.category,
        description: user.account.store.description,
      });
    }
  }, [user.account.store]);

  const handleStoreInputChange = (event) => {
    const { name, value } = event.target;
    setEditedStore({
      ...editedStore,
      [name]: value,
    });
  };

  const handleSaveConfirm = () => {
    console.log("Save clicked", products);

    products.forEach((product) => {
      axios
        .put(
          `http://localhost:8080/api/updateProductServiceById/${product.productId}`,
          product
        )
        .then((response) => {
          console.log("Product updated:", response.data);
          setOperationSuccess((prev) => !prev);
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    });

    axios
      .put(
        `http://localhost:8080/api/updateStoreById/${user.account.store.storeId}`,
        editedStore
      )
      .then((response) => {
        console.log("Store updated:", response.data);
        setStore(response.data);

        setUser((prevUser) => ({
          ...prevUser,
          account: {
            ...prevUser.account,
            store: response.data,
          },
        }));
        setSuccessMessage("Successfully saved.");

        setOperationSuccess((prev) => !prev);
        setEditedProduct({
          picture: "",
          name: "",
          price: "",
        });
      })
      .catch((error) => {
        console.error("Error updating store:", error);
      });

    setEditMode(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "price") {
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
    newProducts[index].imagePreview = e.target.files[0]
      ? URL.createObjectURL(e.target.files[0])
      : null;
    setProducts(newProducts);
  };

  const handleProductInputChange = (e, index) => {
    const { name, value } = e.target;
    const newProducts = [...products];
    if (name === "price") {
      newProducts[index][name] = value;
    } else {
      newProducts[index][name] = value;
    }
    setProducts(newProducts);
  };

  const handleAddConfirm = async () => {
    if (!editedProduct.picture || !editedProduct.name || !editedProduct.price) {
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
        setSuccessMessage("Successfully added.");

        setEditedProduct({
          picture: "",
          name: "",
          price: "",
        });

        setImagePreview(null);
        setImagePreview(productData.image);
        setOperationSuccess((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  const handleDeleteConfirm = (index) => {
    const newProducts = [...products];
    newProducts[index].isDeleted = 1;
    setProducts(newProducts);

    axios
      .delete(
        `http://localhost:8080/api/deleteProductServiceById/${newProducts[index].productId}`
      )
      .then((response) => {
        console.log("Product deleted:", response.data);
        setSuccessMessage("Successfully deleted.");

        setOperationSuccess((prev) => !prev);
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
    openConfirmationDialog(() => handleSaveConfirm, "save");
  };

  const handleAdd = () => {
    if (!editedProduct.picture || !editedProduct.name || !editedProduct.price) {
      return;
    } else {
      openConfirmationDialog(() => handleAddConfirm, "add");
    }
  };

  const handleDelete = (index) => {
    openConfirmationDialog(() => () => handleDeleteConfirm(index), "delete");
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
              inputProps={{ maxLength: 23 }}
              InputProps={{
                style: {
                  fontSize: 18,
                  height: 30,
                  width: "267px",
                  paddingRight: "5px",
                  color: "black",
                  fontWeight: "bold",
                  borderRadius: "20px",
                },
                endAdornment: (
                    <InputAdornment position="end" style={{marginRight: "3px"}}>
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
                height: 30,
                marginTop: "5px",
                width: "267px",
                paddingRight: "10px",
                color: "black",
                borderRadius: "20px",
              }}
              IconComponent={() => (
                <Icon>
                  <img src={editStore} alt="Edit Store" />
                </Icon>
              )}
            >
              <MenuItem value="" style={{ fontSize: 12, height: 18 }}>
                <em>Select category</em>
              </MenuItem>
              <MenuItem value="fish" style={{ fontSize: 12, height: 18 }}>
                Fish
              </MenuItem>
              <MenuItem value="fruits" style={{ fontSize: 12, height: 18 }}>
                Fruits
              </MenuItem>
              <MenuItem value="assorted" style={{ fontSize: 12, height: 18 }}>
                Assorted
              </MenuItem>
              <MenuItem value="manicure" style={{ fontSize: 12, height: 18 }}>
                Manicure
              </MenuItem>
            </Select>
          ) : (
            <p className="text-sm">
              {editedStore.category ? editedStore.category : "Loading..."}
            </p>
          )}
        </div>
      </div>
      <div className="p-2" style={{ height: "70px" }}>
        {editMode ? (
          <TextField
            name="description"
            variant="outlined"
            multiline
            rows={4}
            inputProps={{ maxLength: 150 }}
            InputProps={{
              style: {
                fontSize: 15,
                height: 60,
                width: "340px",
                color: "black",
                paddingTop: "50px",
                textAlign: "justify",
                borderRadius: "20px",
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
            marginBottom: "20px",
            width: "95%",
            position: "relative",
          }}
        >
          <form>
            <div className="flex">
              <label className="flex-1  justify-center items-center bg-primary rounded-[20px] cursor-pointer mx-auto flex">
                <input
                  required
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
                {" "}
                <TextField
                  label="Product Name"
                  name="name"
                  value={editedProduct.name}
                  onChange={handleInputChange}
                  margin="normal"
                  size="small"
                  required
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
                    style: {
                      borderRadius: "20px", // Moved borderRadius here
                    },
                  }}
                />
                <TextField
                  label="Price"
                  name="price"
                  variant="outlined"
                  type="number"
                  required
                  value={editedProduct.price}
                  onChange={handleInputChange}
                  margin="normal"
                  size="small"
                  inputProps={{ min: "0" }}
                  style={{
                    borderRadius: "20px",
                    width: "40%",
                    fontSize: "12px",
                    marginTop: "55px",
                    position: "absolute",
                    marginLeft: "10px",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <img src={editStore} alt="Edit Store" />
                      </InputAdornment>
                    ),
                    style: {
                      borderRadius: "20px", // Moved borderRadius here
                    },
                  }}
                />
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#0071b3",
                    borderRadius: "20px",
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
          </form>
        </div>
      ) : (
        <div>{}</div>
      )}
      <div
        style={{
          maxHeight: editMode ? "350px" : "510px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          overflow: "auto",
          position: "relative",
        }}
      >
        {products.map((product, index) => (
          <div
            key={product.productId}
            style={{ marginBottom: "20px", width: "48%", position: "relative" }}
          >
            {editMode ? (
              <>
                <button
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    fontWeight: "bold",
                    fontSize: "15px",
                    color: "white",
                    backgroundColor: "red",
                    border: "none",
                    borderTopRightRadius: "50%",
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(index)}
                >
                  X
                </button>
                <label
                  style={{
                    width: "100%",
                    height: "150px",
                    borderRadius: "20px",
                    backgroundImage: `url(${
                      product.imagePreview ||
                      `data:image/png;base64,${product.image}`
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "inline-block",
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleProductImageChange(e, index)}
                    style={{ display: "none" }}
                  />
                </label>
                <TextField
                  name="name"
                  value={product.name}
                  onChange={(e) => handleProductInputChange(e, index)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none", // Removes the border
                      },
                      "&:hover fieldset": {
                        border: "none", // Removes the border on hover
                      },
                      "&.Mui-focused fieldset": {
                        border: "none", // Removes the border when focused
                      },
                    },
                  }}
                  InputProps={{
                    style: {
                      fontSize: 17,
                      height: 25,
                      paddingInline: "5px",
                      color: "black",
                    },
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        style={{ width: "3px", marginRight: "10px" }}
                      >
                        <Icon>
                          <img
                            src={editStore}
                            alt="Edit Store"
                            style={{ marginTop: "3px" }}
                          />
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                  style={{
                    position: "absolute",
                    left: "0",
                    width: "85%",
                    color: "white",
                    backgroundColor: "rgba(255,255,255, 0.7)",
                    borderTopLeftRadius: "15px",
                  }}
                />
                <TextField
                  name="price"
                  variant="outlined"
                  type="text"
                  value={product.price}
                  onChange={(e) => handleProductInputChange(e, index)}
                  margin="normal"
                  size="small"
                  InputProps={{
                    style: {
                      fontSize: 15,
                      height: 20,
                      paddingRight: "5x",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    },
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        style={{ width: "3px", marginRight: "5px" }}
                      >
                        <Icon>
                          <img
                            src={editStore}
                            alt="Edit Store"
                            style={{ marginTop: "3px" }}
                          />
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                  style={{
                    position: "absolute",
                    bottom: "3%",
                    left: "3%",
                    width: "50%",
                    textAlign: "left",
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                    backgroundColor: "#c0d8f0",
                    borderRadius: "20px",
                  }}
                />
              </>
            ) : (
              <>
                <img
                  src={`data:image/png;base64,${product.image}`}
                  alt={`Product ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "150px",
                    borderRadius: "20px",
                  }}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    width: "100%",
                    transform: "translateX(-50%)",
                    paddingInline: "10px",
                    color: "black",
                    fontSize: "17px",
                    backgroundColor: "rgba(255,255,255, 0.7)",
                    borderTopRadius: "15px",
                  }}
                >
                  {product.name}
                </p>
                <p
                  style={{
                    position: "absolute",
                    bottom: "3%",
                    left: "3%",
                    textAlign: "left",
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                    backgroundColor: "#c0d8f0",
                    paddingInline: "5px",
                    borderRadius: "10px",
                  }}
                >
                  ₱{product.price}
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
            style={{
              backgroundColor: "#0071b3",
              borderRadius: "20px",
              width: "90%",
              height: "50px",
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        ) : (
          <Button
            variant="contained"
            style={{
              backgroundColor: "#0071b3",
              borderRadius: "20px",
              width: "90%",
              height: "50px",
            }}
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
        PaperProps={{
          style: {
            borderRadius: "15px", // Apply the borderRadius to the Paper component
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {actionType === "delete" && "Are you sure you want to delete this?"}
            {actionType === "save" && "Are you sure you want to save this?"}
            {actionType === "add" && "Are you sure you want to add this?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            style={{
              backgroundColor: "#e8594f",
              color: "white",
              borderRadius: "15px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              confirmAction();
              setOpenDialog(false);
            }}
            autoFocus
            style={{
              backgroundColor: "#0071b3",
              color: "white",
              borderRadius: "15px",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={!!successMessage}
        onClose={() => setSuccessMessage(null)}
        aria-labelledby="success-dialog-title"
        aria-describedby="success-dialog-description"
        PaperProps={{
          style: {
            borderRadius: "15px", // Apply the borderRadius to the Paper component
          },
        }}
      >
        <DialogTitle id="success-dialog-title">{"Success"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="success-dialog-description">
            {successMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setSuccessMessage(null);
              setImagePreview(null);
            }}
            autoFocus
            style={{
              backgroundColor: "#0071b3",
              color: "white",
              borderRadius: "15px",
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ManageStore;
