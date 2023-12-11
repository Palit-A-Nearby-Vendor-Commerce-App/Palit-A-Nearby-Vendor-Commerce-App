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
  const [loading, setLoading] = useState(true);
  const [openAddConfirmDialog, setOpenAddConfirmDialog] = useState(false);

  useEffect(() => {
    const isMounted = true;
    if(!isMounted) return;
    const interval = setInterval(() => {
      fetchStore();
      fetchProducts();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchStore = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/getStoreById/${user.account.store.storeId}`
      );
      setStore(response.data);
      setEditedStore({
        storeName: response.data.storeName,
        category: response.data.category,
        description: response.data.description,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching store:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/getProductServicesByStoreId/store/${user.account.store.storeId}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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
          const base64Image = reader.result.split(",")[1];
          const productData = {
            ...product,
            image: base64Image,
          };
          axios
            .put(
              `http://localhost:8080/api/updateProductServiceById/${product.productId}`,
              productData
            )
            .then((response) => {
              console.log("Product updated:", response.data);
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
        .put(
          `http://localhost:8080/api/updateStoreById/${user.account.store.storeId}`,
          editedStore
        )
        .then((response) => {
          console.log("Store updated:", response.data);
          setStore(response.data);
          setSuccessMessage("Successfully saved.");
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
      setOpenAddConfirmDialog(true);
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
    axios
      .post("http://localhost:8080/api/createProductService", productData)
      .then((response) => {
        console.log("Product created:", response.data);
        setSuccessMessage("Successfully added.");
        productData.productId = response.data.productId;
        setProducts((prevProducts) => [...prevProducts, productData]);
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
      .delete(
        `http://localhost:8080/api/deleteProductServiceById/${newProducts[index].productId}`
      )
      .then((response) => {
        console.log("Product deleted:", response.data);
        setSuccessMessage("Successfully deleted.");
        setProducts(
          products.filter((product, productIndex) => productIndex !== index)
        );
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
      setOpenAddConfirmDialog(true);
    } else {
      openConfirmationDialog(() => handleAddConfirm, "add");
    }
  };

  const handleDelete = (index) => {
    openConfirmationDialog(() => () => handleDeleteConfirm(index), "delete");
  };

  return (
    <div
      className="noscrollbar"
      style={{
        overflow: "auto",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
                  <InputAdornment position="end" style={{ marginRight: "3px" }}>
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
              className="rounded-custom"
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
              <MenuItem value="fish" className="text-xs h-4">
                Fish
              </MenuItem>
              <MenuItem value="fruits" className="text-xs h-4">
                Fruits
              </MenuItem>
              <MenuItem value="assorted" className="text-xs h-4">
                Assorted
              </MenuItem>
              <MenuItem value="manicure" className="text-xs h-4">
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
            rows={3}
            inputProps={{ maxLength: 100 }}
            InputProps={{
              style: {
                fontSize: 15,
                height: 70,
                width: "340px",
                color: "black",
                textAlign: "justify",
                borderRadius: "20px",
              },
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ width: "3px", marginRight: "5px" }}
                >
                  <Icon>
                    <img src={editStore} alt="Edit Store" />
                  </Icon>
                </InputAdornment>
              ),
            }}
            value={editedStore.description}
            onChange={handleStoreInputChange}
          />
        ) : (
          <div style={{ width: "350px" }}>
            <p style={{ textAlign: "justify", wordWrap: "break-word" }}>
              {editedStore.description ? editedStore.description : "Loading..."}
            </p>
          </div>
        )}
      </div>
      <h1
        className="p-2 pt-5 text-lg font-medium"
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
                      borderRadius: "20px",
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
                      borderRadius: "20px",
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
        className="noscrollbar"
        style={{
          maxHeight: editMode ? "340px" : "500px",
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
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "red",
                      fontSize: "50px",
                      fontWeight: "bold",
                    }}
                  >
                    +
                  </div>
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
                        border: "none",
                      },
                      "&:hover fieldset": {
                        border: "none",
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
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
                  type="number"
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
                    width: "60%",
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
            borderRadius: "15px",
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
      <Dialog
        open={openAddConfirmDialog}
        onClose={() => setOpenAddConfirmDialog(false)}
        aria-labelledby="add-confirm-dialog-title"
        aria-describedby="add-confirm-dialog-description"
      >
        <DialogTitle id="add-confirm-dialog-title">
          {"Incomplete Details"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="add-confirm-dialog-description">
            Please fill in all product details.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenAddConfirmDialog(false)}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ManageStore;
