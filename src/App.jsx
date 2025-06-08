import React, { useEffect } from "react";
import AllRoute from "./components/AllRoute";
import { ThemeProvider } from "./contexts/theme";
import AOS from "aos";
import "aos/dist/aos.css";
import { StoreProvider } from "./contexts/storeUser";
import { useDispatch } from "react-redux";
import { checkLogin } from "./actions/loginReducers";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Kiểm tra xem có phải callback từ OAuth không
    const urlParams = new URLSearchParams(window.location.search);
    const oauthToken = urlParams.get("token");
    const oauthUserId = urlParams.get("user_id");

    if (oauthToken && oauthUserId) {
      // Đây là callback từ OAuth, không cần kiểm tra localStorage
      // Component OAuthCallback sẽ xử lý
      return;
    }

    // Khởi tạo Redux state từ localStorage cho trường hợp bình thường
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(checkLogin(true));
    } else {
      dispatch(checkLogin(false));
    }
  }, [dispatch]);

  return (
    <StoreProvider>
      <ThemeProvider storageKey="theme" defaultTheme="light">
        <AllRoute />
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
