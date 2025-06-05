/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../contexts/storeUser";
import UserAvatar from "../../components/User/UserAvatar";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { putChangeInfo, putProfileImg } from "../../services/UserService";
import Form from "../../components/User/Form";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSniper";

const UserForm = () => {
  const {
    userInfo,
    refreshUserInfo,
    loading: contextLoading,
  } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    user_name: "",
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    avatar_path: "",
    date_of_birth: "",
  });

  useEffect(() => {
    if (!userInfo || userInfo.status !== 200 || !userInfo.data) {
      setError(
        "Không thể tải dữ liệu người dùng. Vui lòng kiểm tra kết nối hoặc thử lại sau."
      );
      return;
    }

    const data = userInfo.data;
    setFormData({
      id: data.id || "",
      user_name: data.user_name || "",
      full_name: data.full_name || "",
      email: data.email || "",
      phone_number: data.phone_number || "",
      address: data.address || "",
      avatar_path: data.avatar_path || "",
      date_of_birth: data.date_of_birth
        ? new Date(data.date_of_birth).toISOString().split("T")[0]
        : "",
    });

    if (data.avatar_path?.startsWith("http")) {
      setTempImage(data.avatar_path);
    } else {
      Swal.fire("Lỗi", "Đường dẫn ảnh không hợp lệ", "error");
    }
  }, [userInfo]);

  // Cleanup blob URL khi tempImage thay đổi hoặc component unmount
  useEffect(() => {
    return () => {
      if (tempImage && tempImage.startsWith("blob:")) {
        URL.revokeObjectURL(tempImage);
      }
    };
  }, [tempImage]);

  // Xử lý khi chọn ảnh mới: tạo blob URL mới và cleanup blob cũ
  const handleImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (tempImage && tempImage.startsWith("blob:")) {
        URL.revokeObjectURL(tempImage);
      }
      setSelectedImageFile(file);
      setTempImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isValidPhoneNumber = (phone) => {
    const regex = /^(0[2|3|5|7|8|9])+([0-9]{8})$/;
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userId = localStorage.getItem("user_id");

    try {
      if (selectedImageFile) {
        const formDataImage = new FormData();
        formDataImage.append("avatar", selectedImageFile);

        const avatarResponse = await putProfileImg(userId, formDataImage);
        if (avatarResponse.status === 200 && avatarResponse.data.avatar_path) {
          setFormData((prev) => ({
            ...prev,
            avatar_path: avatarResponse.data.avatar_path,
          }));
          setTempImage(avatarResponse.data.avatar_path);
          await Swal.fire(
            "Thành công",
            "Cập nhật ảnh đại diện thành công",
            "success"
          );
          refreshUserInfo();
        } else {
          Swal.fire("Lỗi", "Cập nhật ảnh đại diện thất bại", "error");
        }
      }

      if (!isValidPhoneNumber(formData.phone_number)) {
        Swal.fire(
          "Lỗi",
          "Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng!",
          "error"
        );
        setLoading(false);
        return;
      }

      const adminData = {
        email: formData.email,
        phone_number: formData.phone_number,
        address: formData.address,
        full_name: formData.full_name,
        date_of_birth: formData.date_of_birth,
      };

      const infoResponse = await putChangeInfo(userId, adminData);
      if (infoResponse.status === 200) {
        await Swal.fire("Thành công", "Thông tin đã được cập nhật", "success");
        refreshUserInfo();
      } else {
        Swal.fire("Lỗi", "Cập nhật thông tin thất bại", "error");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại!";
      Swal.fire("Lỗi", message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <h1
          className="tour_tittle py-2 pl-3 my-6 sm:my-8 text-2xl sm:text-3xl font-bold text-left border-l-8 border-b-blue-300 text-[#00c0d1]"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Thông Tin Cá Nhân
        </h1>

        {contextLoading || loading ? (
          <LoadingSpinner message="Đang tải dữ liệu..." />
        ) : (
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <UserAvatar
              avatar={tempImage}
              name={formData.user_name}
              handleImgChange={handleImgChange}
            />
            <Form
              formData={formData}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserForm;
