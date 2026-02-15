import React from "react";
import Dine_Restaurant_data from "../../data/Dine_Restourant_data";
import Dine_Restaurant_Card from "./Dine_Restaurant_Card";

export default function Dine_Restaurant() {
  const restaurants =
    Dine_Restaurant_data[0]?.stackedDetails?.dineoutRestaurants?.restaurants;

  return (
    <section className="bg-white py-8 sm:py-10 lg:py-14">
      <div className="w-[92%] sm:w-[90%] mx-auto px-2 sm:px-4">
        {/* Heading */}
        <h2 className="text-[22px] sm:text-[24px] lg:text-[26px] font-bold text-[#282c3f]">
          Discover best restaurants on Dineout
        </h2>

        {/* Horizontal scroll */}
        <div className="mt-4 sm:mt-5 -mx-2 sm:-mx-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 sm:gap-[14px] px-2 sm:px-4">
            {restaurants?.map((restaurant) => (
              <div key={restaurant.info.id} className="flex-shrink-0">
                <Dine_Restaurant_Card Res_Data={restaurant} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
