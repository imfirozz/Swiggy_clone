import React from "react";

export default function Food_Card({ food_data }) {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-xl shadow w-36 sm:w-40 md:w-44 lg:w-48 cursor-pointer">
      <img
        className="w-full h-28 sm:h-32 md:h-36 lg:h-40 object-cover rounded-lg"
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${food_data.imageId}`}
        alt={food_data?.action?.text}
      />
    </div>
  );
}
