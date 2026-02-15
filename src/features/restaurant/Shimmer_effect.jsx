import React from "react";
function Shimmer_effect() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array(16)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-3 animate-pulse">
              {/* Image */}
              <div className="h-44 w-full rounded-xl bg-gray-300"></div>

              {/* Restaurant name */}
              <div className="mt-3 h-4 w-4/5 rounded bg-gray-300"></div>

              {/* Cuisine */}
              <div className="mt-2 h-3 w-3/5 rounded bg-gray-300"></div>

              {/* Rating + delivery */}
              <div className="flex items-center justify-between mt-4">
                <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                <div className="h-3 w-12 rounded bg-gray-200"></div>
              </div>

              {/* Area name */}
              <div className="mt-2 h-3 w-2/5 rounded bg-gray-200"></div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Shimmer_effect;
