import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/login")}
      className="text-white text-sm px-5 py-3 rounded hover:opacity-90 transition"
      style={{ backgroundColor: "#00c0d1" }}
    >
      Đăng nhập
    </button>
  );
};

export default LoginButton;
