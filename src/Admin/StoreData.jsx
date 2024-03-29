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

const StoreData = () => {
  const [storeData, setStoreData] = useState([]);
  const [edit, setEdit] = useState(0);
  const [editedStoreData, setEditedStoreData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [searchStore, setSearchStore] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/getAllStores"
        );
        setStoreData(response.data);
        setEditedStoreData(response.data);
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
        await axios.put(
          `http://localhost:8080/api/updateStoreById/${store.storeId}`,
          store
        );
      } catch (error) {
        console.error("Error updating store data:", error);
      }
    }
    setEdit(0);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/getAllStores"
      );
      setStoreData(response.data);
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
    const storeId = editedStoreData[deleteIndex].storeId;
    try {
      await axios.delete(
        `http://localhost:8080/api/deleteStoreById/${storeId}`
      );
    } catch (error) {
      console.error("Error deleting store data:", error);
    }
    try {
      const response = await axios.get(
        "http://localhost:8080/api/getAllStores"
      );
      setStoreData(response.data);
      setEditedStoreData(response.data);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
    handleCloseDeleteDialog();
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchStore") {
      setSearchStore(value);
    } else if (name === "searchDescription") {
      setSearchDescription(value);
    }
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilterCategory(value);
  };

  const filterStoreData = () => {
    let filteredStoreData = storeData;
    if (searchStore) {
      filteredStoreData = filteredStoreData.filter((store) =>
        store.storeName.toLowerCase().includes(searchStore.toLowerCase())
      );
    }
    if (searchDescription) {
      filteredStoreData = filteredStoreData.filter((store) =>
        store.description
          .toLowerCase()
          .includes(searchDescription.toLowerCase())
      );
    }
    if (filterCategory !== "All") {
      filteredStoreData = filteredStoreData.filter(
        (store) => store.category === filterCategory
      );
    }
    return filteredStoreData;
  };

  return (
    <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
      <div>
        <div className="flex">
          <h1 className="text-2xl font-bold pb-6 text-[#0071B3]">Store</h1>
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
              <th className="w-2/5 pb-2">
                <div>
                  Description
                  <input
                    type="text"
                    id="searchDescription"
                    name="searchDescription"
                    value={searchDescription}
                    onChange={handleSearchChange}
                    placeholder="Search description"
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  />
                </div>
              </th>
              <th className="w-1/10 pb-2">
                <div>
                  Category
                  <select
                    id="filterCategory"
                    name="filterCategory"
                    value={filterCategory}
                    onChange={handleFilterChange}
                    className="ml-5 border-b border-[#0071B3] text-slate-500 text-sm font-thin"
                  >
                    <option value="All">All</option>
                    <option value="Fish">Fish</option>
                    <option value="Meat">Meat</option>
                    <option value="Vegetable">Vegetable</option>
                    <option value="Fruit">Fruit</option>
                  </select>
                </div>
              </th>
              {edit === 1 && <th className="w-1/10 pb-2">Delete</th>}
            </tr>
          </thead>
          <tbody>
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
            Are you sure you want to delete this store?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mr-5 mb-5">
          <CustomButton
            label="Cancel"
            onClick={handleCloseDeleteDialog}
          ></CustomButton>
          <CustomButton
            label="Delete"
            onClick={handleDeleteStore}
            btnStyle="bg-red-500 rounded-3xl text-white p-2 text-lg font-semibolds cursor-pointer p-3"
          ></CustomButton>
        </DialogActions>
      </Dialog>
      <Dialog open={open && edit === 1} onClose={handleCloseDialog}>
        <DialogTitle>Confirm changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to make any changes to the store data?
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

export default StoreData;
