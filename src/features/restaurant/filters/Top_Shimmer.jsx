import React from "react";

// Shimmer
export const ShimmerCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#e9e9eb] overflow-hidden h-full">
      {/* Image Shimmer */}
      <div className="relative h-56 overflow-hidden bg-gray-200">
        <div className="absolute inset-0 shimmer"></div>
      </div>

      {/* Content Shimmer */}
      <div className="p-5">
        {/* Title Shimmer */}
        <div className="h-6 bg-gray-200 rounded mb-3 relative overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
        </div>

        {/* Rating & Time Shimmer */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
            </div>
            <div className="h-4 w-12 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
            </div>
          </div>
        </div>

        {/* Cuisines Shimmer */}
        <div className="h-10 mb-4 bg-gray-200 rounded relative overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
        </div>

        {/* Area & Price Shimmer */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 shimmer"></div>
          </div>
          <div className="h-4 w-16 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 shimmer"></div>
          </div>
        </div>

        {/* Quick View Button Shimmer */}
        <div className="mt-3 pt-3 border-t border-[#e9e9eb]">
          <div className="h-10 bg-gray-200 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Shimmer Grid
export const ShimmerGrid = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <ShimmerCard key={index} />
      ))}
    </div>
  );
};

// Collection Page Shimmer
export const CollectionShimmer = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-6 pt-6 pb-10">
        {/* Header Shimmer */}
        <div className="text-left mt-10 mb-10">
          <div className="h-10 w-64 bg-gray-200 rounded mb-3 relative overflow-hidden">
            <div className="absolute inset-0 shimmer"></div>
          </div>
          <div className="h-6 w-96 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 shimmer"></div>
          </div>
        </div>

        {/* Filter Section Shimmer */}
        <div className="flex items-center space-x-4 mb-6 pb-6 border-b overflow-x-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 w-32 bg-gray-200 rounded-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 shimmer"></div>
            </div>
          ))}
        </div>

        {/* Restaurant Count Shimmer */}
        <div className="mb-10">
          <div className="h-4 w-48 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 shimmer"></div>
          </div>
        </div>

        {/* Shimmer Grid */}
        <ShimmerGrid count={8} />
      </div>
    </div>
  );
};

// Restaurant Card Shimmer
export const RestaurantCardShimmer = () => {
  return <ShimmerCard />;
};
