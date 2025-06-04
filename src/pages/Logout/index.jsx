import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
const Logout = () => {
  const nav = useNavigate();
  useEffect(() => {
    Swal.fire({
      title: "Xác nhận đăng xuất",
      text: "Bạn có chắc chắn muốn đăng xuất không?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Hủy",
      position: "top",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("email");
        localStorage.removeItem("user_name");

        Swal.fire({
          title: "Đăng xuất",
          text: "Bạn đã đăng xuất thành công.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          position: "top-end",
        });

        setTimeout(() => {
          nav("/");
        }, 2000);
      } else {
        nav(-1);
      }
    });
  }, []);
  return null;
};

export default Logout;
