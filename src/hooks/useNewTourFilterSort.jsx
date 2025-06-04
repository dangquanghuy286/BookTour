import { useEffect, useState } from "react";
import { getDataTour } from "../services/TourService";

// Ánh xạ các giá trị bộ lọc cho API
const regionMap = {
  "Miền Bắc": "NORTH",
  "Miền Trung": "CENTRAL",
  "Miền Nam": "SOUTH",
  "": null, // Tất cả khu vực
};

const durationMap = {
  "1 ngày": "1 ngày",
  "2 ngày 1 đêm": "2 ngày 1 đêm",
  "3 ngày 2 đêm": "3 ngày 2 đêm",
  "4 ngày 3 đêm": "4 ngày 3 đêm",
  "5 ngày 4 đêm": "5 ngày 4 đêm",
  "6 ngày 5 đêm": "6 ngày 5 đêm",
  "": null, // Tất cả thời gian
};

const priceMap = {
  "Dưới 1 triệu": { min: 0, max: 1000000 },
  "1-3 triệu": { min: 1000000, max: 3000000 },
  "3-5 triệu": { min: 3000000, max: 5000000 },
  "5-10 triệu": { min: 5000000, max: 10000000 },
  "Trên 10 triệu": { min: 10000000, max: 50000000 },
  "": { min: 0, max: 10000000 }, // Mặc định
};

const tagMap = {
  Economy: "Economy",
  Standard: "Standard",
  Premium: "Premium",
  "": null, // Tất cả tag
};

const useNewTourFilterSort = () => {
  const [filters, setFilters] = useState({
    region: "",
    priceRange: { min: 0, max: 10000000, label: "" },
    duration: "",
    sortBy: "newest",
    rating: 0,
    tag: "", // Thêm trường tag
  });
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // Hàm cập nhật bộ lọc
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(0); // Reset về trang 1 khi thay đổi bộ lọc
  };

  // Hàm reset bộ lọc
  const resetFilters = () => {
    const defaultFilters = {
      region: "",
      priceRange: { min: 0, max: 10000000, label: "" },
      duration: "",
      sortBy: "newest",
      rating: 0,
      tag: "", // Reset tag
    };
    setFilters(defaultFilters);
    setCurrentPage(0); // Reset về trang 1
    return defaultFilters;
  };

  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      setError(null);
      try {
        // Ánh xạ các giá trị bộ lọc
        const region = regionMap[filters.region] || null;
        const { min: priceMin, max: priceMax } = filters.priceRange.label
          ? priceMap[filters.priceRange.label]
          : filters.priceRange;
        const duration = durationMap[filters.duration] || null;
        const starRating = filters.rating > 0 ? filters.rating : null;
        const tag = tagMap[filters.tag] || null; // Ánh xạ tag

        // Xây dựng object filters cho API
        const apiFilters = {
          region: region,
          priceMin: priceMin > 0 ? priceMin : null,
          priceMax: priceMax < 10000000 ? priceMax : null,
          duration: duration,
          starRating: starRating,
          tag: tag, // Thêm tag vào API filters
        };

        // Xử lý sắp xếp
        switch (filters.sortBy) {
          case "newest":
            apiFilters.sortBy = "createdAt";
            apiFilters.sortDir = "desc";
            break;
          case "price-low":
            apiFilters.sortBy = "priceAdult";
            apiFilters.sortDir = "asc";
            break;
          case "price-high":
            apiFilters.sortBy = "priceAdult";
            apiFilters.sortDir = "desc";
            break;
          default:
            apiFilters.sortBy = "createdAt";
            apiFilters.sortDir = "desc";
            break;
        }

        const res = await getDataTour(currentPage, 9, apiFilters);
        if (res.status === 200) {
          setTours(res.data.tours || []);
          setTotalPages(res.data.totalPages || 1);
        } else {
          setError(res.data || "Lỗi khi tải danh sách tour.");
          setTours([]);
          setTotalPages(0);
        }
      } catch (err) {
        setError(
          "Lỗi khi tải danh sách tour: " + (err.message || "Unknown error")
        );
        console.error("Lỗi khi lấy dữ liệu tour:", err);
        setTours([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [filters, currentPage]);

  return {
    filters,
    handleFilterChange,
    resetFilters,
    tours,
    loading,
    error,
    totalPages,
    currentPage,
    handlePageChange,
  };
};

export default useNewTourFilterSort;
