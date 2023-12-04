import { Paper } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

const ChatData = () => {
    const [chatData, setChatData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/getAllChats')
            .then(response => setChatData(response.data))
            .catch(error => console.error('Error fetching account data:', error));
    }, []);

    return (
        <Paper elevation={3} className="p-5 border rounded-3xl font-custom">
            <div>
                <h1 className="text-2xl font-bold pb-6" >Chats</h1>
                <table className="w-full">
                    <thead className="text-left border-b border-[#0071B3] text-slate-500">
                        <tr>
                            <th className="w-1/5 pb-2" >Conversation Id</th>
                            <th className="w-1/5 pb-2" >Chat Id</th>
                            <th className="w-1/5 pb-2" >Sender Id</th>
                            <th className="w-1/5 pb-2" >Message Content</th>
                            <th className="w-1/5 pb-2" >Message Time</th>
                            <th className="w-1/5 pb-2" >Store Id</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {chatData.map(chat => (
                            <tr key={chat.conversationId}>
                                <td className="py-2">{chat.conversationId}</td>
                                <td className="py-2">{chat.chatId}</td>
                                <td className="py-2">{chat.senderId}</td>
                                <td className="py-2">{chat.messageContent}</td>
                                <td className="py-2">{chat.messageTime}</td>
                                <td className="py-2">{chat.storeId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Paper>
    )
}

export default ChatData;
