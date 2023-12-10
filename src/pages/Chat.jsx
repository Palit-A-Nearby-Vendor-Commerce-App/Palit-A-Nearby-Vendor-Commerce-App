import React, { useState, useContext, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";
import AlertDialog from "../components/AlertDialog";
import axios from "axios";
import { convertToTime } from "../utils/functions";
import {
  GRADIENT_BG,
  StyledBadge,
  GRADIENT_BG_DM,
} from "../assets/styles/styles";

const Chat = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const selectedVendor = location.state?.selectedVendor;
  const selectedCustomer = location.state?.u;
  const { user } = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const handleDeleteConfirmation = (messageId) => {
    setSelectedMessageId(messageId);
    setOpenDeleteConfirmation(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setChatId(null);
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/getAllConversations"
        );
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  const checkAndCreateConversation = async () => {
    try {
      if (selectedVendor && selectedVendor.account && user && user.account) {
        const existingConversation = conversations?.find(
          (conv) =>
            conv?.vendor?.accountId === selectedVendor?.account?.accountId &&
            conv?.customer?.accountId === user?.account?.accountId
        );
        if (existingConversation) {
          setSelectedConversation(existingConversation);
        } else {
          const response = await axios.post(
            "http://localhost:8080/api/createConversation",
            {
              vendor: selectedVendor.account,
              customer: user.account,
            }
          );
          const newConversation = response.data;
          localStorage.setItem(
            "selectedConversationId",
            newConversation.conversationId
          );
          localStorage.setItem(
            "selectedVendorId",
            selectedVendor.account.accountId
          );
          setSelectedConversation(newConversation);
        }
      } else if (
        selectedCustomer &&
        selectedCustomer.account &&
        user &&
        user.account
      ) {
        const existingConversation = conversations?.find(
          (conv) =>
            conv?.customer?.accountId ===
              selectedCustomer?.account?.accountId &&
            conv?.vendor?.accountId === user?.account?.accountId
        );

        if (existingConversation) {
          setSelectedConversation(existingConversation);
        }
      } else {
        console.error(
          "selectedVendor, selectedVendor.account, user, or user.account is undefined or null"
        );
      }
    } catch (error) {
      console.error("Error creating or checking conversation:", error);
    }
  };

  useEffect(() => {
    checkAndCreateConversation();
  }, [conversations]);

  const fetchChats = async () => {
    if (selectedConversation) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/getChatsByConversationId/${selectedConversation?.conversationId}`
        );
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    }
  };

  useEffect(() => {
    fetchChats();

    const intervalId = setInterval(fetchChats, 3000);
    return () => clearInterval(intervalId);
  }, [selectedConversation]);

  const sendChat = async () => {
    try {
      const currentTimestamp = new Date();
      const newChat = {
        account: user.account,
        messageContent: newMessage,
        timestamp: currentTimestamp.toISOString(),
        conversation: {
          conversationId: selectedConversation.conversationId,
        },
      };
      const response = await axios
        .post("http://localhost:8080/api/createChat", newChat)
        .then(() => {
          fetchChats();
        });
    } catch (error) {
      console.error("Error sending chat:", error);
    }
  };
  const handleDeleteChat = async () => {
    try {
      const response = await axios
        .delete(`http://localhost:8080/api/deleteChatById/${selectedMessageId}`)
        .then(() => {
          fetchChats();
        });
    } catch (error) {
      console.error("Error deleting message:", error);
    } finally {
      setOpenDeleteConfirmation(false);
      setSelectedMessageId(null);
    }
  };
  const toggleDarkmode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const handleBackButtonClick = () => {
    localStorage.setItem("selectedConversationId", null);
    setSelectedConversation(null);
  };
  const handleMenuClick = (chatId) => {
    console.log("chat id:", chatId); // log the chat id
    setChatId(chatId); // set the chat id state
    setAnchorEl(document.getElementById(`button-${chatId}`)); // set the anchor element
    console.log("anchor element:", anchorEl); // log the anchor element
    setOpen(true); // open the menu
  };

  return (
    <div
      className={`w-full h-screen flex flex-col font-custom ${
        isDarkMode ? "bg-[#081314]" : "bg-slate-100"
      }`}
    >
      <div
        id="receiver-details"
        className="w-full px-10 py-4 flex justify-between items-center"
        style={isDarkMode ? GRADIENT_BG_DM : GRADIENT_BG}
      >
        <div className="h-full flex items-center gap-4">
          <Link to="/home">
            <button onClick={handleBackButtonClick}>
              <ArrowBackIcon
                sx={{ color: isDarkMode ? "white" : "black", fontSize: 32 }}
              />
            </button>
          </Link>
          {selectedVendor && selectedVendor.account ? (
            <div className="flex items-center gap-3">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  src={`data:image/jpeg;base64,${selectedVendor?.image}`}
                  style={{ height: "60px", width: "60px" }}
                />
              </StyledBadge>
              <div>
                <h2
                  className={`${
                    isDarkMode ? "text-white" : "text-black"
                  } text-xl font-semibold`}
                >
                  {selectedVendor.account.store.storeName}
                </h2>
                <p className="text-sm text-green-500">∙ Online</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  src={`data:image/jpeg;base64,${selectedCustomer.image}`}
                  style={{ height: "60px", width: "60px" }}
                />
              </StyledBadge>
              <div>
                <h2
                  className={`${
                    isDarkMode ? "text-white" : "text-black"
                  } text-xl font-semibold`}
                >
                  {selectedCustomer.firstName + " " + selectedCustomer.lastName}
                </h2>
                <p className="text-sm text-green-500">∙ Online</p>
              </div>
            </div>
          )}
        </div>
        <div>
          <button onClick={toggleDarkmode}>
            {isDarkMode ? (
              <DarkModeIcon sx={{ color: "black", fontSize: 32 }} />
            ) : (
              <LightModeIcon sx={{ color: "#F4D23F", fontSize: 32 }} />
            )}
          </button>
        </div>
      </div>
      <div
        id="message-contents"
        className="w-full  flex flex-col flex-1 overflow-auto py-4 px-10"
      >
        {!user.account.isVendor ? (
          <span style={{ textAlign: "center", color: "grey" }}>
            {" "}
            You must have an active order to communicate with the vendor{" "}
          </span>
        ) : null}
        {selectedConversation &&
          selectedVendor &&
          chats.map((chat) => (
            <div
              key={chat.chatId}
              className={`${
                chat?.account?.accountId ===
                chat?.conversation?.vendor?.accountId
                  ? "self-start"
                  : "self-end"
              } mb-3 flex`}
            >
              {chat?.account?.accountId ===
              chat?.conversation?.vendor?.accountId ? (
                <span className="flex items-center gap-2">
                  <Avatar
                    src={`data:image/jpeg;base64,${selectedVendor?.image}`}
                    style={{
                      height: "42px",
                      width: "42px",
                      display: "inline-block",
                    }}
                  />
                  <Tooltip title={`${convertToTime(chat?.timestamp)}`}>
                    <span className="bg-[#E3F1F3] p-3 text-left rounded-r-lg rounded-b-lg">
                      {chat?.messageContent}
                    </span>
                  </Tooltip>
                </span>
              ) : (
                <Tooltip title={`${convertToTime(chat?.timestamp)}`}>
                  <span className="bg-[#AAD5DD] p-3 text-left rounded-l-lg rounded-t-lg relative">
                    {chat?.messageContent}
                    <span className="absolute left-[-50px] top-2">
                      <Button
                        id={`button-${chat.chatId}`} // use a unique id for each button
                        aria-controls={`menu-${chat.chatId}`} // use a unique id for each menu
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={() => handleMenuClick(chat.chatId)} // pass the chat id as a parameter
                      >
                        <MoreVertIcon />
                      </Button>
                      <Menu
                        id={`menu-${chat.chatId}`} // use a unique id for each menu
                        anchorEl={anchorEl}
                        open={open && chatId === chat.chatId} // only open the menu if the chat id matches
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": `button-${chat.chatId}`, // use the corresponding button id
                        }}
                      >
                        <MenuItem
                          id={chat.chatId}
                          onClick={(event) =>
                            handleDeleteConfirmation(event.currentTarget.id)
                          }
                        >
                          Delete
                        </MenuItem>
                        {openDeleteConfirmation && (
                          <AlertDialog
                            open={true}
                            handleClose={() => setOpenDeleteConfirmation(false)}
                            handleConfirm={handleDeleteChat}
                            title="Delete Confirmation"
                            content="Are you sure you want to delete this message?"
                          />
                        )}
                      </Menu>
                    </span>
                  </span>
                </Tooltip>
              )}
            </div>
          ))}

        {selectedConversation &&
          selectedCustomer &&
          chats.map((chat) => (
            <div
              key={chat.chatId}
              className={`${
                chat?.account?.accountId ===
                chat?.conversation?.customer?.accountId
                  ? "self-start"
                  : "self-end"
              } mb-3 flex`}
            >
              {chat?.account?.accountId ===
              chat?.conversation?.customer?.accountId ? (
                <span className="flex items-center gap-2">
                  <Avatar
                    src={`data:image/jpeg;base64,${selectedCustomer.image}`}
                    style={{
                      height: "42px",
                      width: "42px",
                      display: "inline-block",
                    }}
                  />
                  <Tooltip title={`${convertToTime(chat?.timestamp)}`}>
                    <span className="bg-[#E3F1F3] p-3 text-left rounded-r-lg rounded-b-lg">
                      {chat?.messageContent}
                    </span>
                  </Tooltip>
                </span>
              ) : (
                <Tooltip title={`${convertToTime(chat?.timestamp)}`}>
                  <span className="bg-[#AAD5DD] p-3 text-left rounded-l-lg rounded-t-lg relative">
                    {chat?.messageContent}
                    <span className="absolute left-[-50px] top-2">
                      <Button
                        id={`button-${chat.chatId}`} // use a unique id for each button
                        aria-controls={`menu-${chat.chatId}`} // use a unique id for each menu
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={() => handleMenuClick(chat.chatId)} // pass the chat id as a parameter
                      >
                        <MoreVertIcon />
                      </Button>
                      <Menu
                        id={`menu-${chat.chatId}`} // use a unique id for each menu
                        anchorEl={anchorEl}
                        open={open && chatId === chat.chatId} // only open the menu if the chat id matches
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": `button-${chat.chatId}`, // use the corresponding button id
                        }}
                      >
                        <MenuItem
                          id={chat.chatId}
                          onClick={(event) =>
                            handleDeleteConfirmation(event.currentTarget.id)
                          }
                        >
                          Delete
                        </MenuItem>
                        {openDeleteConfirmation && (
                          <AlertDialog
                            open={true}
                            handleClose={() => setOpenDeleteConfirmation(false)}
                            handleConfirm={handleDeleteChat}
                            title="Delete Confirmation"
                            content="Are you sure you want to delete this message?"
                          />
                        )}
                      </Menu>
                    </span>
                  </span>
                </Tooltip>
              )}
            </div>
          ))}
      </div>
      <div id="input-chat" className="w-full h-20 flex gap-3 py-2 px-8 mb-4">
        <textarea
          className="w-full h-full p-2 rounded-lg border border-gray-300"
          value={newMessage}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendChat();
              event.preventDefault();
              setNewMessage("");
            }
          }}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button onClick={sendChat}>
          <SendIcon
            sx={{
              fontSize: 60,
              backgroundColor: isDarkMode ? "white" : "black",
              padding: "12px",
              color: isDarkMode ? "black" : "white",
              borderRadius: "100px",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Chat;
