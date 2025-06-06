import { Navigate, Outlet } from "react-router-dom";
import Layout from "../../Layout";

function PrivateRoutes() {
  const token = localStorage.getItem("token");
  if (token) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
}
export default PrivateRoutes;
