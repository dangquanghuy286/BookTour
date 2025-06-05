/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { getInfoUser } from "../services/UserService";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getInfoUser(userId);
        setUserInfo(res);
      } catch (error) {
        console.error("Lỗi!", error);
      }
    };
    if (userId) fetchApi();
  }, [userId]);

  return (
    <StoreContext.Provider value={{ userInfo }}>
      {children}
    </StoreContext.Provider>
  );
};
