import React from "react";
import { Link } from "react-router";
import swiggyData from "../../data/swiggyData.json";
import {
  getRestaurantImageCandidates,
  handleRestaurantImageFallback,
} from "../../Utils/restaurantImage";

export default function Top_Restro() {
  // all cards
  const cards = swiggyData?.data?.cards || [];

  // top restaurant chains section
  const topChainsSection = cards[1]?.card?.card;
  const topChains =
    topChainsSection?.gridElements?.infoWithStyle?.restaurants || [];

  //  restaurants section
  const allRestaurantsSection = cards[2]?.card?.card || cards[3]?.card?.card;
  const allRestaurants =
    allRestaurantsSection?.gridElements?.infoWithStyle?.restaurants ||
    allRestaurantsSection?.restaurants ||
    [];

  const totalRestaurants = allRestaurants.length;

  return (
    <section className="bg-[#f7f7f8] py-10 sm:py-12">
      <div className="w-[90%] max-w-[1250px] mx-auto">
        {/*  TOP RESTAURANT CHAINS */}
        {topChains.length > 0 && (
          <div className="mb-12">
            {/* Section Title */}
            <div className="flex items-end justify-between gap-4">
              <div>
                <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#282c3f] tracking-tight">
                  {topChainsSection?.header?.title ||
                    "Top restaurant chains in Bhopal"}
                </h1>
                <p className="text-[#686b78] text-sm sm:text-[15px] mt-1">
                  Handpicked favorites with great offers
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs text-[#93959f]">
                <span className="w-2 h-2 rounded-full bg-[#ffa700]" />
                <span>Scroll to explore</span>
              </div>
            </div>

            {/* Horizontal Scroll for Top Chains */}
            <div className="relative mt-6">
              {/* Left Gradient Fade */}
              <div className="absolute left-0 top-0 bottom-0 w-10 pointer-events-none" />

              {/* Scrollable Container */}
              <div className="flex overflow-x-auto gap-5 sm:gap-6 pb-4 px-1 snap-x snap-mandatory scroll-smooth scrollbar-hide">
                {topChains.map((restaurant) => {
                  const imageCandidates = getRestaurantImageCandidates(
                    restaurant.info.cloudinaryImageId,
                  );

                  return (
                    <Link
                      key={restaurant.info.id}
                      to={`/city/bhopal/${restaurant.info.id}`}
                      className="flex-shrink-0 w-[260px] sm:w-[280px] lg:w-[300px] group snap-start"
                    >
                      {/* Restaurant Card  */}
                      <div className="bg-white rounded-2xl border border-[#ececef] hover:border-[#d9dbe1] shadow-[0_1px_0_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(40,44,63,0.18)] transition-all duration-200 overflow-hidden h-full">
                      {/* Image Container */}
                      <div className="relative rounded-2xl h-44 sm:h-48 overflow-hidden">
                        <img
                          src={imageCandidates[0]}
                          alt={restaurant.info.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          data-fallback-index="0"
                          onError={(e) =>
                            handleRestaurantImageFallback(e, imageCandidates)
                          }
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                        {/* Offer Ribbon  */}
                        {restaurant.info.aggregatedDiscountInfoV3 && (
                          <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-r from-[#ffa700] to-[#ff5c35] text-white text-[12px] font-bold px-3 py-2 rounded-xl text-center shadow-md">
                            {restaurant.info.aggregatedDiscountInfoV3.header}
                            {restaurant.info.aggregatedDiscountInfoV3
                              .subHeader &&
                              ` ${restaurant.info.aggregatedDiscountInfoV3.subHeader}`}
                          </div>
                        )}
                      </div>

                      {/* Restaurant Info */}
                      <div className="p-4 sm:p-5">
                        <h3 className="font-bold text-[#282c3f] text-[18px] sm:text-[20px] mb-3 line-clamp-1">
                          {restaurant.info.name}
                        </h3>

                        {/* Rating & Delivery Time  */}
                        <div className="flex items-center gap-2.5 mb-3">
                          <span className="inline-flex items-center gap-1 bg-[#ecf7f1] text-[#1f7a57] text-xs font-bold px-2.5 py-1 rounded-full">
                            ★ {restaurant.info.avgRating || "4.0"}
                          </span>
                          <span className="text-[#c2c4cc] text-xs">•</span>
                          <span className="text-[#686b78] text-xs font-medium">
                            {restaurant.info.sla?.deliveryTime || "30"} mins
                          </span>
                        </div>

                        {/* Cuisines */}
                        <p className="text-[#686b78] text-sm mb-2 line-clamp-1">
                          {restaurant.info.cuisines?.join(", ")}
                        </p>

                        {/* Area */}
                        <p className="text-[#93959f] text-sm line-clamp-1">
                          {restaurant.info.areaName}
                        </p>
                      </div>
                    </div>
                    </Link>
                  );
                })}
              </div>

              {/* Right Gradient Fade */}
              <div className="absolute right-0 top-0 bottom-0 w-10 pointer-events-none" />
            </div>
          </div>
        )}

        {/* SECTION 2: ALL RESTAURANTS */}
        <div className="border-t border-[#e3e4e8] pt-10">
          {/* Header with Total Count  */}
          <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#282c3f] tracking-tight">
                {allRestaurantsSection?.header?.title ||
                  "Restaurants with online food delivery in Bhopal"}
              </h1>
              <p className="text-[#686b78] text-sm sm:text-[15px] mt-1">
                {totalRestaurants > 0
                  ? `${totalRestaurants} options nearby`
                  : "Browse the latest places"}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#93959f]">
              <span className="inline-flex items-center gap-2 bg-white border border-[#e9e9eb] rounded-full px-3 py-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0f8a65]" />
                Fast delivery picks
              </span>
            </div>
          </div>

          {/* RESTAURANTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {allRestaurants.map((restaurant) => {
              const imageCandidates = getRestaurantImageCandidates(
                restaurant.info.cloudinaryImageId,
              );

              return (
                <Link
                  key={restaurant.info.id}
                  to={`/city/bhopal/${restaurant.info.id}`}
                  className="group"
                >
                  {/* Restaurant Card  */}
                  <div className="bg-white rounded-2xl border border-[#ececef] hover:border-[#d9dbe1] shadow-[0_1px_0_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(40,44,63,0.16)] transition-all duration-200 overflow-hidden h-full hover:-translate-y-0.5">
                  {/* Restaurant Image */}
                  <div className="relative h-56 sm:h-60 overflow-hidden">
                    <img
                      src={imageCandidates[0]}
                      alt={restaurant.info.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      data-fallback-index="0"
                      onError={(e) =>
                        handleRestaurantImageFallback(e, imageCandidates)
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between">
                      {/* Discount Badge  */}
                      {restaurant.info.aggregatedDiscountInfoV3 && (
                        <div className="bg-gradient-to-r from-[#ff5c35] to-[#ffa700] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                          {restaurant.info.aggregatedDiscountInfoV3.header}
                          {restaurant.info.aggregatedDiscountInfoV3.subHeader &&
                            ` ${restaurant.info.aggregatedDiscountInfoV3.subHeader}`}
                        </div>
                      )}

                      {/* Veg/Non-Veg Tag */}
                      <div className="bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center border border-[#d4d5d9] shadow-sm">
                        {restaurant.info.veg ? (
                          <div className="w-4 h-4 bg-[#0f8a65] rounded-full border border-[#0f8a65]" />
                        ) : (
                          <div className="w-4 h-4 bg-[#e43b4f] rounded-full border border-[#e43b4f]" />
                        )}
                      </div>
                    </div>

                    {/* Delivery Time  */}
                    <div className="absolute bottom-4 left-4 bg-white/90 text-[#282c3f] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                      {restaurant.info.sla?.deliveryTime || "30"} mins
                    </div>
                  </div>

                  {/* Restaurant Details */}
                  <div className="p-5">
                    <h3 className="font-bold text-[#282c3f] text-[18px] mb-3 line-clamp-1">
                      {restaurant.info.name}
                    </h3>

                    {/* Rating & Delivery Time */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="inline-flex items-center gap-1 bg-[#ecf7f1] text-[#1f7a57] text-xs font-bold px-2.5 py-1 rounded-full">
                        ★ {restaurant.info.avgRating || "4.0"}
                      </span>
                      <span className="text-[#c2c4cc] text-xs">•</span>
                      <span className="text-[#686b78] text-xs font-medium">
                        {restaurant.info.sla?.deliveryTime || "30"} mins
                      </span>
                    </div>

                    {/* Cuisines */}
                    <p className="text-[#686b78] text-sm mb-4 line-clamp-2 min-h-[40px]">
                      {restaurant.info.cuisines?.join(", ")}
                    </p>

                    {/* Area & Price */}
                    <div className="flex items-center justify-between text-[#686b78] text-sm">
                      <span className="line-clamp-1">
                        {restaurant.info.areaName}
                      </span>
                      <span className="font-semibold text-[#3e4152]">
                        {restaurant.info.costForTwo || "₹400 for two"}
                      </span>
                    </div>
                  </div>

                  {/* Quick Action  */}
                  <div className="px-5 pb-5 pt-3 border-t border-[#e9e9eb]">
                    <div className="w-full bg-[#fff2e9] text-[#ff5c35] hover:bg-[#ffe2d1] font-semibold py-2.5 text-sm rounded-lg transition-colors text-center">
                      QUICK VIEW
                    </div>
                  </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
