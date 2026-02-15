import React, { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import Restaurant_card from "./Restaurant_card";
import {
  extractRestaurantsFromData,
  extractDeliveryTimeMinutes,
  extractMinPrice,
} from "../../Utils/RestaurantUtils";
import { restaurantsData } from "../../data/swiggyData";

export default function RestaurantListPage() {
  const [sortBy, setSortBy] = useState("Relevance");
  const [activeFilters, setActiveFilters] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [totalRestaurants, setTotalRestaurants] = useState(0);

  // Extract restaurants
  const allRestaurants = extractRestaurantsFromData(restaurantsData);

  // Initialize with all restaurants
  useEffect(() => {
    applyFiltersAndSort(allRestaurants);
  }, [sortBy, activeFilters, allRestaurants]);

  const applyFiltersAndSort = (restaurants) => {
    let result = [...restaurants];

    // Apply active filters
    if (activeFilters.length > 0) {
      result = result.filter((restaurant) => {
        const info = restaurant.info;

        return activeFilters.every((filter) => {
          if (filter === "Rating 4.0+") {
            return info.avgRating >= 4.0;
          }

          if (filter === "Fast Delivery") {
            const deliveryTime = extractDeliveryTimeMinutes(
              info.sla?.slaString,
            );
            return deliveryTime <= 30;
          }

          if (filter === "Less than ₹300") {
            const minPrice = extractMinPrice(restaurant);
            return minPrice < 300;
          }

          if (filter === "₹300-₹600") {
            const minPrice = extractMinPrice(restaurant);
            return minPrice >= 300 && minPrice <= 600;
          }

          if (filter === "Pure Veg") {
            // Check if restaurant is veg from badges
            const hasVegBadge =
              info.badges?.imageBadges?.some(
                (badge) => badge.description === "pureveg",
              ) || false;
            return hasVegBadge;
          }

          if (filter === "Offers") {
            // Check if restaurant has offers
            return (
              info.aggregatedDiscountInfoV3?.header ||
              info.aggregatedDiscountInfoV3?.subHeader
            );
          }

          return true;
        });
      });
    }

    // sorting
    result = sortRestaurants(result);

    setFilteredRestaurants(result);
    setTotalRestaurants(result.length);
  };

  const sortRestaurants = (restaurants) => {
    const sorted = [...restaurants];

    switch (sortBy) {
      case "Delivery Time":
        return sorted.sort(
          (a, b) =>
            extractDeliveryTimeMinutes(a.info.sla?.slaString) -
            extractDeliveryTimeMinutes(b.info.sla?.slaString),
        );

      case "Rating: High to Low":
        return sorted.sort(
          (a, b) => (b.info.avgRating || 0) - (a.info.avgRating || 0),
        );

      case "Cost: Low to High":
        return sorted.sort((a, b) => {
          const costA = extractMinPrice(a);
          const costB = extractMinPrice(b);
          return costA - costB;
        });

      case "Cost: High to Low":
        return sorted.sort((a, b) => {
          const costA = extractMinPrice(a);
          const costB = extractMinPrice(b);
          return costB - costA;
        });

      case "Relevance":
      default:
        return sorted;
    }
  };

  const handleRemoveFilter = (filterToRemove) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filterToRemove));
  };

  const handleAddFilter = (filter) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters((prev) => [...prev, filter]);
    }
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"></h1>
        <p className="text-gray-600 text-lg">{totalRestaurants} restaurants</p>
      </div>

      {/* Filter Bar Component */}
      <FilterBar
        sortBy={sortBy}
        onSortChange={handleSortChange}
        activeFilters={activeFilters}
        onAddFilter={handleAddFilter}
        onRemoveFilter={handleRemoveFilter}
        onClearAllFilters={handleClearAllFilters}
      />

      {/* Restaurant Grid  */}
      {filteredRestaurants.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No restaurants found
          </h3>
          <p className="text-gray-500 mb-6">
            Try changing your filters or search for something else
          </p>
          <button
            onClick={handleClearAllFilters}
            className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {filteredRestaurants.map((restaurant) => (
            <Restaurant_card key={restaurant.info.id} rest_info={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
}
