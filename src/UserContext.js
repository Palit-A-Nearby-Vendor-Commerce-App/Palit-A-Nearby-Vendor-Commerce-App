import React, { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const updateUser = async (userId, formData) => {
    try {
      const response = await axios.put(
        `/api/updateUserById/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const updateAccount = async (accountId, accountData) => {
    try {
      await axios.put(`/api/editAccountById/${accountId}`, accountData);
      setUser({ ...user, account: { ...user.account, ...accountData } });
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const updateLocation = async (locationId, locationData) => {
    try {
      await axios.put(`/api/updateLocationById/${locationId}`, locationData);
      setUser({ ...user, location: { ...user.location, ...locationData } });
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  const updateStore = async (storeId, storeData) => {
    try {
      await axios.put(`/api/updateStoreById/${storeId}`, storeData);
      setUser({ ...user, store: { ...user.store, ...storeData } });
    } catch (error) {
      console.error("Error updating store:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
