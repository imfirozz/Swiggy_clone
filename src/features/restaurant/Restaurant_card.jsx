import React from "react";
import { Link } from "react-router";
import {
  getRestaurantImageCandidates,
  handleRestaurantImageFallback,
} from "../../Utils/restaurantImage";

export default function Restaurant_card({ rest_info }) {
  if (!rest_info?.info) return null;

  const {
    name,
    cloudinaryImageId,
    cuisines,
    avgRating,
    areaName,
    sla,
    aggregatedDiscountInfoV3,
  } = rest_info.info;

  const slaString = sla?.slaString;

  const imageCandidates = getRestaurantImageCandidates(cloudinaryImageId);

  return (
    <>
      <div>
        <Link to={"/city/bhopal/" + rest_info?.info?.id}>
          <div className="w-full rounded-xl overflow-hidden cursor-pointer transform transition duration-200 hover:scale-95">
            {/* IMAGE */}
            <div className="relative w-full h-[190px] rounded-2xl bg-gray-100 overflow-hidden flex">
              <img
                src={imageCandidates[0]}
                alt={name}
                loading="lazy"
                className="w-full h-full rounded-2xl object-cover hover:scale-105 transition-transform duration-300"
                data-fallback-index="0"
                onError={(e) =>
                  handleRestaurantImageFallback(e, imageCandidates)
                }
              />

              {/* bottom shadow  */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 via-black/60  to-transparent" />

              {/* offer on image */}
              {aggregatedDiscountInfoV3?.header && (
                <div className="absolute bottom-2 left-2 text-white text-[16px] font-extrabold leading-none whitespace-nowrap">
                  {aggregatedDiscountInfoV3.header}
                  {aggregatedDiscountInfoV3.subHeader && (
                    <span className="ml-1 text-[14px] font-semibold opacity-90">
                      {aggregatedDiscountInfoV3.subHeader}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="px-2 pt-3 pb-3 flex flex-col">
              <h3 className="text-[18px] font-semibold text-gray-900 truncate leading-tight">
                {name}
              </h3>

              <p className="text-[16px] text-gray-500 truncate mt-1">
                {cuisines?.join(", ")}
              </p>

              <div className="flex items-center justify-between mt-2 text-[16px] text-gray-700">
                <div className="flex items-center gap-1">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-sm">
                    ★
                  </span>
                  <span className="font-medium">{avgRating || "New"}</span>
                </div>

                <span className="font-medium">{slaString}</span>
              </div>

              <p className="text-[16px] text-gray-500 truncate mt-1">
                {areaName}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
