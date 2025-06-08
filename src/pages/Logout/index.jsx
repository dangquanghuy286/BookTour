/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { checkLogin } from "../../actions/loginReducers";
const Logout = () => {
  const nav = useNavigate();
  const disPatch = useDispatch();
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
        localStorage.clear();

        Swal.fire({
          title: "Đăng xuất",
          text: "Bạn đã đăng xuất thành công.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          position: "top-end",
        });
        disPatch(checkLogin(false));
        setTimeout(() => {
          nav("/login");
        }, 2000);
      } else {
        nav(-1);
      }
    });
  }, []);
  return null;
};

export default Logout;
