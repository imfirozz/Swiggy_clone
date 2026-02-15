import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addItems, Increament, Decreament } from "../../Store/Cart_slicer";
import Restro_Header from "../../shared/layout/Restro_Header";
import swiggyData from "../../data/swiggyData.json";
import restaurantExtraData from "../../data/restaurantExtraData.json";

const POPULAR_CUISINES = [
  "Biryani",
  "Pizza",
  "Burger",
  "Chinese",
  "South Indian",
  "North Indian",
  "Desserts",
  "Ice Cream",
];

const POPULAR_DISHES = [
  "Chicken Biryani",
  "Margherita",
  "Paneer Tikka",
  "Butter Chicken",
  "Noodles",
  "Pav Bhaji",
  "Momos",
  "Dosa",
];

const getDishPrice = (dish) => {
  const raw =
    dish?.finalPrice ??
    dish?.price ??
    dish?.defaultPrice ??
    dish?.variantsV2?.pricingModels?.[0]?.price;
  if (!Number.isFinite(Number(raw))) return null;
  return Number(raw) / 100;
};

const getRestaurantsFromData = () => {
  const cards = swiggyData?.data?.cards || [];
  const map = new Map();

  cards.forEach((c) => {
    const list =
      c?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
      c?.card?.card?.restaurants ||
      [];

    list.forEach((r) => {
      const info = r?.info || r;
      if (info?.id) map.set(info.id, info);
    });
  });

  return Array.from(map.values());
};

const getDishesFromMenus = () => {
  const results = [];
  const entries = Object.entries(restaurantExtraData || {});

  entries.forEach(([restaurantId, menuResponse]) => {
    const restaurantInfo =
      menuResponse?.data?.cards?.find(
        (c) =>
          c.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.Restaurant",
      )?.card?.card?.info || {};

    const regularCards =
      menuResponse?.data?.cards?.find((c) => c.groupedCard)?.groupedCard
        ?.cardGroupMap?.REGULAR?.cards || [];

    const pushDish = (dish) => {
      if (!dish?.id || !dish?.name) return;
      results.push({
        ...dish,
        restaurantId,
        restaurantName: restaurantInfo.name,
        restaurantArea: restaurantInfo.areaName,
      });
    };

    regularCards.forEach((c) => {
      const type = c.card?.card?.["@type"];

      if (
        type === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      ) {
        c.card?.card?.itemCards?.forEach((i) => pushDish(i.card?.info));
      }

      if (
        type ===
        "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
      ) {
        c.card?.card?.categories?.forEach((cat) => {
          cat.itemCards?.forEach((i) => pushDish(i.card?.info));
        });
      }
    });
  });

  return results;
};

export default function SearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.Cart_slice.items);

  const restaurants = useMemo(getRestaurantsFromData, []);
  const dishes = useMemo(getDishesFromMenus, []);

  useEffect(() => {
    setSearchQuery(initialQuery);
    setDebouncedQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const q = debouncedQuery.toLowerCase();

  const parseQueryInfo = (raw) => {
    const text = raw.trim();
    if (!text) return { mode: "none" };

    const cityMatch = text.match(/^Best Restaurants in (.+)$/i);
    if (cityMatch) {
      return { mode: "city", city: cityMatch[1].trim() };
    }

    if (/^Explore Top Rated Restaurants Near Me$/i.test(text)) {
      return { mode: "explore", type: "top-rated" };
    }
    if (/^Explore Affordable Restaurants Near Me$/i.test(text)) {
      return { mode: "explore", type: "affordable" };
    }
    if (/^Explore New Restaurants Near Me$/i.test(text)) {
      return { mode: "explore", type: "new" };
    }
    if (
      /^Explore Restaurants Near Me$/i.test(text) ||
      /^Explore All Options$/i.test(text)
    ) {
      return { mode: "explore", type: "all" };
    }

    const cuisineMatch = text.match(
      /^(.*?)(?: Restaurants?| Restaurant) Near Me$/i,
    );
    if (cuisineMatch && !/^Explore/i.test(text)) {
      return { mode: "cuisine", cuisine: cuisineMatch[1].trim() };
    }

    return { mode: "search" };
  };

  const queryInfo = useMemo(
    () => parseQueryInfo(debouncedQuery),
    [debouncedQuery],
  );

  const getNumericRating = (r) => {
    const rating = Number(r?.avgRating ?? r?.avgRatingString);
    return Number.isFinite(rating) ? rating : 0;
  };

  const getCostForTwo = (r) => {
    const text = r?.costForTwo || r?.costForTwoMessage || "";
    const match = String(text).match(/₹\s*([0-9]+)/i);
    return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
  };

  const filteredRestaurants = useMemo(() => {
    if (!q) return [];

    if (queryInfo.mode === "city") {
      const city = queryInfo.city.toLowerCase();
      const byCity = restaurants.filter((r) => {
        const area = r?.areaName?.toLowerCase() || "";
        const locality = r?.locality?.toLowerCase() || "";
        return area.includes(city) || locality.includes(city);
      });
      const source = byCity.length > 0 ? byCity : restaurants;
      return [...source].sort(
        (a, b) => getNumericRating(b) - getNumericRating(a),
      );
    }

    if (queryInfo.mode === "cuisine") {
      const cuisine = queryInfo.cuisine.toLowerCase();
      return restaurants.filter((r) =>
        (r?.cuisines || []).join(", ").toLowerCase().includes(cuisine),
      );
    }

    if (queryInfo.mode === "explore") {
      const base = [...restaurants];
      if (queryInfo.type === "top-rated") {
        return base.sort((a, b) => getNumericRating(b) - getNumericRating(a));
      }
      if (queryInfo.type === "affordable") {
        return base.sort((a, b) => getCostForTwo(a) - getCostForTwo(b));
      }
      if (queryInfo.type === "new") {
        return base.filter((r) => !r?.avgRating && !r?.avgRatingString);
      }
      return base;
    }

    return restaurants.filter((r) => {
      const name = r?.name?.toLowerCase() || "";
      const cuisines = (r?.cuisines || []).join(", ").toLowerCase();
      const area = r?.areaName?.toLowerCase() || "";
      return name.includes(q) || cuisines.includes(q) || area.includes(q);
    });
  }, [q, restaurants, queryInfo]);

  const filteredDishes = useMemo(() => {
    if (!q) return [];
    if (queryInfo.mode !== "search") return [];
    return dishes.filter((d) => {
      const name = d?.name?.toLowerCase() || "";
      const desc = d?.description?.toLowerCase() || "";
      return name.includes(q) || desc.includes(q);
    });
  }, [q, dishes, queryInfo.mode]);

  const getItemCount = (dishId) =>
    cartItems.find((i) => i.id === dishId)?.quantity || 0;

  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <Restro_Header />

      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-[#e9e9eb] px-3 sm:px-4 py-3 flex items-center gap-2 sm:gap-3 shadow-sm">
          <svg
            className="w-5 h-5 text-[#686b78]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for restaurant and food"
            className="w-full text-sm sm:text-base outline-none"
          />
        </div>

        {/* Suggestions */}
        {!debouncedQuery && (
          <div className="mt-8">
            <h2 className="text-base sm:text-lg font-bold text-[#282c3f] mb-4">
              Popular Cuisines
            </h2>
            <div className="flex flex-wrap gap-3">
              {POPULAR_CUISINES.map((item) => (
                <button
                  key={item}
                  onClick={() => setSearchQuery(item)}
                  className="px-4 py-2 bg-white border border-[#e9e9eb] rounded-full text-sm text-[#3d4152] hover:border-[#d4d5d9]"
                >
                  {item}
                </button>
              ))}
            </div>

            <h2 className="text-base sm:text-lg font-bold text-[#282c3f] mt-8 mb-4">
              Popular Dishes
            </h2>
            <div className="flex flex-wrap gap-3">
              {POPULAR_DISHES.map((item) => (
                <button
                  key={item}
                  onClick={() => setSearchQuery(item)}
                  className="px-4 py-2 bg-white border border-[#e9e9eb] rounded-full text-sm text-[#3d4152] hover:border-[#d4d5d9]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {debouncedQuery && (
          <div className="mt-8 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[#282c3f]">
                {queryInfo.mode === "city" && queryInfo.city
                  ? `Best Restaurants in ${queryInfo.city}`
                  : debouncedQuery}
              </h1>
              {queryInfo.mode === "city" && (
                <span className="text-xs text-[#686b78]">
                  Showing top rated from available data
                </span>
              )}
            </div>

            {/* Restaurants */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-bold text-[#282c3f]">
                  Restaurants
                </h2>
                <span className="text-sm text-[#686b78]">
                  {filteredRestaurants.length} results
                </span>
              </div>

              {filteredRestaurants.length === 0 ? (
                <p className="text-sm text-[#686b78]">No restaurants found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredRestaurants.map((r) => (
                    <Link
                      key={r.id}
                      to={`/city/bhopal/${r.id}`}
                      className="bg-white rounded-2xl border border-[#e9e9eb] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all overflow-hidden"
                    >
                      <div className="h-44 overflow-hidden">
                        <img
                          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${r.cloudinaryImageId}`}
                          alt={r.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-[#282c3f] text-[16px] line-clamp-1">
                          {r.name}
                        </h3>
                        <p className="text-sm text-[#686b78] mt-1 line-clamp-1">
                          {r.cuisines?.join(", ")}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-[#686b78] mt-2">
                          <span className="bg-[#0f8a65] text-white px-2 py-0.5 rounded-full">
                            ★ {r.avgRating || "4.0"}
                          </span>
                          <span>•</span>
                          <span>{r.sla?.deliveryTime || "30"} mins</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Dishes */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-bold text-[#282c3f]">Dishes</h2>
                <span className="text-sm text-[#686b78]">
                  {filteredDishes.length} results
                </span>
              </div>

              {filteredDishes.length === 0 ? (
                <p className="text-sm text-[#686b78]">No dishes found.</p>
              ) : (
                <div className="space-y-6">
                  {filteredDishes.slice(0, 60).map((d, index) => {
                    const price = getDishPrice(d);
                    const count = getItemCount(d.id);
                    const isVeg = d?.isVeg === 1;

                    return (
                      <div
                        key={`${d.id}-${d.restaurantId}-${index}`}
                        className="bg-white border border-[#e9e9eb] rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row gap-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-4 h-4 border-2 flex items-center justify-center ${
                                isVeg ? "border-green-600" : "border-red-600"
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  isVeg ? "bg-green-600" : "bg-red-600"
                                }`}
                              />
                            </span>
                            <h3 className="font-semibold text-[#282c3f] text-sm sm:text-base">
                              {d.name}
                            </h3>
                          </div>

                          {d.description && (
                            <p className="text-sm text-[#686b78] mt-1 line-clamp-2">
                              {d.description}
                            </p>
                          )}

                          <div className="flex items-center gap-3 mt-2 text-sm text-[#686b78]">
                            {price !== null && (
                              <span className="font-semibold text-[#282c3f]">
                                ₹{Math.round(price)}
                              </span>
                            )}
                            {d?.ratings?.aggregatedRating?.rating && (
                              <span className="text-[#0f8a65] font-semibold">
                                ★ {d.ratings.aggregatedRating.rating}
                              </span>
                            )}
                          </div>

                          {d.restaurantName && (
                            <Link
                              to={`/city/bhopal/${d.restaurantId}`}
                              className="text-xs text-blue-600 font-semibold mt-2 inline-block"
                            >
                              {d.restaurantName}
                              {d.restaurantArea ? ` • ${d.restaurantArea}` : ""}
                            </Link>
                          )}
                        </div>

                        <div className="relative w-[120px] h-[96px] sm:w-[140px] sm:h-[110px] flex justify-center self-end sm:self-auto">
                          {d.imageId && (
                            <img
                              src={`https://media-assets.swiggy.com/swiggy/image/upload/${d.imageId}`}
                              alt={d.name}
                              className="w-[120px] h-[96px] sm:w-[140px] sm:h-[110px] object-cover rounded-lg"
                            />
                          )}

                          {count === 0 ? (
                            <button
                              onClick={() =>
                                dispatch(
                                  addItems({
                                    ...d,
                                    restaurantId: d.restaurantId,
                                  }),
                                )
                              }
                              className="absolute -bottom-3 bg-white text-[#60b246] font-bold px-5 sm:px-6 py-1 rounded-lg border shadow text-sm sm:text-base"
                            >
                              ADD
                            </button>
                          ) : (
                            <div className="absolute -bottom-3 bg-white text-[#60b246] flex gap-4 items-center px-3 sm:px-4 py-1 rounded-lg border shadow text-base sm:text-lg">
                              <button
                                onClick={() =>
                                  dispatch(Decreament({ id: d.id }))
                                }
                              >
                                -
                              </button>
                              <span>{count}</span>
                              <button
                                onClick={() =>
                                  dispatch(Increament({ id: d.id }))
                                }
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
