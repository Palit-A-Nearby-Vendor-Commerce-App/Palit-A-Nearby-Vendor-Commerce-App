import React, { createContext, useState, useEffect } from "react";

// Create a context for the user data
export const UserContext = createContext();

// Create a custom hook to store and retrieve the user data from localstorage
const useLocalStorage = (key, initialValue) => {
  // Get the stored value from localstorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Set the value and update the localstorage
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// Create a provider component to wrap the app and provide the user data
export const UserProvider = ({ children }) => {
  // Use the custom hook to store and retrieve the user data
  const [user, setUser] = useLocalStorage("user", null);

  // Return the provider component with the user data and the setter function
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
