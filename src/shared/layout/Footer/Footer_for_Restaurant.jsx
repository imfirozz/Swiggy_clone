import React, { useMemo, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Footer_for_Restaurant() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("Relevance");
  const [showMoreCities, setShowMoreCities] = useState(false);
  const [showMoreCuisines, setShowMoreCuisines] = useState(false);
  const [showMoreExplore, setShowMoreExplore] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  const cityRestaurants = [
    "Best Restaurants in Ahmedabad",
    "Best Restaurants in Jaipur",
    "Best Restaurants in Nagpur",
    "Best Restaurants in Bangalore",
    "Best Restaurants in Pune",
    "Best Restaurants in Delhi",
    "Best Restaurants in Hyderabad",
    "Best Restaurants in Mumbai",
    "Best Restaurants in Chennai",
    "Best Restaurants in Kolkata",
  ];

  const bestCuisines = [
    "Chinese Restaurant Near Me",
    "South Indian Restaurant Near Me",
    "Indian Restaurant Near Me",
    "Kerala Restaurant Near Me",
    "Korean Restaurant Near Me",
    "North Indian Restaurant Near Me",
    "Seafood Restaurant Near Me",
    "Bengali Restaurant Near Me",
    "Punjabi Restaurant Near Me",
    "Italian Restaurant Near Me",
    "Andhra Restaurant Near Me",
    "Mexican Restaurant Near Me",
  ];

  const exploreRestaurants = [
    "Explore Restaurants Near Me",
    "Explore Top Rated Restaurants Near Me",
    "Explore Affordable Restaurants Near Me",
    "Explore New Restaurants Near Me",
  ];

  const sortOptions = [
    "Relevance",
    "Delivery Time",
    "Rating: High to Low",
    "Cost: Low to High",
    "Cost: High to Low",
  ];

  useEffect(() => {
    const onClick = (e) => {
      if (sortOpen && sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [sortOpen]);

  const applySort = (items) => {
    if (sortBy === "A-Z") {
      return [...items].sort((a, b) => a.localeCompare(b));
    }
    if (sortBy === "Z-A") {
      return [...items].sort((a, b) => b.localeCompare(a));
    }
    return items;
  };

  const filteredCities = useMemo(() => applySort(cityRestaurants), [sortBy]);
  const filteredCuisines = useMemo(() => applySort(bestCuisines), [sortBy]);
  const filteredExplore = useMemo(
    () => applySort(exploreRestaurants),
    [sortBy],
  );

  const visibleCities = showMoreCities
    ? filteredCities
    : filteredCities.slice(0, 4);
  const visibleCuisines = showMoreCuisines
    ? filteredCuisines
    : filteredCuisines.slice(0, 8);
  const visibleExplore = showMoreExplore
    ? filteredExplore
    : filteredExplore.slice(0, 2);

  const handleChipClick = (label) => {
    navigate(`/search?query=${encodeURIComponent(label)}`);
  };

  const Pill = ({ label, onClick, isShowMore = false }) => (
    <button
      onClick={onClick}
      className={`w-full px-5 py-3.5 bg-white border border-[#e8e8e8] rounded-lg text-sm transition-all duration-200 font-medium hover:border-[#fc8019] hover:shadow-[0_4px_15px_rgba(252,128,25,0.1)] ${
        isShowMore
          ? "text-[#fc8019] font-bold border-dashed border-2 hover:border-solid"
          : "text-[#3d4152] hover:text-[#fc8019]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Header Section */}

          {/* Filter & Sort Bar - Swiggy Style */}
          <div className="flex items-center justify-between py-5 border-y border-[#e8e8e8] mb-6">
            <div className="relative" ref={sortRef}>
              {sortOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden py-2">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortBy(opt);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-[#fff8f2] transition-colors ${
                        sortBy === opt
                          ? "text-[#fc8019] font-bold"
                          : "text-[#3d4152]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Top Cities Section */}
          <div className="py-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg md:text-xl font-bold text-[#282c3f]">
                Top Cities for Food Delivery
              </h2>
              <div className="text-sm text-[#686b78] hidden sm:block">
                Popular food delivery destinations
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {visibleCities.map((label) => (
                <Pill
                  key={label}
                  label={label}
                  onClick={() => handleChipClick(label)}
                />
              ))}
              <Pill
                label={showMoreCities ? "Show Less Cities" : "Show More Cities"}
                onClick={() => setShowMoreCities((s) => !s)}
                isShowMore={true}
              />
            </div>
          </div>

          {/* Cuisines Section */}
          <div className="py-8 border-t border-[#f0f0f3]">
            <h2 className="text-lg md:text-xl font-bold text-[#282c3f] mb-5">
              Craving Something Specific?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {visibleCuisines.map((label) => (
                <Pill
                  key={label}
                  label={label}
                  onClick={() => handleChipClick(label)}
                />
              ))}
              <Pill
                label={
                  showMoreCuisines ? "Show Less Cuisines" : "Show More Cuisines"
                }
                onClick={() => setShowMoreCuisines((s) => !s)}
                isShowMore={true}
              />
            </div>
          </div>

          {/* Explore Section */}
          <div className="py-8 border-t border-[#f0f0f3] pb-12">
            <h2 className="text-lg md:text-xl font-bold text-[#282c3f] mb-5">
              Discover More Options
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {visibleExplore.map((label) => (
                <Pill
                  key={label}
                  label={label}
                  onClick={() => handleChipClick(label)}
                />
              ))}
              <Pill
                label={
                  showMoreExplore ? "Show Less Options" : "Explore All Options"
                }
                onClick={() => setShowMoreExplore((s) => !s)}
                isShowMore={true}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
