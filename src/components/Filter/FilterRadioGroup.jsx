const FilterRadioGroup = ({
  label,
  icon,
  options,
  name,
  onChange,
  selectedValue,
}) => (
  <div className="group">
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
      <div className="p-1.5 rounded-lg bg-[#00c0d1]/10">{icon}</div>
      {label}
    </label>
    <div className="space-y-3">
      {options.map((opt, idx) => (
        <label
          key={idx}
          className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[#00c0d1]/5 transition group/item"
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={selectedValue === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
              selectedValue === opt.value
                ? "border-[#00c0d1]"
                : "border-gray-300 group-hover/item:border-[#00c0d1]"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full bg-[#00c0d1] transition-opacity ${
                selectedValue === opt.value
                  ? "opacity-100"
                  : "opacity-0 group-hover/item:opacity-100"
              }`}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover/item:text-[#00c0d1]">
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  </div>
);
export default FilterRadioGroup;
