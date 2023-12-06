import React, { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Check if the item is the string "undefined" or null
      if (item === "undefined" || item === null) {
        return initialValue;
      } else {
        try {
          // Attempt to parse the item
          return JSON.parse(item);
        } catch (parseError) {
          // If parsing fails, log the error and use the initial value
          console.error("Parsing error in useLocalStorage:", parseError);
          return initialValue;
        }
      }
    } catch (error) {
      // Log any other errors and return the initial value
      console.error("Error in useLocalStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      // Convert the value to a JSON string and store it
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (error) {
      // Log any errors encountered during storage
      console.error("Error setting localStorage in useLocalStorage:", error);
    }
  };

  return [storedValue, setValue];
};



export const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
