import React from "react";
import { useState } from "react";
import { Avatar } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SendIcon from "@mui/icons-material/Send";

import {
  GRADIENT_BG,
  StyledBadge,
  GRADIENT_BG_DM,
} from "../assets/styles/styles";
import dummyImg from "../assets/images/dummy_prof.jpeg";

const conversation = [
  {
    conversation_id: 1,
    is_deleted: 0,
    receiver_id: 101,
    sender_id: 100,
  },
  {
    conversation_id: 2,
    is_deleted: 0,
    receiver_id: 201,
    sender_id: 200,
  },
];

const chats = [
  {
    chat_id: 1,
    conversation_id: 1,
    is_deleted: 0,
    message_content: "Unsay baligya ninyo boss?",
    receiver_id: 100,
    sender_id: 101,
    timestamp: "2023-11-22T10:35:00Z",
  },
  {
    chat_id: 2,
    conversation_id: 1,
    is_deleted: 0,
    message_content: "Pila nana ka adlaw sukad harvest inyong saging?",
    receiver_id: 100,
    sender_id: 101,
    timestamp: "2023-11-22T11:00:00Z",
  },
  {
    chat_id: 3,
    conversation_id: 1,
    is_deleted: 0,
    message_content: "Naa tay saging, siomai, buko juice, og uban pa",
    receiver_id: 101,
    sender_id: 100,
    timestamp: "2023-11-22T11:05:00Z",
  },
  {
    chat_id: 4,
    conversation_id: 1,
    is_deleted: 0,
    message_content: "Sige sige boss, papalita ko",
    receiver_id: 100,
    sender_id: 101,
    timestamp: "2023-11-22T11:05:00Z",
  },
];

const Chat = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkmode = () => {
    setIsDarkMode(!isDarkMode);
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
          <button>
            <ArrowBackIcon
              sx={{ color: isDarkMode ? "white" : "black", fontSize: 32 }}
            />
          </button>
          <div className="flex items-center gap-3">
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt="Remy Sharp"
                src={dummyImg}
                style={{ height: "60px", width: "60px" }}
              />
            </StyledBadge>
            <div>
              <h2
                className={`${
                  isDarkMode ? "text-white" : "text-black"
                } text-xl font-semibold`}
              >
                {conversation[0].receiver_id === 101 && "Gregorio Bainabai"}
              </h2>
              <p className="text-sm text-green-500">∙ Online</p>
            </div>
          </div>
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
        {chats.map((chat) => (
          <div
            className={`${
              chat.sender_id === 101 ? "self-start" : "self-end"
            } mb-3 flex`}
          >
            {chat.sender_id === 101 ? (
              <span className="flex items-center gap-2">
                <Avatar
                  alt="Dummy profile"
                  src={dummyImg}
                  style={{
                    height: "42px",
                    width: "42px",
                    display: "inline-block",
                  }}
                />
                <span className="bg-[#E3F1F3] p-3 text-left rounded-r-lg rounded-b-lg">
                  {chat.message_content}
                </span>
              </span>
            ) : (
              <span className="bg-[#AAD5DD] p-3 text-left rounded-l-lg rounded-t-lg">
                {chat.message_content}
              </span>
            )}
          </div>
        ))}
      </div>
      <div id="input-chat" className="w-full h-20 flex gap-3 py-2 px-8 mb-4">
        <textarea className="w-full h-full p-2 rounded-lg border border-gray-300"></textarea>
        <button>
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
