// HeaderImg.js
import React, { useEffect, useState } from "react";
import { getDataBanner } from "../../services/BannerService";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSniper";
import BannerSlider from "../BannerSlider";

const HeaderImg = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getDataBanner();
        if (res.status === 200) {
          const activeBanners = res.data.content.filter(
            (banner) =>
              banner.isActive &&
              new Date(banner.startDate) <= new Date() &&
              new Date(banner.endDate) >= new Date()
          );
          setBanners(activeBanners || []);
        } else {
          setError(res.data?.error || "Không thể tải banner!");
        }
      } catch (error) {
        setError(error.message || "Đã xảy ra lỗi!");
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  return (
    <div className="relative w-full">
      {loading ? (
        <LoadingSpinner message="Đang tải banner!" />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : banners.length === 0 ? (
        <ErrorMessage error="Không tìm thấy banner nào" isWarning={true} />
      ) : (
        <BannerSlider banners={banners} />
      )}
    </div>
  );
};

export default HeaderImg;
