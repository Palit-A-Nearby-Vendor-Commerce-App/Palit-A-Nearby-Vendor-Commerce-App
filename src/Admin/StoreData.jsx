import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import CustomButton from "../components/CustomButton";

const StoreData = () => {
  const [storeData, setStoreData] = useState([]);
  const [edit, setEdit] = useState(0);
  const [editedStoreData, setEditedStoreData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  // Add new states for the search and filter inputs
  const [searchStore, setSearchStore] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/getAllStores");
        setStoreData(response.data);
        setEditedStoreData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };
    fetchStoreData();
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
    const newEditedStoreData = [...editedStoreData];
    newEditedStoreData[index][name] = value;
    setEditedStoreData(newEditedStoreData);
  };

  const handleSaveClick = async () => {
    for (let store of editedStoreData) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/updateStoreById/${store.storeId}`,
          store
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error updating store data:", error);
      }
    }
    setEdit(0);
    try {
      const response = await axios.get("http://localhost:8080/api/getAllStores");
      setStoreData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching store data:", error);
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
  

  const handleDeleteStore = async () => {
    // Get the store id from the editedStoreData array using the deleteIndex
    const storeId = editedStoreData[deleteIndex].storeId;
    // Call the deleteStoreById endpoint using axios.delete and pass the storeId as a parameter
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/deleteStoreById/${storeId}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting store data:", error);
    }
    // Fetch the updated store data from the getAllStores endpoint and update the state
    try {
      const response = await axios.get("http://localhost:8080/api/getAllStores");
      setStoreData(response.data);
      setEditedStoreData(response.data);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
    // Close the delete dialog
    handleCloseDeleteDialog();
  };
  

  // Add a new function to handle the search input change
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchStore") {
      setSearchStore(value);
    } else if (name === "searchDescription") {
      setSearchDescription(value);
    }
  };

  // Add a new function to handle the filter input change
  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilterCategory(value);
  };

  // Add a new function to filter the store data based on the search and filter inputs
  const filterStoreData = () => {
    let filteredStoreData = storeData;
    // Filter by store name
    if (searchStore) {
      filteredStoreData = filteredStoreData.filter((store) =>
        store.storeName.toLowerCase().includes(searchStore.toLowerCase())
      );
    }
    // Filter by description
    if (searchDescription) {
      filteredStoreData = filteredStoreData.filter((store) =>
        store.description.toLowerCase().includes(searchDescription.toLowerCase())
      );
    }
    // Filter by category
    if (filterCategory !== "All") {
      filteredStoreData = filteredStoreData.filter((store) => store.category === filterCategory);
    }
    return filteredStoreData;
  };

  return (
    <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
      <div>
        <h1 className="text-2xl font-bold pb-6">Store</h1>
        <CustomButton
          label={edit === 1 ? "Save" : "Edit"}
          onClick={edit === 1 ? handleOpenDialog : handleEditClick}
        ></CustomButton>
        {/* Add new inputs for the search and filter features */}
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
            <label htmlFor="searchDescription" className="pr-2">Search by description:</label>
            <input
              type="text"
              id="searchDescription"
              name="searchDescription"
              value={searchDescription}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="filterCategory" className="pr-2">Filter by category:</label>
            <select
              id="filterCategory"
              name="filterCategory"
              value={filterCategory}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="Fish">Fish</option>
              <option value="Meat">Meat</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
            </select>
          </div>
        </div>
        <table className="w-full">
          <thead className="text-left border-b border-[#0071B3] text-slate-500">
            <tr>
              <th className="w-1/5 pb-2">Store</th>
              <th className="w-2/5 pb-2">Description</th>
              <th className="w-1/10 pb-2">Category</th>
              {/* Use a conditional rendering to display the Delete column header only when edit is 1 */}
              {edit === 1 && <th className="w-1/10 pb-2">Delete</th>}
            </tr>
          </thead>
          <tbody>
            {/* Use the filterStoreData function to display the filtered data */}
            {filterStoreData().map((store, index) => (
              <tr key={store.storeId}>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="storeName"
                      value={editedStoreData[index].storeName}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    store.storeName
                  )}
                </td>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="description"
                      value={editedStoreData[index].description}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    store.description
                  )}
                </td>
                <td className="py-2">
                  {edit === 1 ? (
                    <select
                      name="category"
                      value={editedStoreData[index].category}
                      onChange={(e) => handleChange(e, index)}
                    >
                      <option value="Fish">Fish</option>
                      <option value="Meat">Meat</option>
                      <option value="Vegetable">Vegetable</option>
                      <option value="Fruit">Fruit</option>
                    </select>
                  ) : (
                    store.category
                  )}
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
              Are you sure you want to delete this store?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <CustomButton
              label="Cancel"
              onClick={handleCloseDeleteDialog}
            ></CustomButton>
            <CustomButton
              label="Confirm Deletion"
              onClick={handleDeleteStore}
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
              Are you sure you want to make any changes to the store data?
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
  
  export default StoreData;
