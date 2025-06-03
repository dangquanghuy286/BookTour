import { useEffect, useState } from "react";
import { getDataTourPopular } from "../../services/TourService";
import LoadingSpinner from "../LoadingSniper";
import ErrorMessage from "../ErrorMessage";
import PlacesCard from "../Card/PlacesCard";

const TourPopuLar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getDataTourPopular();

        if (res.status === 200) {
          setData(res.data || []);
        } else {
          setError(res.data?.error || "Không thể tải danh sách tour phổ biến.");
        }
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi khi tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

        {loading ? (
          <LoadingSpinner message="Đang tải danh sách tour..." />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : data.length === 0 ? (
          <ErrorMessage error="Không tìm thấy tour nào." isWarning={true} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {data.map((tour, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="600"
                key={tour.id}
              >
                <PlacesCard
                  item={tour}
                  booking={true}
                  size="default"
                  left={false}
                  star={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TourPopuLar;
