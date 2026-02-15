import React, { useState } from "react";

export default function FilterBar({
  sortBy,
  onSortChange,
  activeFilters,
  onAddFilter,
  onRemoveFilter,
  onClearAllFilters,
}) {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const sortOptions = [
    "Relevance",
    "Delivery Time",
    "Rating: High to Low",
    "Cost: Low to High",
    "Cost: High to Low",
  ];

  const quickFilters = [
    "Fast Delivery",
    "Rating 4.0+",
    "Pure Veg",
    "Offers",
    "₹300-₹600",
    "Less than ₹300",
  ];

  const handleQuickFilterClick = (filter) => {
    if (activeFilters.includes(filter)) {
      onRemoveFilter(filter);
    } else {
      onAddFilter(filter);
    }
  };

  return (
    <div className="w-full mb-6">
      {/* Active Filters Bar */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-sm font-medium text-gray-600">
            Active filters:
          </span>
          {activeFilters.map((filter) => (
            <div
              key={filter}
              className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-2 hover:bg-blue-100 transition-colors"
            >
              <span className="text-blue-700 text-sm font-medium">
                {filter}
              </span>
              <button
                onClick={() => onRemoveFilter(filter)}
                className="text-blue-400 hover:text-blue-700 transition-colors"
                aria-label={`Remove ${filter} filter`}
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
          <button
            onClick={onClearAllFilters}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        {/* Left: Filters */}
        <div className="flex items-center gap-4">
          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 hover:border-gray-400 transition-colors bg-white"
            >
              <svg
                className="w-4 h-4 text-gray-600"
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
              <span className="text-sm font-medium text-gray-700">Filters</span>
              {activeFilters.length > 0 && (
                <span className="w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
            {quickFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleQuickFilterClick(filter)}
                className={`flex-shrink-0 border rounded-lg px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap ${
                  activeFilters.includes(filter)
                    ? "border-orange-500 bg-orange-50 text-orange-600 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 text-gray-700 bg-gray-50 hover:bg-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Sort By */}
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 hover:border-gray-400 transition-colors bg-white min-w-[180px]"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
            <span className="flex-1 text-left text-sm font-medium text-gray-700">
              Sort by: {sortBy}
            </span>
            <svg
              className={`w-4 h-4 text-gray-600 transition-transform ${showSortDropdown ? "rotate-180" : ""}`}
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
          </button>

          {/* Sort Dropdown */}
          {showSortDropdown && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowSortDropdown(false)}
              />
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-30 py-2">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      onSortChange(option);
                      setShowSortDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium transition-colors ${
                      sortBy === option
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
