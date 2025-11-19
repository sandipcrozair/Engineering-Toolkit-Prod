import { Eraser } from "lucide-react";
import React from "react";

export function InputCard({
  title,
  subtitle,
  icon: Icon,
  gradient,
  fields,
  inputs,
  onInputChange,
  onInputFocus,
  validationErrors,
  focusColor = "focus:ring-orange-500",
  clearAll
}) {
  // Check if all inputs are empty to determine if button should be disabled
  const isClearAllDisabled = React.useMemo(() => {
    return Object.values(inputs).every(value => 
      value === '' || value === null || value === undefined || value === 0
    );
  }, [inputs]);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg sm:shadow-xl lg:shadow-2xl border border-gray-100 hover:shadow-md sm:hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div
          className={`p-2 sm:p-3 ${gradient} rounded-xl sm:rounded-2xl shadow-lg`}
        >
          <Icon className="text-white w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="md:text-md lg:text-lg xl:text-xl font-bold text-gray-800 leading-tight">
            {title}
          </h3>
          <p className="text-gray-500 text-xs sm:text-base lg:text-md xl:text-lg mt-1">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="space-y-4 sm:space-y-6">
        {fields.map(({ field, label, unit, icon: FieldIcon, iconColor }) => (
          <div key={field} className="group">
            <label className="block text-gray-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base lg:text-md flex items-center gap-2">
              {/* <FieldIcon className={`${iconColor} w-4 h-4 sm:w-5 sm:h-5`} /> */}
              <span className="break-words">{label}</span>
              <span className="text-gray-400 font-normal ml-1 text-xs sm:text-sm lg:text-base whitespace-nowrap">
                ({unit})
              </span>
            </label>
            <input
              type="number"
              name={field}
              value={inputs[field]}
              onChange={onInputChange}
              onFocus={onInputFocus}
              placeholder={`Enter ${label.toLowerCase()}`}
              className={`w-full border-2 rounded-xl sm:rounded-2xl p-3 sm:p-3 text-sm sm:text-base md:text-md ${focusColor} focus:border-orange-500 transition-all duration-200 bg-gray-50/50 hover:bg-white group-hover:shadow-sm ${
                validationErrors[field]
                  ? "border-red-300 bg-red-50/50"
                  : "border-gray-200"
              }`}
            />
            {validationErrors[field] && (
              <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1">
                {/* <span>⚠</span> */}
                {validationErrors[field]}
              </p>
            )}
          </div>
        ))}
      </div>
      {/* Clear Button */}

      {title === "Find Unknown" && (
        <div className="flex justify-end mt-6">
          <button
            onClick={clearAll}
            disabled={isClearAllDisabled}
            className={`group relative border-2 font-semibold p-2 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 min-w-[100px] text-xs  md:text-sm ${
              isClearAllDisabled
                ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-50 border-red-200 hover:bg-red-100 text-red-700 hover:text-red-800 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-95"
            }`}
          >
            {/* Subtle shimmer effect - only when not disabled */}
            {!isClearAllDisabled && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            )}
            
            <Eraser className={`w-3 h-3 sm:w-4 sm:h-4 relative z-10 transition-transform duration-300 ${
              isClearAllDisabled 
                ? "text-gray-400" 
                : "text-red-600 group-hover:rotate-12"
            }`} />
            <span className="relative z-10">Clear All</span>
          </button>
        </div>
      )}
    </div>
  );
}