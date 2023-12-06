import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import CustomButton from "../components/CustomButton";

const ChatData = () => {
  const [chatData, setChatData] = useState([]);
  const [edit, setEdit] = useState(0);
  const [editedChatData, setEditedChatData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [searchConversationId, setSearchConversationId] = useState("");
  const [searchSenderId, setSearchSenderId] = useState("");
  const [searchStoreId, setSearchStoreId] = useState("");

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/getAllChats");
        setChatData(response.data);
        setEditedChatData(JSON.parse(JSON.stringify(response.data))); // Deep copy
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };
    fetchChatData();
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
    const newEditedChatData = [...editedChatData];
    newEditedChatData[index][name] = value;
    setEditedChatData(newEditedChatData);
  };

  const handleSaveClick = async () => {
    for (let chat of editedChatData) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/updateChatById/${chat.chatId}`,
          chat
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error updating chat data:", error);
      }
    }
    setEdit(0);
    try {
      const response = await axios.get("http://localhost:8080/api/getAllChats");
      setChatData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching chat data:", error);
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
  

  const handleDeleteChat = async () => {
    const chatId = editedChatData[deleteIndex].chatId;
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/deleteChatById/${chatId}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting chat data:", error);
    }
    try {
      const response = await axios.get("http://localhost:8080/api/getAllChats");
      setChatData(response.data);
      setEditedChatData(response.data);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
    handleCloseDeleteDialog();
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchConversationId") {
      setSearchConversationId(value);
    } else if (name === "searchSenderId") {
      setSearchSenderId(value);
    } else if (name === "searchStoreId") {
      setSearchStoreId(value);
    }
  };

  const filterChatData = () => {
    let filteredChatData = chatData;
    if (searchConversationId) {
      filteredChatData = filteredChatData.filter((chat) =>
        chat.conversation && chat.conversation.conversationId.toString().toLowerCase().includes(searchConversationId.toLowerCase())
      );
    }
    if (searchSenderId) {
      filteredChatData = filteredChatData.filter((chat) =>
        chat.account && chat.account.accountId.toString().toLowerCase().includes(searchSenderId.toLowerCase())
      );
    }
    if (searchStoreId) {
      filteredChatData = filteredChatData.filter((chat) =>
        chat.conversation && chat.conversation.vendor && chat.conversation.vendor.store && chat.conversation.vendor.store.storeId.toString().toLowerCase().includes(searchStoreId.toLowerCase())
      );
    }
    return filteredChatData;
  };

  return (
    <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
      <div>
        <div className="flex">
          <h1 className="text-2xl font-bold pb-6 text-[#0071B3]">Chats</h1>
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
              <th className="w-1/5 pb-2">Chat Id</th>
              <th className="w-1/5 pb-2">Message Content</th>
              <th className="w-1/5 pb-2">Message Time</th>
              <th className="w-1/5 pb-2">Sender Id</th>
              <th className="w-1/5 pb-2">Conversation Id</th>
              {edit === 1 && <th className="w-1/10 pb-2">Delete</th>}
            </tr>
          </thead>
          <tbody>
            {filterChatData().map((chat, index) => (
              <tr key={chat.chatId}>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="chatId"
                      value={editedChatData[index].chatId}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    chat.chatId
                  )}
                </td>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="messageContent"
                      value={editedChatData[index].messageContent}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    chat.messageContent
                  )}
                </td>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="timestamp"
                      value={editedChatData[index].timestamp}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    chat.timestamp
                  )}
                </td>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="account.accountId"
                      value={editedChatData[index].account.accountId}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    chat.account.accountId
                  )}
                </td>
                <td className="py-2">
                  {edit === 1 ? (
                    <input
                      type="text"
                      name="conversation.conversationId"
                      value={editedChatData[index].conversation.conversationId}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    chat.conversation.conversationId
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
            Are you sure you want to delete this chat?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mr-5 mb-5">
          <CustomButton
            label="Cancel"
            onClick={handleCloseDeleteDialog}
          ></CustomButton>
          <CustomButton
            label="Delete"
            onClick={handleDeleteChat}
            btnStyle="bg-red-500 rounded-3xl text-white p-2 text-lg font-semibolds cursor-pointer p-3"
          ></CustomButton>
        </DialogActions>
      </Dialog>
      <Dialog open={open && edit === 1} onClose={handleCloseDialog}>
        <DialogTitle>Confirm changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to make any changes to the chat data?
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

export default ChatData;