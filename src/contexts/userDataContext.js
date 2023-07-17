import React, { createContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const userDataContext = createContext();

const LocalStorageProvider = ({ children }) => {
  const [userToken, setUserToken] = useLocalStorage("userToken", "");
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [username, setUsername] = useLocalStorage("username", "");
  const [userRole, setUserRole] = useLocalStorage("userRole", "");
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [expiryDate, setExpiryDate] = useLocalStorage("expiryDate", "");

  const [expiryCheckPerformed, setExpiryCheckPerformed] = useState(false);

  useEffect(() => {
    if (!expiryCheckPerformed) {
      const currentDate = new Date();
      const expiryDateObj = new Date(expiryDate);

      if (currentDate > expiryDateObj) {
        setUserToken("");
        setUserId("");
        setUsername("");
        setUserRole("");
        setIsLoggedIn(false);
        setExpiryDate("");
      }
      setExpiryCheckPerformed(true);
    }
  }, [expiryDate]);

  return (
    <userDataContext.Provider
      value={{
        userToken,
        setUserToken,
        userId,
        setUserId,
        username,
        setUsername,
        userRole,
        setUserRole,
        isLoggedIn,
        setIsLoggedIn,
        expiryDate,
        setExpiryDate,
      }}
    >
      {children}
    </userDataContext.Provider>
  );
};

export default LocalStorageProvider;
