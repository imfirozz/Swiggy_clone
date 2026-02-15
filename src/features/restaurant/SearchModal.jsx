import React, { useState, useEffect, useRef } from "react";
import SearchData from "../../data/Search_Data.json";

export default function SearchModal({
  isOpen,
  onClose,
  onSearch,
  initialQuery = "",
}) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const inputRef = useRef(null);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

 
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") onClose();
  };

  if (!isOpen) return null;

  const popularCuisines = SearchData?.popularCuisines || [
    "Rolls",
    "Pizzas",
    "Burger",
    "Tea",
    "Chinese",
    "Cake",
    "Dessert",
    "North Indian",
    "South Indian",
  ];

  const firstRowCuisines = popularCuisines.slice(0, 4);
  const secondRowCuisines = popularCuisines.slice(4);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998] backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex justify-center pt-16 md:pt-24">
        <div
          className="bg-white rounded-3xl shadow-2xl w-[95%] max-w-2xl h-fit max-h-[80vh] overflow-hidden animate-scale-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-xl font-bold text-gray-900 mb-1">
              muna, what's on your mind?
            </h1>
            <p className="text-gray-500 text-sm">
              Search for restaurants and food...
            </p>
          </div>

          {/* Search Input */}
          <div className="p-6 border-b border-gray-100">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for restaurants and food..."
                className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Popular Cuisines Section */}
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Popular Cuisines
            </h2>

            {/* First Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {firstRowCuisines.map((cuisine, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onSearch(cuisine);
                    onClose();
                  }}
                  className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-200 rounded-xl transition-all duration-200 group"
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-2">
                    <span className="text-2xl">{getCuisineEmoji(cuisine)}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 text-center">
                    {cuisine}
                  </span>
                </button>
              ))}
            </div>

            {/* Second Row Scrollable chips */}
            {secondRowCuisines.length > 0 && (
              <>
                <div className="mb-3">
                  <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                    {secondRowCuisines.map((cuisine, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          onSearch(cuisine);
                          onClose();
                        }}
                        className="flex-shrink-0 px-4 py-2.5 bg-white hover:bg-orange-50 text-gray-700 hover:text-orange-600 border border-gray-200 hover:border-orange-300 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap"
                      >
                        {cuisine}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional suggested cuisines */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    You might also like
                  </h3>
                  <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                    {[
                      "Biryani",
                      "Pizzas",
                      "Cakes",
                      "Burgers",
                      "Noodles",
                      "Waffle",
                      "Paratha",
                      "Coffee",
                      "Pasta",
                      "Ice Cream",
                      "Sandwich",
                      "Momos",
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          onSearch(item);
                          onClose();
                        }}
                        className="flex-shrink-0 px-4 py-2 bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-600 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Close Button */}
          <div className="p-6 border-t border-gray-100 flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function getCuisineEmoji(cuisine) {
  const emojiMap = {
    Rolls: "🌯",
    Pizzas: "🍕",
    Burger: "🍔",
    Tea: "🍵",
    Chinese: "🥡",
    Cake: "🍰",
    Dessert: "🍨",
    "North Indian": "🍛",
    "South Indian": "🥘",
    Biryani: "🍚",
    Pasta: "🍝",
    Coffee: "☕",
    "Ice Cream": "🍦",
    Sandwich: "🥪",
    Momos: "🥟",
  };

  return emojiMap[cuisine] || "🍽️";
}
