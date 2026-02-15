import React from "react";
import { useNavigate } from "react-router";
import food_data from "../../data/fooddata";
import Food_Card from "./Food_Card";

export default function Food_Options() {
  const navigate = useNavigate();

  return (
    <section className="w-full">
      <h2 className="text-[rgba(2,6,12,0.92)] text-[22px] sm:text-[24px] lg:text-[26px] ml-[41px] font-bold pt-10 sm:pt-14 lg:pt-20 px-4 sm:px-6 lg:px-10">
        Order our best food options
      </h2>

      <div className="w-[90%] sm:w-[90%] mx-auto mt-6 sm:mt-8 lg:mt-10 overflow-x-auto scrollbar-hide">
        <div className="grid grid-flow-col grid-rows-2 gap-4 auto-cols-max">
          {food_data.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                const dishName = item.action?.text || "";
                const dishType = dishName.toLowerCase().replace(/\s+/g, "");

                navigate(
                  `/collections/${item.id}?title=${encodeURIComponent(dishName)}&dish=${dishType}`,
                );
              }}
              className="block cursor-pointer"
            >
              <Food_Card food_data={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
