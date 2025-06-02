const FilterSelect = ({ label, icon, options, onChange }) => (
  <div className="group">
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
      <div className="p-1.5 rounded-lg bg-[#00c0d1]/10">{icon}</div>
      {label}
    </label>
    <select
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-[#00c0d1]/20 focus:border-[#00c0d1] transition"
    >
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default FilterSelect;
