import Grocery_dada from "../../data/Grocery_data";
import Grocery_Card from "./Grocery_Card";
import React from "react";

export default function Grocery() {
  return (
    <div>
      <div className="text-[rgba(2,6,12,0.92)] text-[22px] sm:text-[24px] lg:text-[26px] pt-10 sm:pt-14 lg:pt-20 font-bold px-4 ml-[41px] sm:px-6 lg:px-10">
        Shop groceries on Instamart
      </div>

      <div className="w-[90%] sm:w-[90%] mx-auto mt-6 sm:mt-8 lg:mt-10 overflow-x-auto scrollbar-hide scroll-smooth">
        <div className="grid grid-flow-col gap-4 auto-cols-max">
          {Grocery_dada.map((Grocery_data) => (
            <Grocery_Card
              key={Grocery_data.id}
              Grocery_data={Grocery_data}
            ></Grocery_Card>
          ))}
        </div>
      </div>
    </div>
  );
}
