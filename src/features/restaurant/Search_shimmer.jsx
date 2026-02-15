import React from "react";
export default function SearchShimmer() {
  return (
    <div className="mt-6 space-y-6">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-col sm:flex-row justify-between gap-4 animate-pulse">
            <div className="flex-1 space-y-3">
              <div className="h-4 w-3/4 bg-gray-300 rounded" />
              <div className="h-3 w-1/2 bg-gray-200 rounded" />
            </div>

            <div className="w-[132px] h-[122px] sm:w-[156px] sm:h-[144px] bg-gray-200 rounded-lg self-end sm:self-auto" />
          </div>
        ))}
    </div>
  );
}
