import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import CustomButton from "../components/CustomButton";

const ProductData = () => {
  const [productData, setProductData] = useState([]);
  const [edit, setEdit] = useState(0);
  const [editedProductData, setEditedProductData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  // Add new states for the search and filter inputs
  const [searchStore, setSearchStore] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/getAllProductServices");
        setProductData(response.data);
        setEditedProductData(response.data);
        console.log(response.data);
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
        const response = await axios.put(
          `http://localhost:8080/api/updateProductServiceById/${product.productId}`,
          product
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error updating product data:", error);
      }
    }
    setEdit(0);
    try {
      const response = await axios.get("http://localhost:8080/api/getAllProductServices");
      setProductData(response.data);
      console.log(response.data);
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
    // Get the product id from the editedProductData array using the deleteIndex
    const productId = editedProductData[deleteIndex].productId;
    // Call the deleteProductById endpoint using axios.delete and pass the productId as a parameter
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/deleteProductServiceById/${productId}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting product data:", error);
    }
    // Fetch the updated product data from the getAllProductServices endpoint and update the state
    try {
      const response = await axios.get("http://localhost:8080/api/getAllProductServices");
      setProductData(response.data);
      setEditedProductData(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
    // Close the delete dialog
    handleCloseDeleteDialog();
  };
  

  // Add a new function to handle the search input change
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchStore") {
      setSearchStore(value);
    } else if (name === "searchName") {
      setSearchName(value);
    }
  };

  // Add a new function to filter the product data based on the search inputs
  const filterProductData = () => {
    let filteredProductData = productData;
    // Filter by store id
    if (searchStore) {
      filteredProductData = filteredProductData.filter((product) =>
        product.store.storeId.toLowerCase().includes(searchStore.toLowerCase())
      );
    }
    // Filter by product name
    if (searchName) {
      filteredProductData = filteredProductData.filter((product) =>
        product.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    return filteredProductData;
  };

  return (
    <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
      <div>
        <h1 className="text-2xl font-bold pb-6">Products</h1>
        <CustomButton
          label={edit === 1 ? "Save" : "Edit"}
          onClick={edit === 1 ? handleOpenDialog : handleEditClick}
        ></CustomButton>
        {/* Add new inputs for the search features */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <label htmlFor="searchStore" className="pr-2">Search by store:</label>
            <input
              type="text"
              id="searchStore"
              name="searchStore"
              value={searchStore}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="searchName" className="pr-2">Search by name:</label>
            <input
              type="text"
              id="searchName"
              name="searchName"
              value={searchName}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <table className="w-full">
          <thead className="text-left border-b border-[#0071B3] text-slate-500">
            <tr>
              <th className="w-1/5 pb-2">Store Id</th>
              <th className="w-1/5 pb-2">Name</th>
              <th className="w-1/5 pb-2">Price</th>
              <th className="w-3/10 pb-2">Image</th>
              {/* Use a conditional rendering to display the Delete column header only when edit is 1 */}
              {edit === 1 && <th className="w-1/10 pb-2">Delete</th>}
            </tr>
          </thead>
          <tbody>
            {/* Use the filterProductData function to display the filtered data */}
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
                    product.store.storeId
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
                  ) : product.imagePath && <img src={product.imagePath} alt={`Image for ${product.name}`} />}
                </td>
                {/* Use a conditional rendering to display the delete button only when edit is 1 */}
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
        <Dialog
          open={openDelete}
          onClose={handleCloseDeleteDialog}
        >
          <DialogTitle>Confirm deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <CustomButton
              label="Cancel"
              onClick={handleCloseDeleteDialog}
            ></CustomButton>
            <CustomButton
              label="Confirm Deletion"
              onClick={handleDeleteProduct}
            ></CustomButton>
          </DialogActions>
        </Dialog>
        <Dialog
          open={open && edit === 1}
          onClose={handleCloseDialog}
        >
          <DialogTitle>Confirm changes</DialogTitle>
          <DialogContent>
              <DialogContentText>
              Are you sure you want to make any changes to the product data?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <CustomButton
              label="Cancel"
              onClick={handleCloseDialog}
            ></CustomButton>
            <CustomButton
              label="Confirm Changes"
              onClick={handleConfirmDialog}
            ></CustomButton>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  };
  
  export default ProductData;
