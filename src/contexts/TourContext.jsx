import VN from "../assets/Img/VietNam.png";
import VJ from "../assets/Img/VJ.png";
import TVLK from "../assets/Img/TVLK.png";
import SGTR from "../assets/Img/SGTR.png";
import IVV from "../assets/Img/IVV.png";
import MT from "../assets/Img/MT.png";
import AGD from "../assets/Img/AGD.png";

export const dataRegion = [
  { displayName: "Miền Bắc", value: "NORTH" },
  { displayName: "Miền Trung", value: "CENTRAL" },
  { displayName: "Miền Nam", value: "SOUTH" },
];

export const company = {
  companyName: "Công ty Du lịch GoViet",
  address: "Quảng Lăng A , Điện Nam Trung ,Điện Bàn ,Quảng Nam",
  phone: "0901234567",
  email: "support@goviet.com",
};
export const data = [
  {
    id: 1,
    logoLink:
      "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Icono-VNA.png",
  },
  {
    id: 2,
    logoLink: SGTR,
  },
  {
    id: 3,
    logoLink: VN,
  },
  {
    id: 4,
    logoLink: VJ,
  },
  {
    id: 5,
    logoLink:
      "https://hoppho.com/wp-content/uploads/2020/07/Logo-Vinpearl-full-color-1-1.png",
  },
  {
    id: 6,
    logoLink:
      "https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg",
  },
  {
    id: 7,
    logoLink:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Expedia_2012_logo.svg/2560px-Expedia_2012_logo.svg.png",
  },
  {
    id: 8,
    logoLink:
      "https://saigonrealestate.vn/wp-content/uploads/2021/08/Muong-Thanh-Group-logo-1.png",
  },
  {
    id: 9,
    logoLink: IVV,
  },
  {
    id: 10,
    logoLink: TVLK,
  },
  {
    id: 11,
    logoLink: MT,
  },
  {
    id: 12,
    logoLink: AGD,
  },
];
export const durations = [
  { value: "", label: "Chọn Ngày" },
  { value: "1 ngày", label: "1 ngày" },
  { value: "2 ngày 1 đêm", label: "2 ngày 1 đêm" },
  { value: "3 ngày 2 đêm", label: "3 ngày 2 đêm" },
  { value: "4 ngày 3 đêm", label: "4 ngày 3 đêm" },
  { value: "5 ngày 4 đêm", label: "5 ngày 4 đêm" },
  { value: "6 ngày 5 đêm", label: "6 ngày 5 đêm" },
];

// Dữ liệu cho các tùy chọn lọc
export const regions = ["Tất cả khu vực", "Miền Bắc", "Miền Trung", "Miền Nam"];

export const sortOptions = [
  { value: "newest", label: "Mới nhất" },
  { value: "price-low", label: "Giá thấp đến cao" },
  { value: "price-high", label: "Giá cao đến thấp" },
];

export const priceRanges = [
  { label: "Dưới 1 triệu", min: 0, max: 1000000 },
  { label: "1-3 triệu", min: 1000000, max: 3000000 },
  { label: "3-5 triệu", min: 3000000, max: 5000000 },
  { label: "5-10 triệu", min: 5000000, max: 10000000 },
  { label: "Trên 10 triệu", min: 10000000, max: 50000000 },
];
export const prices = [
  { value: "", label: "Chọn Giá" },
  { value: "1.000.000 - 3.000.000 Vnd", label: "1.000.000 - 3.000.000 Vnd" },
  { value: "3.000.000 - 6.000.000 Vnd", label: "3.000.000 - 6.000.000 Vnd" },
  { value: "6.000.000 - 8.000.000 Vnd", label: "6.000.000 - 8.000.000 Vnd" },
  { value: "8.000.000 - 10.000.000 Vnd", label: "8.000.000 - 10.000.000 Vnd" },
];
