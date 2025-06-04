export const removeVietnameseTones = (str) => {
  return str
    .normalize("NFD") // Tách chữ và dấu
    .replace(/[\u0300-\u036f]/g, "") // Xoá dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};
