import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const userAuthContext = createContext();

const LocalStorageProvider = ({ children }) => {
  const [userToken, setUserToken] = useLocalStorage("userToken", "");
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [username, setUsername] = useLocalStorage("username", "");
  const [userRole, setUserRole] = useLocalStorage("userRole", "");
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);

  return (
    <userAuthContext.Provider
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
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export default LocalStorageProvider;
