// components/Contact/Contact.jsx
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { postContact } from "../../services/ContactService";
import ContactInfo from "../../components/Contacts";

function Contact() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const phoneNumber = e.target[2].value;
    const content = e.target[3].value;

    const options = {
      fullName,
      email,
      phoneNumber,
      content,
      checked: false,
    };

    try {
      const res = await postContact(options);
      if (res) {
        Swal.fire({
          title: "Gửi thông tin thành công!",
          background: "#fff9c4",
          color: "#4caf50",
          confirmButtonColor: "#4caf50",
          icon: "success",
          draggable: true,
        });
        e.target.reset(); // Xóa form sau khi gửi thành công
      }
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
      Swal.fire({
        title: "Lỗi!",
        text:
          error.response?.data?.message ||
          "Đã có lỗi xảy ra khi gửi thông tin.",
        background: "#fff9c4",
        color: "#f44336",
        confirmButtonColor: "#f44336",
        icon: "error",
        draggable: true,
      });
    }
  };
  return (
    <div className="flex justify-center items-center py-12 px-5 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        <ContactInfo />

        <div className="bg-white dark:bg-slate-950 p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-[#00c0d1] mb-5">
            Liên hệ với chúng tôi
          </h3>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Họ tên*"
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="email"
              placeholder="Email*"
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="tel"
              placeholder="Số điện thoại*"
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <textarea
              placeholder="Nhập nội dung*"
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded min-h-[100px] resize-y bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            ></textarea>
            <button
              type="submit"
              className="p-3 bg-[#00c0d1] text-white font-semibold rounded hover:bg-[#019fb5] hover:text-white transition"
            >
              Gửi liên hệ của bạn
            </button>
          </form>
        </div>

        <div className="md:col-span-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30694.530030107788!2d108.27202559999999!3d15.918694400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31420fdb3a9b913d%3A0x4561811f610ecc84!2s831!5e0!3m2!1svi!2s!4v1741373446903!5m2!1svi!2s"
            width="100%"
            height="450"
            className="rounded-lg w-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
