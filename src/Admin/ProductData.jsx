import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import CustomButton from "../components/CustomButton";

const ProductData = () => {
  const [productData, setProductData] = useState([]);
  const [edit, setEdit] = useState(0);
  const [editedProductData, setEditedProductData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [searchStore, setSearchStore] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchPrice, setSearchPrice] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/getAllProductServices"
        );
        setProductData(response.data);
        setEditedProductData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProductData();
  }, []);

  const handleEditClick = () => {
    setEdit(1);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirmDialog = () => {
    handleSaveClick();
    handleCloseDialog();
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newEditedProductData = [...editedProductData];
    newEditedProductData[index][name] = value;
    setEditedProductData(newEditedProductData);
  };

  const handleSaveClick = async () => {
    for (let product of editedProductData) {
      try {
        await axios.put(
          `http://localhost:8080/api/updateProductServiceById/${product.productId}`,
          product
        );
      } catch (error) {
        console.error("Error updating product data:", error);
      }
    }
    setEdit(0);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/getAllProductServices"
      );
      setProductData(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleOpenDeleteDialog = () => {
    setOpenDelete(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
  };

  const handleDeleteClick = async (index) => {
    setDeleteIndex(index);
    handleOpenDeleteDialog();
  };

  const handleDeleteProduct = async () => {
    const productId = editedProductData[deleteIndex].productId;
    try {
      await axios.delete(
        `http://localhost:8080/api/deleteProductServiceById/${productId}`
      );
    } catch (error) {
      console.error("Error deleting product data:", error);
    }
    try {
      const response = await axios.get(
        "http://localhost:8080/api/getAllProductServices"
      );
      setProductData(response.data);
      setEditedProductData(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
    handleCloseDeleteDialog();
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchStore") {
      setSearchStore(value);
    } else if (name === "searchName") {
      setSearchName(value);
    } else if (name === "searchPrice") {
      setSearchPrice(value);
    }
  };

  const filterProductData = () => {
    let filteredProductData = productData;
    if (searchStore) {
      filteredProductData = filteredProductData.filter((product) =>
        product.store.storeName
          .toLowerCase()
          .includes(searchStore.toLowerCase())
      );
    }
    if (searchName) {
      filteredProductData = filteredProductData.filter((product) =>
        product.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (searchPrice) {
      filteredProductData = filteredProductData.filter((product) =>
        product.price.toString().includes(searchPrice)
      );
    }
    return filteredProductData;
  };

  return (
    <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
      <div>
        <div className="flex">
          <h1 className="text-2xl font-bold pb-6 text-[#0071B3]">Products</h1>
          <CustomButton
            label={edit === 1 ? "Save" : "Edit"}
            onClick={edit === 1 ? handleOpenDialog : handleEditClick}
            btnStyle={
              edit === 1
                ? "text-blue-500 ml-5 text-sm font-thin"
                : "text-red-500 ml-5 text-sm font-thin"
            }
          ></CustomButton>
        </div>
        <table className="w-full">
          <thead className="text-left border-b border-[#0071B3] text-slate-500">
            <tr>
              <th className="w-1/5 pb-2">
                <div>
                  Store
                  <input
                    type="text"
                    id="searchStore"
                    name="searchStore"
                    value={searchStore}
                    onChange={handleSearchChange}
                    placeholder="Search store"
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  />
                </div>
              </th>
              <th className="w-1/5 pb-2">
                <div>
                  Product Name
                  <input
                    type="text"
                    id="searchName"
                    name="searchName"
                    value={searchName}
                    onChange={handleSearchChange}
                    placeholder="Search product name"
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  />
                </div>
              </th>
              <th className="w-1/5 pb-2">
                <div>
                  Price
                  <input
                    type="text"
                    id="searchPrice"
                    name="searchPrice"
                    value={searchPrice}
                    onChange={handleSearchChange}
                    placeholder="Search price"
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  />
                </div>
              </th>
              <th className="w-3/10 pb-2">Image</th>
              {edit === 1 && <th className="w-1/10 pb-2">Delete</th>}
            </tr>
          </thead>
          <tbody>
            {filterProductData().map((product, index) => (
              <tr key={product.productId}>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="storeId"
                      value={editedProductData[index].store.storeId}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    product.store.storeName
                  )}
                </td>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="name"
                      value={editedProductData[index].name}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="number"
                      name="price"
                      value={editedProductData[index].price}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="imagePath"
                      value={editedProductData[index].imagePath}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    product.imagePath && (
                      <img
                        src={product.imagePath}
                        alt={`Image for ${product.name}`}
                      />
                    )
                  )}
                </td>
                {edit === 1 && (
                  <td className="py-2">
                    <CustomButton
                      label="Delete"
                      onClick={() => handleDeleteClick(index)}
                    ></CustomButton>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={openDelete} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mr-5 mb-5">
          <CustomButton
            label="Cancel"
            onClick={handleCloseDeleteDialog}
          ></CustomButton>
          <CustomButton
            label="Delete"
            onClick={handleDeleteProduct}
            btnStyle="bg-red-500 rounded-3xl text-white p-2 text-lg font-semibolds cursor-pointer p-3"
          ></CustomButton>
        </DialogActions>
      </Dialog>
      <Dialog open={open && edit === 1} onClose={handleCloseDialog}>
        <DialogTitle>Confirm changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to make any changes to the product data?
          </DialogContentText>
        </DialogContent>
        <DialogActions className=" mr-5 mb-5">
          <CustomButton
            label="Cancel"
            onClick={handleCloseDialog}
          ></CustomButton>
          <CustomButton
            label="Save Changes"
            onClick={handleConfirmDialog}
            btnStyle="bg-blue-500 rounded-3xl text-white p-2 text-lg font-semibolds cursor-pointer p-3"
          ></CustomButton>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ProductData;
