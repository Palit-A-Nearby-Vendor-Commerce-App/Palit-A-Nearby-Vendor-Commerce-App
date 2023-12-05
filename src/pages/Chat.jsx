import React from "react";
import { useState, useContext, useRef, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SendIcon from "@mui/icons-material/Send";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

import {
  GRADIENT_BG,
  StyledBadge,
  GRADIENT_BG_DM,
} from "../assets/styles/styles";
import dummyImg from "../assets/images/dummy_prof.jpeg";

const Chat = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const selectedVendor = location.state?.selectedVendor;
  // const selectedCustomer = location.state?.selectedCustomer;
  const selectedCustomer = location.state?.u;
  const { user } = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState(null);

  console.log("Selected Customer: ", selectedCustomer);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/getAllConversations"
        );
        console.log("Mao ni convos: ", response.data);
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    const checkAndCreateConversation = async () => {
      try {
        if (selectedVendor && selectedVendor.account && user && user.account) {
          // Check if a conversation already exists with the selected vendor
          const existingConversation = conversations.find(
            (conv) =>
              conv?.vendor?.accountId === selectedVendor?.account?.accountId &&
              conv?.customer?.accountId === user?.account?.accountId
          );

          if (existingConversation) {
            // If conversation exists, set it in the state
            console.log("Conversation already exists!");
            setSelectedConversation(existingConversation);
          } else {
            // Otherwise, create a new conversation
            const response = await axios.post(
              "http://localhost:8080/api/createConversation",
              {
                vendor: selectedVendor.account,
                customer: user.account,
              }
            );

            console.log("Success creating conversation", response.data);
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
          const existingConversation = conversations.find(
            (conv) =>
              conv?.customer?.accountId ===
                selectedCustomer?.account?.accountId &&
              conv?.vendor?.accountId === user?.account?.accountId
          );

          if (existingConversation) {
            // If conversation exists, set it in the state
            console.log("Conversation already exists!");
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

    // Call the function when the component mounts or when dependencies change
    checkAndCreateConversation();
  }, [conversations]);

  const fetchChats = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/getChatsByConversationId/${selectedConversation.conversationId}`
      );
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChats();

    const intervalId = setInterval(fetchChats, 3000); // Fetch data every 3 seconds

    return () => clearInterval(intervalId);
  }, [selectedConversation]);

  console.log("Chats,", chats);

  const sendChat = async () => {
    try {
      // Replace with the actual account and conversation information

      const currentTimestamp = new Date();

      const newChat = {
        account: user.account,
        messageContent: newMessage,
        timestamp: currentTimestamp.toISOString(),
        conversation: {
          conversationId: selectedConversation.conversationId,
        },
      };

      const response = await axios.post(
        "http://localhost:8080/api/createChat",
        newChat
      );
      const createdChat = response.data;

      // Update the local state with the new chat
      setChats((prevChats) => [...prevChats, createdChat]);

      // Clear the input field
      setNewMessage("");
    } catch (error) {
      console.error("Error sending chat:", error);
    }
  };
  const toggleDarkmode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleBackButtonClick = () => {
    // Set selectedConversationId to null in local storage
    localStorage.setItem("selectedConversationId", null);

    // Optionally, you can also reset the selectedConversation state
    setSelectedConversation(null);
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
                  // alt={selectedVendor.email}
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
                  // alt={selectedCustomer.email}
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
        className="w-full  flex flex-col flex-1 overflow-scroll py-4 px-10"
      >
        {selectedConversation &&
          selectedVendor &&
          chats.map((chat) => (
            <div
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
                    // alt={chat?.conversation?.vendor?.email}
                    src={`data:image/jpeg;base64,${selectedVendor.image}`}
                    style={{
                      height: "42px",
                      width: "42px",
                      display: "inline-block",
                    }}
                  />
                  <span className="bg-[#E3F1F3] p-3 text-left rounded-r-lg rounded-b-lg">
                    {chat?.messageContent}
                  </span>
                </span>
              ) : (
                <span className="bg-[#AAD5DD] p-3 text-left rounded-l-lg rounded-t-lg">
                  {chat?.messageContent}
                </span>
              )}
            </div>
          ))}

        {selectedConversation &&
          selectedCustomer &&
          chats.map((chat) => (
            <div
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
                    // alt={chat?.conversation?.customer?.email}
                    src={`data:image/jpeg;base64,${selectedCustomer.image}`}
                    style={{
                      height: "42px",
                      width: "42px",
                      display: "inline-block",
                    }}
                  />
                  <span className="bg-[#E3F1F3] p-3 text-left rounded-r-lg rounded-b-lg">
                    {chat?.messageContent}
                  </span>
                </span>
              ) : (
                <span className="bg-[#AAD5DD] p-3 text-left rounded-l-lg rounded-t-lg">
                  {chat?.messageContent}
                </span>
              )}
            </div>
          ))}
      </div>
      <div id="input-chat" className="w-full h-20 flex gap-3 py-2 px-8 mb-4">
        <textarea
          className="w-full h-full p-2 rounded-lg border border-gray-300"
          value={newMessage}
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
