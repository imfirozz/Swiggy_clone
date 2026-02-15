import React, { useState } from "react";

const FilterOptions = ({ filters, setFilters, onClose, resetFilters }) => {
  const [tempFilters, setTempFilters] = useState({ ...filters });

  // Cuisine options
  const cuisineOptions = [
    "North Indian",
    "Chinese",
    "South Indian",
    "Italian",
    "Mexican",
    "Arabian",
    "American",
    "Thai",
    "Japanese",
    "Desserts",
    "Beverages",
  ];

  // Delivery time options
  const deliveryTimeOptions = [
    { label: "10-20 mins", value: 20 },
    { label: "20-30 mins", value: 30 },
    { label: "30-40 mins", value: 40 },
    { label: "40+ mins", value: 50 },
  ];

  // Cost per person options
  const costOptions = [
    { label: "Less than ₹300", value: "lessThan300" },
    { label: "₹300 to ₹600", value: "300to600" },
    { label: "₹600 to ₹900", value: "600to900" },
    { label: "₹900+", value: "900plus" },
  ];

  const handleApply = () => {
    setFilters(tempFilters);
    onClose();
  };

  const handleReset = () => {
    setTempFilters({
      fastDelivery: false,
      rating4: false,
      pureVeg: false,
      offers: false,
      lessThan300: false,
      cuisineType: [],
      deliveryTime: null,
    });
  };

  const toggleCuisine = (cuisine) => {
    setTempFilters((prev) => ({
      ...prev,
      cuisineType: prev.cuisineType.includes(cuisine)
        ? prev.cuisineType.filter((c) => c !== cuisine)
        : [...prev.cuisineType, cuisine],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center cursor-pointer justify-between p-6 border-b">
          <h2 className="text-2xl cursor-pointer font-bold text-gray-900">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500  hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
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

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Sort By Section */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Sort By</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Relevance",
                "Delivery Time",
                "Rating",
                "Cost: Low to High",
                "Cost: High to Low",
              ].map((option) => (
                <button
                  key={option}
                  className={`px-4 py-3 rounded-lg border text-left ${tempFilters.sortBy === option ? "bg-orange-50 border-orange-300 text-orange-700" : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"}`}
                  onClick={() =>
                    setTempFilters((prev) => ({ ...prev, sortBy: option }))
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Time */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4 text-gray-800">
              Delivery Time
            </h3>
            <div className="flex flex-wrap gap-3">
              {deliveryTimeOptions.map((option) => (
                <button
                  key={option.value}
                  className={`px-4 py-2 rounded-full border ${tempFilters.deliveryTime === option.value ? "bg-green-50 border-green-300 text-green-700" : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"}`}
                  onClick={() =>
                    setTempFilters((prev) => ({
                      ...prev,
                      deliveryTime:
                        tempFilters.deliveryTime === option.value
                          ? null
                          : option.value,
                    }))
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cuisine Type */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Cuisine</h3>
            <div className="flex flex-wrap gap-3">
              {cuisineOptions.map((cuisine) => (
                <button
                  key={cuisine}
                  className={`px-4 py-2 rounded-full border ${tempFilters.cuisineType.includes(cuisine) ? "bg-blue-50 border-blue-300 text-blue-700" : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => toggleCuisine(cuisine)}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Cost per Person */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4 text-gray-800">
              Cost per Person
            </h3>
            <div className="flex flex-wrap gap-3">
              {costOptions.map((option) => (
                <button
                  key={option.value}
                  className={`px-4 py-2 rounded-full border ${tempFilters[option.value] ? "bg-purple-50 border-purple-300 text-purple-700" : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"}`}
                  onClick={() =>
                    setTempFilters((prev) => ({
                      ...prev,
                      [option.value]: !prev[option.value],
                    }))
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Other Filters */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4 text-gray-800">
              Other Filters
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 border rounded flex items-center justify-center ${tempFilters.fastDelivery ? "bg-orange-500 border-orange-500" : "border-gray-300"}`}
                  >
                    {tempFilters.fastDelivery && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium">Fast Delivery</span>
                </div>
                <span className="text-gray-500 text-sm">Under 30 mins</span>
              </label>

              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 border rounded flex items-center justify-center ${tempFilters.rating4 ? "bg-orange-500 border-orange-500" : "border-gray-300"}`}
                  >
                    {tempFilters.rating4 && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium">Rating 4.0+</span>
                </div>
                <span className="text-gray-500 text-sm">Highly rated</span>
              </label>

              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 border rounded flex items-center justify-center ${tempFilters.pureVeg ? "bg-orange-500 border-orange-500" : "border-gray-300"}`}
                  >
                    {tempFilters.pureVeg && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium">Pure Veg</span>
                </div>
                <span className="text-gray-500 text-sm">Vegetarian only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <button
            onClick={handleReset}
            className="px-6 py-3 text-gray-700 cursor-pointer font-medium hover:text-gray-900"
          >
            Reset All
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium cursor-pointer rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-3 bg-orange-500 text-white font-medium cursor-pointer rounded-lg hover:bg-orange-600"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
