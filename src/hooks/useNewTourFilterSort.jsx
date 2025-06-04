import { useEffect, useState } from "react";
import { getDataTour, getLocations } from "../services/TourService";

const regionMap = {
  "Miền Bắc": "NORTH",
  "Miền Trung": "CENTRAL",
  "Miền Nam": "SOUTH",
  "": null,
};

const durationMap = {
  "1 ngày": "1 ngày",
  "2 ngày 1 đêm": "2 ngày 1 đêm",
  "3 ngày 2 đêm": "3 ngày 2 đêm",
  "4 ngày 3 đêm": "4 ngày 3 đêm",
  "5 ngày 4 đêm": "5 ngày 4 đêm",
  "6 ngày 5 đêm": "6 ngày 5 đêm",
  "": null,
};

const priceMap = {
  "Dưới 1 triệu": { min: 0, max: 1000000 },
  "1-3 triệu": { min: 1000000, max: 3000000 },
  "3-5 triệu": { min: 3000000, max: 5000000 },
  "5-10 triệu": { min: 5000000, max: 10000000 },
  "Trên 10 triệu": { min: 10000000, max: 50000000 },
  "": { min: 0, max: 10000000 },
};

const tagMap = {
  Economy: "Economy",
  Standard: "Standard",
  Premium: "Premium",
  "": null,
};

const useNewTourFilterSort = () => {
  const [filters, setFilters] = useState({
    region: "",
    priceRange: { min: 0, max: 10000000, label: "" },
    duration: "",
    sortBy: "newest",
    rating: 0,
    tag: "",
    departurePoint: "",
    destination: "",
  });
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [locations, setLocations] = useState({
    departurePoints: [],
    destinations: [],
  });

  // Lấy danh sách điểm đi và điểm đến
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await getLocations();
        if (res.status === 200) {
          setLocations({
            departurePoints: res.data.departurePoints,
            destinations: res.data.destinations,
          });
        } else {
          setError(res.data || "Lỗi khi lấy danh sách điểm đi và điểm đến");
        }
      } catch (err) {
        setError("Lỗi khi tải danh sách điểm đi và điểm đến");
        console.error("Lỗi khi lấy locations:", err);
      }
    };

    fetchLocations();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(0);
  };

  const resetFilters = () => {
    const defaultFilters = {
      region: "",
      priceRange: { min: 0, max: 10000000, label: "" },
      duration: "",
      sortBy: "newest",
      rating: 0,
      tag: "",
      departurePoint: "",
      destination: "",
    };
    setFilters(defaultFilters);
    setCurrentPage(0);
    return defaultFilters;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      setError(null);
      try {
        const region = regionMap[filters.region] || null;
        const { min: priceMin, max: priceMax } = filters.priceRange.label
          ? priceMap[filters.priceRange.label]
          : filters.priceRange;
        const duration = durationMap[filters.duration] || null;
        const starRating = filters.rating > 0 ? filters.rating : null;
        const tag = tagMap[filters.tag] || null;
        const departurePoint = filters.departurePoint || null;
        const destination = filters.destination || null;

        // Kiểm tra departurePoint và destination hợp lệ
        if (
          departurePoint &&
          !locations.departurePoints.includes(departurePoint)
        ) {
          setError("Điểm xuất phát không hợp lệ.");
          setTours([]);
          setTotalPages(0);
          setLoading(false);
          return;
        }
        if (destination && !locations.destinations.includes(destination)) {
          setError("Điểm đến không hợp lệ.");
          setTours([]);
          setTotalPages(0);
          setLoading(false);
          return;
        }

        const apiFilters = {
          region: region,
          priceMin: priceMin > 0 ? priceMin : null,
          priceMax: priceMax < 10000000 ? priceMax : null,
          duration: duration,
          starRating: starRating,
          tag: tag,
          departurePoint: departurePoint,
          destination: destination,
        };

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
  }, [filters, currentPage, locations]);

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
    locations, // Trả về locations để component khác có thể sử dụng
  };
};

export default useNewTourFilterSort;
