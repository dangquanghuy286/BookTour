// HeaderImg.js
import React, { useEffect, useState } from "react";
import { getDataBanner } from "../../services/BannerService";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSniper";
import BannerSlider from "../BannerSlider";

const DEFAULT_BANNERS = [
  {
    id: "default-1",
    imageUrl:
      "https://vn.freepik.com/psd-mien-phi/mau-banner-bia-facebook-ve-du-lich-va-du-lich_417538029.htm#fromView=keyword&page=1&position=1&uuid=cc3a807c-cadd-45b0-ab3e-62078fa56b22&query=Tour+banner", // thay bằng ảnh mặc định của bạn
    title: "Banner mặc định 1",
    link: "/",
  },
];

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
              new Date(banner.endDate) >= new Date() &&
              banner.position?.toUpperCase() === "SIDEBAR",
          );
          setBanners(
            activeBanners.length > 0 ? activeBanners : DEFAULT_BANNERS,
          );
        } else {
          setError(res.data?.error || "Không thể tải banner!");
        }
      } catch (error) {
        setBanners(DEFAULT_BANNERS); // lỗi cũng hiện banner mặc định
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
      ) : (
        <BannerSlider banners={banners} />
      )}
    </div>
  );
};

export default HeaderImg;
