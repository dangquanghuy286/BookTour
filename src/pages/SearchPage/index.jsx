import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import EntriesFilter from "../../components/Pagination";
import { getDataTour } from "../../services/TourService";
import PlacesCard from "../../components/Card/PlacesCard";
import LoadingSpinner from "../../components/LoadingSniper";
import ErrorMessage from "../../components/ErrorMessage";
import NoPage from "../../components/NoPage/NoPage";
import { destinations } from "../../contexts/TourContext";

const priceMap = {
  "1.000.000 - 3.000.000 Vnd": { min: 1000000, max: 3000000 },
  "3.000.000 - 6.000.000 Vnd": { min: 3000000, max: 6000000 },
  "6.000.000 - 8.000.000 Vnd": { min: 6000000, max: 8000000 },
  "8.000.000 - 10.000.000 Vnd": { min: 8000000, max: 10000000 },
};

const durationMap = {
  "1 ngày": "1 ngày",
  "2 ngày 1 đêm": "2 ngày 1 đêm",
  "3 ngày 2 đêm": "3 ngày 2 đêm",
  "4 ngày 3 đêm": "4 ngày 3 đêm",
  "5 ngày 4 đêm": "5 ngày 4 đêm",
  "6 ngày 5 đêm": "6 ngày 5 đêm",
};

const TourSearch = () => {
  const [searchParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 9; // Số tour mỗi trang

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        setError(null);

        const title = searchParams.get("title") || "";
        const destination = searchParams.get("destination") || "";
        const duration = searchParams.get("duration") || "";
        const priceRange = searchParams.get("priceRange") || "";
        const departurePoint = searchParams.get("departurePoint") || "";

        // Kiểm tra destination hợp lệ
        const validDestinations = destinations.map((d) => d.value);
        if (destination && !validDestinations.includes(destination)) {
          setError("Điểm đến không hợp lệ.");
          setTours([]);
          setTotalPages(0);
          setLoading(false);
          return;
        }

        // Ánh xạ bộ lọc
        const priceObj = priceMap[priceRange] || {};
        const durationValue = durationMap[duration] || null;
        const { min: priceMin, max: priceMax } = priceObj;

        // Tạo object filters cho getDataTour
        const filters = {
          title: title || null,
          destination: destination || null,
          priceMin: priceMin || null,
          priceMax: priceMax || null,
          duration: durationValue || null,
          departurePoint: departurePoint || null,
        };

        const res = await getDataTour(currentPage, limit, filters);
        if (res.status === 200) {
          setTours(res.data.tours || []);
          setTotalPages(res.data.totalPages || 1);
        } else {
          setError(res.data || "Không tìm thấy tour.");
          setTours([]);
          setTotalPages(0);
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi tìm kiếm tour.");
        console.error("Lỗi khi tìm kiếm tour:", err);
        setTours([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [searchParams, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-8 bg-white dark:bg-slate-900 dark:text-white">
      <div className="container mx-auto px-4">
        <h1 className="pl-3 my-6 sm:my-8 text-2xl sm:text-3xl font-bold text-left border-l-8 border-[#00c0d1] text-[#00c0d1]">
          Tour tìm thấy
        </h1>
        {loading ? (
          <LoadingSpinner message="Đang tải danh sách tour..." />
        ) : error ? (
          <ErrorMessage isWarning={false} message={error} />
        ) : tours.length === 0 ? (
          <NoPage />
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour, index) => (
              <div
                key={tour.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="600"
              >
                <PlacesCard item={tour} />
              </div>
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <EntriesFilter
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default TourSearch;
