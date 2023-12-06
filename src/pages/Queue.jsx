// Queue.js
import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import { UserContext } from "../UserContext";

const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/api/getAllTransactions")
      .then((response) => {
        const queueTransacs = response.data.filter(
          (q) =>
            q.accountVendorId.accountId === user.account.accountId &&
            q.vendor.accountId === user.account.accountId
        );
        setQueue(queueTransacs);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .get("http://localhost:8080/api/getAllUsers")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data immediately on component mount
    const intervalId = setInterval(fetchData, 3000); // Fetch data every 3 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const handleServeNow = (item) => {
    axios
      .put(
        `http://localhost:8080/api/updateTransactionById/${item?.transactionId}`,
        { ...item, status: "Now Serving" }
      )
      .then((response) => {
        console.log("Transaction now serving:", response.data);
      });
  };

  const handleCompleted = async (item) => {
    try {
      const updateResponse = await axios.put(
        `http://localhost:8080/api/updateTransactionById/${item?.transactionId}`,
        { ...item, status: "Completed" }
      );
      const deleteResponse = await axios.delete(
        `http://localhost:8080/api/deleteTransactionById/${item?.transactionId}`
      );
    } catch (error) {
      console.error("Error completing or deleting transaction:", error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "73vh",
      }}
    >
      <h3 className="text-xl text-[#E8594F] mb-5">Now Serving</h3>
      {console.log(
        "Vendor transacs: ",
        queue.filter(
          (q) =>
            q.accountVendorId.accountId === user.account.accountId &&
            q.vendor.accountId === user.account.accountId
        )
      )}

      {queue.length > 0 &&
        queue.map((item) => {
          if (item.status === "Now Serving") {
            // Find the user object that matches the account id
            const u = users.find(
              (u) =>
                u &&
                u.account &&
                u.account?.accountId === item.customer?.accountId
            );

            if (u) {
              return (
                <Accordion
                  key={u.account.accountId}
                  className="w-full items-center text-white mb-3"
                  style={{ backgroundColor: "#E8594F", borderRadius: "20px" }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <div className="flex items-center text-white">
                      <img
                        alt={u.firstName}
                        src={`data:image/jpeg;base64,${u.image}`}
                        className="h-full w-[46px] rounded-full border-2 border-red-900 mr-2"
                      />
                      <div>
                        {u.firstName + " " + u.lastName}
                        <span className="text-[12px] p-[1px] text-red-400 bg-slate-600 block text-center rounded-lg w-[90px]">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails className="text-white relative">
                    {item.details &&
                      item.details.split(";").map((detail, index, array) => {
                        const [itemName, quantity] = detail.split("x");
                        const trimmedItemName = itemName ? itemName.trim() : "";
                        const trimmedQuantity = quantity ? quantity.trim() : "";
                        return (
                          <div key={index}>
                            <Typography className="flex justify-between">
                              {index !== array.length - 1 ? (
                                <span>
                                  {trimmedItemName
                                    .replace(" ", ": ")
                                    .replace("Php", "₱")}
                                </span>
                              ) : (
                                <span className="font-semibold text-sm mt-3 bg-slate-100 border border-red-500 p-1 text-red-400 rounded-md">
                                  {trimmedItemName.split(" ")[0]} ₱
                                  {trimmedItemName.split(" ")[1].substring(3)}
                                </span>
                              )}
                              <span>
                                {index === array.length - 1
                                  ? `${trimmedQuantity}`
                                  : `${trimmedQuantity}x`}
                              </span>
                            </Typography>
                          </div>
                        );
                      })}
                    <button
                      className="bg-red-400 font-semibold rounded-2xl p-2 w-full mt-4 shadow-lg hover:bg-red-300 transition-all duration-300 ease-in-out"
                      onClick={() => handleCompleted(item)}
                    >
                      Mark as Completed
                    </button>
                    <Link
                      to={{ pathname: "/chat", state: { u } }}
                      className="absolute right-4 bottom-[70px] p-2 bg-primary rounded-full text-sm animate-bounce hover:bg-[#338dc2]"
                      title="Chat"
                    >
                      <MarkUnreadChatAltIcon style={{ fontSize: "20px" }} />
                    </Link>
                  </AccordionDetails>
                </Accordion>
              );
            }
          }
        })}
      <h3 className="text-xl text-[#5FB4B8] mb-5">In Queue</h3>

      {queue.length > 0 ? (
        queue.map((item) => {
          if (item.status === "In Queue") {
            // Find the user object that matches the account id

            const u = users.find(
              (u) =>
                u &&
                u.account &&
                u.account?.accountId === item.customer?.accountId
            );

            {
              /* const u = item.find(
              (itm) => itm.vendor.accountId === user.account.accountId
            ); */
            }
            console.log("U: ", u);

            console.log("Item: ", item.vendor);

            if (u) {
              return (
                <Accordion
                  key={u.account.accountId}
                  className="w-full items-center text-white mb-3"
                  style={{ backgroundColor: "#5FB4B8", borderRadius: "20px" }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <div className="flex items-center text-white">
                      <img
                        alt={u.firstName}
                        src={`data:image/jpeg;base64,${u.image}`}
                        className="h-full w-[46px] rounded-full border-2 border-green-400 mr-2"
                      />
                      <div>
                        {u.firstName + " " + u.lastName}
                        <span className="text-[12px] p-[1px] text-green-400 bg-slate-600 block text-center rounded-lg w-[70px]">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails className="text-white relative">
                    {item.details &&
                      item.details.split(";").map((detail, index, array) => {
                        const [itemName, quantity] = detail.split("x");
                        const trimmedItemName = itemName ? itemName.trim() : "";
                        const trimmedQuantity = quantity ? quantity.trim() : "";
                        return (
                          <div key={index}>
                            <Typography className="flex justify-between">
                              {index !== array.length - 1 ? (
                                <span>
                                  {trimmedItemName
                                    .replace(" ", ": ")
                                    .replace("Php", "₱")}
                                </span>
                              ) : (
                                <span className="font-semibold text-sm mt-3 bg-slate-100 border-2 border-green-300 p-1 text-green-400 rounded-md">
                                  {trimmedItemName.split(" ")[0]} ₱
                                  {trimmedItemName.split(" ")[1].substring(3)}
                                </span>
                              )}
                              <span>
                                {index === array.length - 1
                                  ? `${trimmedQuantity}`
                                  : `${trimmedQuantity}x`}
                              </span>
                            </Typography>
                          </div>
                        );
                      })}
                    <button
                      className="bg-green-400 font-semibold rounded-2xl p-2 w-full mt-4 shadow-lg hover:bg-green-300 transition-all duration-300 ease-in-out"
                      onClick={() => handleServeNow(item)}
                    >
                      Serve Now
                    </button>
                    <Link
                      to={{ pathname: "/chat", state: { u } }}
                      className="absolute right-4 bottom-[70px] p-2 bg-primary rounded-full text-sm animate-bounce hover:bg-[#338dc2]"
                      title="Chat"
                    >
                      <MarkUnreadChatAltIcon style={{ fontSize: "20px" }} />
                    </Link>
                  </AccordionDetails>
                </Accordion>
              );
            }
          }
        })
      ) : (
        <div>Waiting for customers...</div>
      )}
    </div>
  );
};

export default Queue;
