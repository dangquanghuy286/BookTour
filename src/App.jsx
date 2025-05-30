import React, { useEffect } from "react";
import AllRoute from "./components/AllRoute";
import { ThemeProvider } from "./contexts/theme";
import AOS from "aos";
import "aos/dist/aos.css"; // Nhập file CSS của AOS

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Thời gian hiệu ứng (ms)
      once: true, // Hiệu ứng chỉ chạy một lần khi cuộn
    });
  }, []); // Mảng rỗng đảm bảo AOS chỉ khởi tạo một lần

  return (
    <ThemeProvider storageKey="theme" defaultTheme="light">
      <AllRoute />
    </ThemeProvider>
  );
}

export default App;
