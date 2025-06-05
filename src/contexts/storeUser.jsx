/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { getInfoUser } from "../services/UserService";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("user_id");

  const fetchApi = async () => {
    try {
      setLoading(true);
      const res = await getInfoUser(userId);
      setUserInfo(res);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu người dùng:", error);
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchApi();
    }
  }, []);

  const refreshUserInfo = () => {
    if (userId) {
      fetchApi();
    }
  };

  return (
    <StoreContext.Provider value={{ userInfo, refreshUserInfo, loading }}>
      {children}
    </StoreContext.Provider>
  );
};
