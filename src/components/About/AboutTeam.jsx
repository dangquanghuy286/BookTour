/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getDataGuide } from "../../services/GuideService";
import LoadingSpinner from "../LoadingSniper";
import ErrorMessage from "../ErrorMessage";
import icons from "../../utils/icons";
import EntriesFilter from "../Pagination";

const { MdEmail, FaFacebook } = icons;

const AboutTeam = ({
  showPagination = true,
  title = "Những Hướng Dẫn Viên Du Lịch Giàu Kinh Nghiệm Của Chúng Tôi",
  guides = null,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 8;

  const fetchApi = async (page = 0) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getDataGuide(page, limit);
      if (res.status !== 200) {
        throw new Error(
          res.data?.error || "Không tìm thấy hướng dẫn viên nào!"
        );
      }
      setData(res.data.guides || []);
      setTotalPages(res.data.totalPages || 0);
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi khi tải dữ liệu!");
      setData([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (guides) {
      setData(guides);
      setTotalPages(1);
      setError(null);
      setLoading(false);
    } else {
      fetchApi(currentPage);
    }
  }, [guides, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div
      className="bg-white dark:bg-slate-900 py-8"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="container mx-auto px-4">
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00c0d1] mt-4 mb-8 border-l-8 border-[#00c0d1] pl-3"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          {title}
        </h2>

        {loading ? (
          <LoadingSpinner message="Đang tải hướng dẫn viên..." />
        ) : error ? (
          <ErrorMessage isWarning={false} message={error} />
        ) : data.length === 0 ? (
          <p className="text-center text-gray-500">
            Không có hướng dẫn viên nào!
          </p>
        ) : (
          <div className="grid items-center justify-center grid-cols-1 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((member, index) => (
              <div
                key={member.guideId}
                className="w-[240px] bg-white dark:bg-slate-950 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.16)] overflow-hidden transform transition duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="600"
              >
                <div className="p-3">
                  <div className="w-full h-[280px] mx-auto">
                    <img
                      src={member.photo}
                      alt={member.fullName}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) =>
                        (e.target.src = "/path/to/fallback-image.jpg")
                      }
                    />
                  </div>
                </div>
                <div className="p-3 text-center">
                  <h1 className="text-base font-semibold text-[#00c0d1]">
                    {member.fullName}
                  </h1>
                  <div className="flex justify-center space-x-4 mt-2 text-[#00c0d1]">
                    <a
                      href={`mailto:${member.gmailLink}`}
                      className="hover:text-[#008c9e] transition-colors"
                    >
                      <MdEmail className="text-xl" />
                    </a>
                    <a
                      href={member.databaseLink}
                      className="hover:text-[#008c9e] transition-colors"
                    >
                      <FaFacebook className="text-xl" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showPagination && !guides && totalPages > 1 && (
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

export default AboutTeam;
