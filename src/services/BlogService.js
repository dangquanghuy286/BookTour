import { get } from "../utils/requestserver";

export const getBlog = async () => {
  const result = await get("blogs");
  return result;
};
