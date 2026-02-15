import React from "react";

export default function Dine_Restaurant_Card({ Res_Data }) {
  const info = Res_Data?.info;
  const imageId = info?.mediaFiles?.[0]?.url;
  const ratingValue = info?.rating?.value || "4.0";

  const prebookOffer = info?.offerInfoV2?.otherOffers?.offers?.[0];
  const prebookText = prebookOffer?.header
    ? `${prebookOffer.header} on pre-booking`
    : null;

  const offerCount = info?.vendorOffer?.offerCount || 0;
  const moreText = offerCount > 1 ? `+ ${offerCount - 1} more` : "";

  const bankOffer =
    info?.customerOffer?.info?.description || "Up to 10% off with bank offers";

  const extraOffer =
    info?.vendorOffer?.infos?.[0]?.header ||
    info?.customerOffer?.infos?.[0]?.header;

  return (
    <a
      href={Res_Data?.cta?.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group w-[260px] sm:w-[280px] lg:w-[300px] bg-white border border-[#e9e9eb] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* IMAGE */}
      <div className="relative w-full h-[170px] sm:h-[180px] lg:h-[188px] rounded-2xl overflow-hidden">
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${imageId}`}
          alt={info?.name}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />

        <p className="absolute bottom-3 left-3 text-white font-semibold text-[14px] sm:text-[15px] lg:text-[16px] drop-shadow">
          {info?.name}
        </p>

        <span className="absolute bottom-3 right-3 bg-white/90 text-[#1f9254] text-[12px] font-bold px-2 py-1 rounded-full">
          ★ {ratingValue}
        </span>
      </div>

      {/* BODY */}
      <div className="px-4 pt-3 pb-4">
        {/* Cuisine + location + cost + distance */}
        <div className="flex items-start justify-between text-[12px] sm:text-[13px] text-[#686b78] transition-colors duration-200 group-hover:text-[#3d4152]">
          {/* Left */}
          <div className="flex flex-col gap-[2px] max-w-[70%]">
            <p className="line-clamp-1">
              {info?.cuisines?.slice(0, 2).join(", ")}
            </p>
            <p className="text-[12px] transition-colors duration-200">
              {info?.locality}
            </p>
          </div>

          {/* Right */}
          <div className="text-right text-[12px]">
            <p className="font-medium text-[#3d4152] transition-colors duration-200 group-hover:text-[#282c3f]">
              {info?.costForTwo || "₹2000 for two"}
            </p>
            <p className="transition-colors duration-200">
              {info?.locationInfo?.distanceString || "2 km"}
            </p>
          </div>
        </div>

        {/* Table booking */}
        <div className="inline-flex items-center gap-2 mt-3 text-[12px] text-[#686b78] border border-[#e9e9eb] px-2.5 py-1 rounded transition-colors duration-200 group-hover:bg-[#f8f9fb]">
          <span className="w-4 h-4 flex items-center justify-center bg-[#f2f3f7] rounded">
            ✓
          </span>
          Table booking
        </div>

        {/* Primary offer */}
        {prebookText && (
          <div className="mt-3 flex items-center gap-2 bg-[#1f9254] text-white text-[12px] font-semibold px-3 py-2 rounded-lg transition-colors duration-200">
            <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
              %
            </span>
            <span className="truncate">{prebookText}</span>
            {moreText && (
              <span className="ml-auto text-[11px] font-semibold">
                {moreText}
              </span>
            )}
          </div>
        )}

        {/* Bank offer */}
        {bankOffer && (
          <div className="mt-2 text-[12px] text-[#1f9254] bg-[#dff8eb] px-3 py-2 rounded-lg transition-colors duration-200">
            {bankOffer}
          </div>
        )}

        {/* Extra offer */}
        {extraOffer && (
          <div className="mt-2 text-[12px] font-semibold text-[#6c4dd8] transition-colors duration-200 group-hover:text-[#5939c6]">
            {extraOffer}
          </div>
        )}
      </div>
    </a>
  );
}
