export const toSlug = (str) => {
  // Chuyển về chữ thường và loại bỏ dấu
  str = str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Thay thế các ký tự tiếng Việt
  str = str
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
    .replace(/[èéẹẻẽêềếệểễ]/g, "e")
    .replace(/[ìíịỉĩ]/g, "i")
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
    .replace(/[ùúụủũưừứựửữ]/g, "u")
    .replace(/[ỳýỵỷỹ]/g, "y")
    .replace(/[đ]/g, "d");

  // Xóa ký tự không phải chữ cái, số, hoặc dấu cách
  str = str.replace(/[^a-z0-9\s-]/g, "");

  // Thay dấu cách bằng dấu gạch ngang và xóa khoảng trắng thừa
  str = str.trim().replace(/\s+/g, "-");

  return str;
};
