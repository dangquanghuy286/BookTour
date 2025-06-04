import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setToken } from "../../utils/authServices";

const RedirectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const user_name = query.get("user_name");
    const email = query.get("email");
    const userId = query.get("userId");

    if (token && user_name) {
      setToken(token);
      localStorage.setItem("user_name", user_name);
      if (email) localStorage.setItem("email", email);
      if (userId && userId !== "null" && !isNaN(userId)) {
        localStorage.setItem("user_id", userId);
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, [location, navigate]);

  return <p>Đang xử lý đăng nhập...</p>;
};

export default RedirectPage;
