// HeaderImg.js
import React, { useEffect, useState } from "react";
import { getDataBanner } from "../../services/BannerService";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSniper";
import BannerSlider from "../BannerSlider";
import ImgDefault from "../../assets/Img/banner-default.png";

const DEFAULT_BANNERS = [
  {
    id: "default-1",
    imageUrl: ImgDefault,
    title: "Banner mặc định 1",
    link: "/",
  },
];

const HANNER_POSITION = "SIDEBAR"; // đổi thành "HEADER" nếu đây thực sự là banner header

const HeaderImg = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchApi = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getDataBanner();

        if (!isMounted) return;

        if (res.status === 200) {
          const now = new Date();
          const activeBanners = (res.data?.content || []).filter(
            (banner) =>
              banner.isActive &&
              new Date(banner.startDate) <= now &&
              new Date(banner.endDate) >= now &&
              banner.position?.toUpperCase() === HANNER_POSITION,
          );

          setBanners(
            activeBanners.length > 0 ? activeBanners : DEFAULT_BANNERS,
          );
        } else {
          // Lỗi từ API vẫn nên hiện banner mặc định thay vì để trắng trang
          setBanners(DEFAULT_BANNERS);
        }
      } catch (err) {
        if (!isMounted) return;
        console.error("Lỗi khi tải banner:", err);
        setBanners(DEFAULT_BANNERS);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchApi();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative w-full">
      {loading ? (
        <LoadingSpinner message="Đang tải banner!" />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <BannerSlider banners={banners} />
      )}
    </div>
  );
};

export default HeaderImg;
