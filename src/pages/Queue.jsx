// Queue.js
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/api/getAllTransactions")
      .then((response) => {
        setQueue(response.data);
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "73vh",
      }}
    >
      <h3>Now Serving</h3>
      {queue.length > 0 &&
        queue.map((item) => {
          if (item.status === "Now Serving") {
            // Find the user object that matches the account id
            const u = users.find(
              (u) => u.account.accountId === item.customer.accountId
            );
            if (u) {
              return <div key={u.accountId}>{u.firstName}</div>;
            }
          }
        })}
      <h3>In Queue</h3>

      {queue.length > 0 &&
        queue.map((item) => {
          if (item.status === "In Queue") {
            // Find the user object that matches the account id
            const u = users.find(
              (u) => u.account.accountId === item.customer.accountId
            );
            if (u) {
              return <div key={u.accountId}>{u.firstName}</div>;
            }
          } else {
            return <div>Waiting for customers...</div>;
          }
        })}
    </div>
  );
};

export default Queue;
