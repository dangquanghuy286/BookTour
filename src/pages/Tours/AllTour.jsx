/* eslint-disable no-unused-vars */
import React from "react";
import useNewTourFilterSort from "../../hooks/useNewTourFilterSort";
import Filter from "../../components/Tour/Filter";
import LoadingSpinner from "../../components/LoadingSniper";
import ErrorMessage from "../../components/ErrorMessage";
import PlacesCard from "../../components/Card/PlacesCard";
import EntriesFilter from "../../components/Pagination";
import NoPage from "../../components/NoPage/NoPage";

const AllTour = () => {
  const {
    filters,
    handleFilterChange,
    resetFilters,
    tours,
    loading,
    error,
    totalPages,
    currentPage,
    handlePageChange,
  } = useNewTourFilterSort();

  return (
    <div className="py-4 sm:py-6 md:py-8 lg:py-10 dark:bg-slate-900 bg-white dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <h1
          className="tour_tittle py-2 pl-3 my-4 sm:my-6 md:my-8 text-xl sm:text-2xl md:text-3xl font-bold text-left border-l-8 border-b-blue-300 text-[#00c0d1]"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Khám Phá Kho Báu Việt Nam Cùng GoViet
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Bộ lọc */}
          <div className="lg:w-1/4">
            <Filter
              onFilterChange={handleFilterChange}
              totalResults={tours.length}
            />
          </div>

          {/* Danh sách tour */}
          <div className="lg:w-3/4">
            {loading ? (
              <LoadingSpinner message="Đang tải danh sách tour..." />
            ) : error ? (
              <ErrorMessage error={error} />
            ) : tours.length === 0 ? (
              <NoPage />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 min-w-0">
                {tours.map((tour, index) => (
                  <div
                    key={tour.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    data-aos-duration="600"
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

            {/* Phân trang */}
            {totalPages > 1 && (
              <div className="mt-6">
                <EntriesFilter
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTour;
