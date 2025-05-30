import { getDataTourPopular } from "../../services/TourService";

import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSniper";
import ErrorMessage from "../ErrorMessage";
import CardTourPopular from "./CardTourPopular";

const TourPopuLar = () => {
  const [data, setData] = useState([]); // Khởi tạo là mảng rỗng
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true); // Bắt đầu tải dữ liệu
        setError(null); // Reset lỗi
        const res = await getDataTourPopular(); // Gọi API
        if (res.status === 200) {
          setData(res.data || []); // Lưu dữ liệu vào state
        } else {
          setError(res.data?.error || "Không thể tải danh sách tour phổ biến.");
        }
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi khi tải dữ liệu.");
      } finally {
        setLoading(false); // Kết thúc tải dữ liệu
      }
    };
    fetchApi();
  }, []); // Chỉ chạy một lần khi component mount

  // Hiển thị trạng thái loading
  if (loading) return <LoadingSpinner message="Đang tải danh sách tour..." />;

  // Hiển thị thông báo lỗi nếu có
  if (error) return <ErrorMessage isWarning={false} message={error} />;

  // Hiển thị khi không có dữ liệu
  if (!data || data.length === 0) {
    return (
      <ErrorMessage isWarning={true} message="Không có tour phổ biến nào." />
    );
  }

  return (
    <div className="py-4 sm:py-6 md:py-8 lg:py-10 dark:bg-slate-900 bg-white dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <h1
          className="tour_tittle py-2 pl-3 my-4 sm:my-6 md:my-8 text-xl sm:text-2xl md:text-3xl font-bold text-left border-l-8 border-b-blue-300 text-[#00c0d1]"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Tour Phổ Biến
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {data.map((tour) => (
            <div key={tour.id} data-aos="fade-up" data-aos-delay="100">
              <CardTourPopular tour={tour} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourPopuLar;
