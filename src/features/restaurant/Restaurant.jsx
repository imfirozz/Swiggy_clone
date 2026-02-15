import { useEffect, useRef, useState } from "react";
import Restaurant_card from "./Restaurant_card";
import Shimmer_effect from "./Shimmer_effect";
import swiggyData from "../../data/swiggyData.json";
import React from "react";
import Restro_Header from "./Restro_Header";
import Top_Restro from "./Top_Restro";
export default function Restaurant() {
  const [restData, setRestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const timer = setTimeout(() => {
      const cards = swiggyData?.data?.cards || [];
      let restaurants = [];

      for (const item of cards) {
        const list = item?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        if (Array.isArray(list)) {
          restaurants = list;
          break;
        }
      }

      const cleanRestaurants = restaurants.filter(
        (r) => r && r.info && r.info.cloudinaryImageId,
      );

      setRestData(cleanRestaurants);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Shimmer_effect />;
  }

  if (restData.length === 0) {
    return <h1 className="text-center mt-20">No restaurants found</h1>;
  }
  return (
    <>
      {loading && <Shimmer_effect />}

      {!loading && restData.length === 0 && (
        <h1 className="text-center mt-20">No restaurants found</h1>
      )}

      <div className="w-full">
        <Restro_Header />
      </div>

      <div className="w-full">
        <Top_Restro />
      </div>

      {!loading && restData.length > 0 && (
        <div className="w-[92%] max-w-[1200px] mx-auto mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {restData.map((rest) => (
              <Restaurant_card key={rest.info.id} rest_info={rest} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
