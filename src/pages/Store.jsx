import React, { useContext } from "react";
import { UserContext } from "../UserContext"; // Update the path based on your file structure

const Store = () => {
  // Access user data from the context
  const { user, setUser } = useContext(UserContext);

  // Now you can use the user data in your component
  // For example, display the user's name
  return <div>{user ? `Hello, ${user.name}!` : "Not logged in"}</div>;
};

export default Store;
