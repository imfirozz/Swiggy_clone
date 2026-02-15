import React from "react";

export function Veg_Non_filter({ selected, setSelected }) {
  return (
    <div className="w-full mt-6 sm:mt-8 mb-6 sm:mb-8">
      <div className="flex items-center gap-4 sm:gap-6">
        {/* VEG TOGGLE */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setSelected(selected === "veg" ? null : "veg")}
        >
          <div
            className={`relative w-12 h-7 rounded-full transition-colors duration-200
              ${selected === "veg" ? "bg-green-700" : "bg-gray-300"}
            `}
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 bg-green-400 rounded-2xl shadow
                transition-transform duration-200
                ${selected === "veg" ? "translate-x-5" : ""}
              `}
            />
          </div>

          <span className="flex items-center gap-1 text-sm rounded-full font-medium"></span>
        </div>

        {/* NON-VEG TOGGLE */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setSelected(selected === "nonveg" ? null : "nonveg")}
        >
          <div
            className={`relative w-12 h-7 rounded-full transition-colors duration-200
              ${selected === "nonveg" ? "bg-red-600" : "bg-gray-300"}
            `}
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 bg-red-400 rounded-full shadow
                transition-transform duration-200
                ${selected === "nonveg" ? "translate-x-5" : ""}
              `}
            />
          </div>

          <span className="flex items-center gap-1 text-sm font-medium"></span>
        </div>
      </div>
    </div>
  );
}
