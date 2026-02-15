import React from "react";
export default function Grocery_Card({ Grocery_data }) {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-xl shadow w-36 sm:w-40 md:w-44 lg:w-48">
      <a href={Grocery_data?.action?.link}>
        <img
          className="w-full h-28 sm:h-32 md:h-36 lg:h-40 object-cover rounded-lg"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${Grocery_data.imageId}`}
          alt={Grocery_data.action?.text}
        />
        <h1 className="font-bold text-base sm:text-lg lg:text-[20px] text-center">
          {" "}
          {Grocery_data?.action?.text}
        </h1>
      </a>
    </div>
  );
}
