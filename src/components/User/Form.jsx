import { NavLink } from "react-router-dom";
import EditButton from "../Button/EditButton";

function Form({ formData, onChange, onSubmit }) {
  return (
    <div className="w-full p-8 md:w-1/2 dark:text-white">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="lbl_title block">
            Tên Admin <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={onChange}
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
          />
        </div>
        <div>
          <label className="lbl_title block">
            Tên đăng nhập <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={onChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-cyan-300 focus:outline-none cursor-not-allowed"
            readOnly
            disabled
          />
        </div>
        <div>
          <label className="lbl_title block">Ngày sinh</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={onChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-cyan-300 focus:outline-none accent-cyan-500"
          />
        </div>

        <div>
          <label className="lbl_title block">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            readOnly
            onChange={onChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-cyan-300 focus:outline-none cursor-not-allowed"
          />
        </div>
        <div>
          <label className="lbl_title block">Số điện thoại</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={onChange}
            placeholder="Ví dụ: 0987654321"
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
          />
        </div>
        <div>
          <label className="lbl_title block">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
          />
        </div>
        <div className="mt-2 text-right">
          <NavLink
            to="/user/changepassword"
            className="text-[#019fb5] hover:underline"
          >
            Thay đổi mật khẩu
          </NavLink>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <EditButton type="submit">Cập nhật</EditButton>
        </div>
      </form>
    </div>
  );
}

export default Form;
