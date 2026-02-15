import React, { useState } from "react";
import FilterOptions from "./FilterOptions";

const FilterSection = ({
  filteredRestaurants,
  totalRestaurants,
  filters,
  setFilters,
  sortBy,
  setSortBy,
}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Sort options
  const sortOptions = [
    { value: "RELEVANCE", label: "Relevance" },
    { value: "DELIVERY_TIME", label: "Delivery Time" },
    { value: "RATING", label: "Rating" },
    { value: "COST_FOR_TWO_L2H", label: "Cost: Low to High" },
    { value: "COST_FOR_TWO_H2L", label: "Cost: High to Low" },
  ];

  // Toggle individual filters
  const toggleFilter = (filterName) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      fastDelivery: false,
      rating4: false,
      pureVeg: false,
      offers: false,
      lessThan300: false,
      lessThan600: false,
      cuisineType: [],
      deliveryTime: null,
    });
  };

  return (
    <div className="mb-8">
      {/* Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-baseline">
  <span className="text-3xl font-extrabold text-[#282c3f]">
    {filteredRestaurants.length}
  </span>
  <span className="ml-2 text-2xl font-semibold text-[#3d4152]">
    Restaurants to explore
  </span>
</div>


        <div className="flex items-center  gap-4">
          {/* Filter Button */}
          <button
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="font-medium">Filters</span>
            {Object.values(filters).some((val) =>
              Array.isArray(val) ? val.length > 0 : val === true,
            ) && (
              <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {
                  Object.values(filters).filter((val) =>
                    Array.isArray(val) ? val.length > 0 : val === true,
                  ).length
                }
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative ">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none pr-10 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Filters Bar */}
      <div className="flex flex-wrap gap-3 mb-6 ">
        <button
          onClick={() => toggleFilter("fastDelivery")}
          className={`flex items-center cursor-pointer gap-2 px-4 py-2.5 rounded-full border transition-colors ${filters.fastDelivery ? "bg-green-50 text-green-700 border-green-200" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Fast Delivery</span>
        </button>

        {/* <button
          onClick={() => toggleFilter("rating4")}
          className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-full border transition-colors ${filters.rating4 ? "bg-green-50 text-green-700 border-green-200" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>Rating 4.0+</span>
        </button> */}

        <button
          onClick={() => toggleFilter("pureVeg")}
          className={`flex cursor-pointer items-center gap-2 px-4 py-2.5 rounded-full border transition-colors ${filters.pureVeg ? "bg-green-50 text-green-700 border-green-200" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Pure Veg</span>
        </button>
{/* 
        <button
          onClick={() => toggleFilter("offers")}
          className={`flex items-center cursor-pointer gap-2 px-4 py-2.5 rounded-full border transition-colors ${filters.offers ? "bg-green-50 text-green-700 border-green-200" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
            />
          </svg>
          <span>Offers</span>
        </button> */}

        <button
          onClick={() => toggleFilter("lessThan300")}
          className={`px-4 py-2.5 rounded-full cursor-pointer border transition-colors ${filters.lessThan300 ? "bg-green-50 text-green-700 border-green-200" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
        >
          <span>₹300 - ₹600</span>
        </button>
      </div>

      {/* Active Filters */}
      {Object.entries(filters).some(([key, value]) =>
        Array.isArray(value) ? value.length > 0 : value === true,
      ) && (
        <div className="flex flex-wrap items-center  gap-3 mb-6 p-4 bg-blue-50 rounded-lg">
          <span className="font-medium text-blue-800">Active Filters:</span>
          {filters.fastDelivery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Fast Delivery
              <button
                onClick={() => toggleFilter("fastDelivery")}
                className="ml-1 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
          {filters.rating4 && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Rating 4.0+
              <button
                onClick={() => toggleFilter("rating4")}
                className="ml-1 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
          {filters.pureVeg && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Pure Veg
              <button
                onClick={() => toggleFilter("pureVeg")}
                className="ml-1 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
          {filters.offers && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Offers
              <button
                onClick={() => toggleFilter("offers")}
                className="ml-1 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
          {filters.lessThan300 && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              ₹300 - ₹600
              <button
                onClick={() => toggleFilter("lessThan300")}
                className="ml-1 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
          <button
            onClick={resetFilters}
            className="ml-auto text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <FilterOptions
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowFilterModal(false)}
          resetFilters={resetFilters}
        />
      )}
    </div>
  );
};

export default FilterSection;
