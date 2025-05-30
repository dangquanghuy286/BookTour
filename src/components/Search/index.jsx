import icons from "../../utils/icons";
const { CiSearch } = icons;
function Search() {
  return (
    <>
      <div className="relative flex items-center justify-center rounded-[5px] px-[10px] cursor-pointer hover:bg-black/5 group transition-all duration-500">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên tour"
          className="h-[48px] w-[48px] max-w-full rounded-full  dark:bg-slate-900 border border-amber-400 dark:text-amber-50 text-black pl-[15px] text-center outline-none transition-all duration-500 ease-in-out group-hover:w-[222px] group-hover:text-left focus:w-[222px] focus:text-left placeholder:text-[#aaa9a9] placeholder:opacity-0 group-hover:placeholder:opacity-80 focus:placeholder:opacity-80"
        />
        <CiSearch className="absolute right-[20px] top-1/2 -translate-y-1/2 w-[24px] h-[24px] dark:text-amber-50 text-gray-500" />
      </div>
    </>
  );
}
export default Search;
