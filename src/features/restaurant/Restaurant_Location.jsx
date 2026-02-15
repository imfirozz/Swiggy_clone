import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import CategorySection from "./CategorySection";
import restaurantExtraData from "../../data/restaurantExtraData.json";
import { Veg_Non_filter } from "./Veg_NonVeg_filter";
import RestaurantShimmer from "./Restro_shimmer";

import { useDispatch } from "react-redux";
import { setRestaurant } from "../../Store/Restaurant_slicer";
import { useSelector } from "react-redux";
import { addItems, Increament, Decreament } from "../../Store/Cart_slicer";

export default function Restaurant_Location() {
  const { id: restaurantId } = useParams();
  const dispatch = useDispatch();

  const [foodFilter, setFoodFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  const menuResponse = restaurantExtraData[restaurantId];

  // optional chaining
  const restaurantInfo = menuResponse?.data?.cards?.find(
    (c) =>
      c.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Restaurant",
  )?.card?.card?.info;

  //  optional chaining
  const regularCards =
    menuResponse?.data?.cards?.find((c) => c.groupedCard)?.groupedCard
      ?.cardGroupMap?.REGULAR?.cards || [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    
    if (!menuResponse || !restaurantInfo) return;

 
    regularCards.forEach((card, index) => {
      console.log(`Card ${index}:`, {
        title: card.card?.card?.title,
        type: card.card?.card?.["@type"],
        hasItemCards: !!card.card?.card?.itemCards,
        itemCount: card.card?.card?.itemCards?.length,
      });
    });

    dispatch(
      setRestaurant({
        id: restaurantId,
        name: restaurantInfo.name,
      }),
    );
  }, [restaurantId, restaurantInfo, regularCards, menuResponse, dispatch]);

  const restaurant = useSelector((state) => state.restaurant);
  const cartItems = useSelector((state) => state.Cart_slice.items);

  // Show shimmer
  if (loading) {
    return <RestaurantShimmer />;
  }

  if (!menuResponse) {
    return (
      <h1 className="mt-20 text-center text-xl">Restaurant data not found</h1>
    );
  }

  //  menuResponse  we can safely access its properties

  const safeRestaurantInfo = menuResponse.data.cards.find(
    (c) =>
      c.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Restaurant",
  )?.card?.card?.info;

  const safeRegularCards =
    menuResponse.data.cards.find((c) => c.groupedCard)?.groupedCard
      ?.cardGroupMap?.REGULAR?.cards || [];

  if (!safeRestaurantInfo) {
    return (
      <h1 className="mt-20 text-center text-xl">Restaurant info missing</h1>
    );
  }

  /*  OFFERS  */
  const offers =
    menuResponse.data.cards.find(
      (c) => c.card?.card?.gridElements?.infoWithStyle?.offers,
    )?.card?.card?.gridElements?.infoWithStyle?.offers || [];

  /*  TOP PICKS  */
  const topPicksCard =
    safeRegularCards.find(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.MenuCarousel",
    )?.card?.card?.carousel || [];

  /*  CATEGORY EXTRACTION  */
  const itemCategories = [];
  const nestedCategories = [];

  safeRegularCards.forEach((c) => {
    const type = c.card?.card?.["@type"];

    if (
      type === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) {
      itemCategories.push(c.card.card);
    }

    if (
      type ===
      "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
    ) {
      nestedCategories.push(c.card.card);
    }
  });



  // Rating colour function
  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-700";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const getDishRating = (dish) => {
    const rating =
      dish?.ratings?.aggregatedRating?.rating ??
      dish?.info?.ratings?.aggregatedRating?.rating;

    const count =
      dish?.ratings?.aggregatedRating?.ratingCount ??
      dish?.ratings?.aggregatedRating?.ratingCountV2 ??
      dish?.info?.ratings?.aggregatedRating?.ratingCount ??
      dish?.info?.ratings?.aggregatedRating?.ratingCountV2;

    if (!rating) return null;
    return { rating, count };
  };

  const getPrice = (dish) => {
    if (!dish) return null;

    //  price from various fields
    let priceValue = null;

    if (dish.finalPrice !== undefined && dish.finalPrice !== null) {
      priceValue = Number(dish.finalPrice);
    } else if (dish.price !== undefined && dish.price !== null) {
      priceValue = Number(dish.price);
    } else if (dish.defaultPrice !== undefined && dish.defaultPrice !== null) {
      priceValue = Number(dish.defaultPrice);
    }

    // Convert paise to rupees
    if (priceValue !== null && !isNaN(priceValue)) {
      return priceValue / 100;
    }

    return null;
  };

  // filter options
  const filterItems = (items) => {
    if (!foodFilter) return items;

    return items.filter((item) => {
      if (foodFilter === "veg") return item.isVeg === 1;
      if (foodFilter === "nonveg") return item.isVeg !== 1;
      return true;
    });
  };

  //format price 
  const formatPrice = (price) => {
    if (price === null || price === undefined || isNaN(price)) {
      return "₹--";
    }
    return `₹${Math.round(price)}`;
  };



  /*  CREATE ALL CATEGORIES  */

  //  Category Section component
  const allCategories = [];

  // Add Recommended category
  const recommendedCard = safeRegularCards.find(
    (c) =>
      c.card?.card?.title === "Recommended" ||
      c.card?.card?.title === "RECOMMENDED" ||
      c.card?.card?.title?.toLowerCase() === "recommended",
  );

  if (recommendedCard?.card?.card?.itemCards?.length > 0) {
    allCategories.push({
      title: `Recommended (${recommendedCard.card.card.itemCards.length})`,
      items: recommendedCard.card.card.itemCards.map((i) => i.card?.info),
      restaurantId: restaurantId,
    });
  }

  // Add all regular Item Category sections
  itemCategories.forEach((cat) => {
    if (
      cat?.itemCards?.length > 0 &&
      cat.title?.toLowerCase() !== "recommended"
    ) {
      allCategories.push({
        title: cat.title,
        items: cat.itemCards.map((i) => i.card.info),
        restaurantId: restaurantId,
      });
    }
  });

  /*  RENDER  */

  return (
    <div className="w-[94%] sm:w-[90%] lg:w-[80%] mx-auto mt-8 sm:mt-12 lg:mt-20">
      {/*  RESTAURANT NAME  */}
      <h1 className="text-[26px] sm:text-[30px] lg:text-[32px] ml-1 sm:ml-[18px] font-extrabold text-[#282c3f]">
        {safeRestaurantInfo.name}
      </h1>

      {/*  HEADER CARD  */}
      <div className="mt-4 sm:mt-6 rounded-3xl bg-[#f2f3f7] p-3 sm:p-4">
        <div className="bg-white rounded-2xl px-4 sm:px-6 py-4 sm:py-5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-2 text-[13px] sm:text-[14px] lg:text-[15px] font-semibold text-[#3d4152] flex-wrap">
            <span className="w-5 h-5 rounded-full bg-green-700 text-white flex items-center justify-center text-xs">
              ★
            </span>
            {safeRestaurantInfo.avgRating}
            <span className="text-[#686b78]">
              ({safeRestaurantInfo.totalRatingsString})
            </span>
            <span className="mx-1">•</span>
            {safeRestaurantInfo.costForTwoMessage}
          </div>

          <p className="mt-2 text-[13px] sm:text-[14px] font-medium text-[#fc8019]">
            {safeRestaurantInfo.cuisines.join(", ")}
          </p>

          {/* Outlet + Delivery  */}
          <div className="mt-4 flex gap-3 sm:gap-4 text-[13px] sm:text-[14px] text-[#3d4152]">
            {/* Connector */}
            <div className="flex flex-col items-center pt-1">
              <span className="w-2 h-2 bg-[#c4c4c4] rounded-full"></span>
              <span className="w-[2px] h-6 bg-[#e2e2e7]"></span>
              <span className="w-2 h-2 bg-[#c4c4c4] rounded-full"></span>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2">
              <p>
                <span className="font-semibold">Outlet</span>{" "}
                <span className="text-[#686b78]">
                  {safeRestaurantInfo.areaName}
                </span>
                <span className="ml-1 text-[#fc8019] cursor-pointer">▼</span>
              </p>

              <p className="font-semibold">
                {safeRestaurantInfo.sla.slaString}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*  DEALS  */}
      {offers.length > 0 && (
        <div className="mt-8 sm:mt-10">
          <h2 className="text-[18px] sm:text-[20px] font-bold mb-4">Deals for you</h2>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {offers.map((offer, index) => (
              <div
                key={index}
                className="min-w-[260px] sm:min-w-[320px] flex items-center gap-3 border rounded-xl px-3 sm:px-4 py-3 bg-white"
              >
                <img
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/offers/generic"
                  className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px]"
                  alt="offer"
                />

                <div>
                  <p className="font-extrabold">{offer?.info?.header}</p>
                  <p className="text-sm text-gray-600">
                    {offer?.info?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/*  MENU DIVIDER  */}
      <div className="mt-10 sm:mt-12 bg-[#f2f2f2] py-5 sm:py-6">
        <div className="flex items-center justify-center gap-4 text-[#686b78]">
          <svg
            width="22"
            height="10"
            viewBox="0 0 44 10"
            className="rotate-180"
          >
            <path d="M0 5h30" stroke="currentColor" strokeWidth="2" />
            <circle cx="36" cy="5" r="3" fill="currentColor" />
          </svg>

          <span className="text-xs font-semibold tracking-[0.35em]">MENU</span>

          <svg width="22" height="10" viewBox="0 0 44 10">
            <path d="M0 5h30" stroke="currentColor" strokeWidth="2" />
            <circle cx="36" cy="5" r="3" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/*  SEARCH DISHES  */}
      <Link to={`/city/bhopal/${restaurantId}/search`}>
        <div
          className="mt-5 sm:mt-6 flex items-center bg-[rgba(2,6,12,0.06)]
                rounded-2xl px-4 sm:px-6 py-3 gap-3 sm:gap-4
                focus-within:ring-2 focus-within:ring-[#fc8019]"
        >
          <input
            type="text"
            placeholder="Search for dishes"
            className="w-full bg-transparent text-[14px] sm:text-[16px]
               text-center placeholder:text-[#686b78]
               outline-none"
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5 text-[#686b78]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </Link>

      {/*  TOP PICKS  */}
      {topPicksCard.length > 0 && (
        <div className="mt-10 sm:mt-12">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Top Picks</h2>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {topPicksCard.map((pick, index) => {
              const dish = pick.dish?.info;
              if (!dish) return null;

              const price = getPrice(dish);
              const ratingData = getDishRating(dish);
              const itemCount =
                cartItems.find((i) => i.id === dish.id)?.quantity || 0;

              return (
                <div
                  key={dish.id || index}
                  className="group w-[270px] sm:w-[300px] lg:w-[320px] shrink-0 border relative overflow-hidden rounded-2xl p-0"
                >
                  {/* Image */}
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/${dish.imageId}`}
                    alt={dish.name}
                    className="w-full h-[190px] sm:h-[210px] lg:h-[220px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div
                    className="
                      absolute inset-0
                      transition-opacity duration-300
                      bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.25)_0%,_rgba(0,0,0,0.65)_65%,_rgba(0,0,0,0.9)_100%)]
                      group-hover:opacity-85
                    "
                  />

                  {/* Text block */}
                  <div className="absolute top-3 left-3 right-3 z-10">
                    <p className="text-white font-semibold text-sm drop-shadow-md">
                      {dish.name}
                    </p>

                    {ratingData && (
                      <div className="flex items-center gap-1 mt-1 text-sm">
                        <span
                          className={`font-semibold ${getRatingColor(
                            Number(ratingData.rating),
                          )}`}
                        >
                          ★ {ratingData.rating}
                        </span>
                        {ratingData.count && (
                          <span className="text-gray-300">
                            ({ratingData.count})
                          </span>
                        )}
                      </div>
                    )}

                    {dish.description && (
                      <p className="mt-1 text-xs text-white/90 line-clamp-2">
                        {dish.description}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  {price && !isNaN(price) && (
                    <p className="absolute bottom-3 left-3 z-10 text-white font-semibold drop-shadow-md">
                      {formatPrice(price)}
                    </p>
                  )}

                  {/* ADD  button */}
                  {itemCount === 0 ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addItems({ ...dish, restaurantId }));
                      }}
                      className="
                        absolute bottom-3 right-4 z-10
                        bg-white text-[#60b246] font-bold
                        px-6 sm:px-8 py-1 rounded-lg
                        border shadow cursor-pointer
                      "
                    >
                      ADD
                    </button>
                  ) : (
                    <div
                      className="
                        absolute bottom-3 right-4 z-10
                        bg-white text-green-600 flex gap-4 items-center
                        px-3 sm:px-4 py-1 rounded-lg border shadow text-base sm:text-lg
                      "
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(Decreament({ id: dish.id }));
                        }}
                      >
                        -
                      </button>
                      <span>{itemCount}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(Increament({ id: dish.id }));
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="w-full">
        <Veg_Non_filter selected={foodFilter} setSelected={setFoodFilter} />
      </div>

      {/*  ALL CATEGORIES  */}
      {allCategories.length > 0 && (
        <div className="mt-10">
          {allCategories.map((category, index) => (
            <CategorySection
              key={`${category.title}-${index}`}
              category={{
                ...category,
                items: filterItems(category.items),
              }}
            />
          ))}
        </div>
      )}

      {/*  NESTED CATEGORIES  */}
      {nestedCategories.map((nested, nIndex) => {
        if (!nested?.categories?.length) return null;

        return (
          <div key={nested.title || nIndex} className="mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">{nested.title}</h2>

            {nested.categories.map((sub, sIndex) => {
              const items =
                sub.itemCards ||
                sub.cards?.flatMap((c) => c.itemCards || []) ||
                [];

              if (!items.length) return null;

              return (
                <CategorySection
                  key={sub.title + "-" + sIndex}
                  category={{ title: sub.title }}
                >
                  {/* ORIGINAL UI  */}
                  {items.map((item, iIndex) => {
                    const dish = item?.card?.info;
                    if (!dish) return null;

                    // VEG / NON-VEG FILTER
                    if (foodFilter === "veg" && dish.isVeg !== 1) return null;
                    if (foodFilter === "nonveg" && dish.isVeg === 1)
                      return null;

                    const price = getPrice(dish);
                    const ratingData = getDishRating(dish);

                    return (
                      <div
                        key={dish.id || `${sIndex}-${iIndex}`}
                        className="flex flex-col sm:flex-row justify-between gap-4 border-b border-[#e9e9eb] py-6 last:border-b-0"
                      >
                        {/* LEFT */}
                        <div className="flex-1">
                          <p className="font-semibold">{dish.name}</p>

                          {ratingData && (
                            <div className="mt-1 flex items-center gap-1 text-sm">
                              <span
                                className={`font-semibold ${getRatingColor(
                                  Number(ratingData.rating),
                                )}`}
                              >
                                ★ {ratingData.rating}
                              </span>
                              {ratingData.count && (
                                <span className="text-[#686b78]">
                                  ({ratingData.count})
                                </span>
                              )}
                            </div>
                          )}

                          {dish.description && (
                            <p className="text-sm text-gray-600 mt-1">
                              {dish.description}
                            </p>
                          )}

                          {price && !isNaN(price) && (
                            <p className="mt-2 font-medium text-[#02060c]">
                              {formatPrice(price)}
                            </p>
                          )}
                        </div>

                        {/* RIGHT */}
                        <div className="relative w-[132px] h-[122px] sm:w-[156px] sm:h-[144px] flex justify-center self-end sm:self-auto">
                          {dish.imageId && (
                            <img
                              src={`https://media-assets.swiggy.com/swiggy/image/upload/${dish.imageId}`}
                              className="w-[132px] h-[122px] sm:w-[156px] sm:h-[144px] object-cover rounded-lg"
                              alt={dish.name}
                            />
                          )}

                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="
                        absolute -bottom-4
                        bg-white text-[#60b246] font-bold
                        px-6 sm:px-8 py-1 rounded-lg
                        border shadow cursor-pointer
                      "
                          >
                            ADD
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </CategorySection>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
