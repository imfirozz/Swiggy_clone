import React, { useState } from "react";
import restaurantCoupons from "../../../../data/RestaurantCoupons.json";

export default function CouponDrawer({
  restaurantId,
  itemTotal,
  onClose,
  applyCoupon,
}) {
  const [manualCouponCode, setManualCouponCode] = useState("");

  console.log("CouponDrawer rendered with:", {
    restaurantId,
    itemTotal,
    availableRestaurants: Object.keys(restaurantCoupons),
  });

  //  coupons for this specific restaurant
  const restaurantData = restaurantCoupons[String(restaurantId)];

  // Filter to get only coupons for this restaurant
  const cards = restaurantData?.data?.cards || [];

  /* HELPERS  */
  const getNumberFromText = (text, regex) => {
    if (!text) return null;
    const match = text.match(regex);
    if (!match) return null;
    const value = Number(match[1]);
    return Number.isFinite(value) ? value : null;
  };

  const normalizeCoupon = (coupon) => {
    if (!coupon) return null;
    const description = coupon.description || "";

    const minFromText = getNumberFromText(description, /above\s*₹\s*([0-9]+)/i);
    const percentFromText = getNumberFromText(description, /([0-9]+)\s*%/);
    const maxFromText =
      getNumberFromText(
        description,
        /max(?:imum)?\s*discount:?\s*₹\s*([0-9]+)/i,
      ) ?? getNumberFromText(description, /up to\s*₹\s*([0-9]+)/i);
    const flatFromText =
      getNumberFromText(description, /₹\s*([0-9]+)\s*off/i) ??
      getNumberFromText(description, /flat\s*₹\s*([0-9]+)/i) ??
      getNumberFromText(description, /get\s*₹\s*([0-9]+)/i) ??
      getNumberFromText(description, /₹\s*([0-9]+)\s*cashback/i);

    let discountType = coupon.discountType;
    if (!discountType) {
      if (/%/.test(description)) discountType = "PERCENT";
      else if (/₹/.test(description)) discountType = "FLAT";
    }

    const minOrderValue = Number.isFinite(coupon.minOrderValue)
      ? coupon.minOrderValue
      : minFromText || 0;

    const discountValue = Number.isFinite(coupon.discountValue)
      ? coupon.discountValue
      : percentFromText;

    const discountAmount = Number.isFinite(coupon.discountAmount)
      ? coupon.discountAmount
      : flatFromText;

    const maxDiscount = Number.isFinite(coupon.maxDiscount)
      ? coupon.maxDiscount
      : maxFromText;

    return {
      ...coupon,
      minOrderValue,
      discountType,
      discountValue,
      discountAmount,
      maxDiscount,
    };
  };

  const isDiscountComputable = (coupon) => {
    if (!coupon) return false;
    if (coupon.discountType === "FLAT") {
      return Number.isFinite(coupon.discountAmount);
    }
    if (coupon.discountType === "PERCENT") {
      return Number.isFinite(coupon.discountValue);
    }
    return false;
  };

  const getLockedMessage = (coupon) => {
    const msg = coupon?.couponPreValidationStatus?.message;
    if (msg) return msg;

    const minValue = coupon?.minOrderValue || 0;
    if (itemTotal < minValue) {
      const remaining = Math.max(minValue - itemTotal, 0);
      return `Add ₹${remaining.toFixed(2)} more to unlock this coupon`;
    }

    return "This offer can't be applied automatically.";
  };

  const isCouponEligible = (coupon) => {
    if (!coupon) return false;

    const min = coupon.minOrderValue || 0;
    const eligible = itemTotal >= min;

    return eligible;
  };

  const calculateDiscount = (coupon) => {
    if (!coupon) return 0;

    if (!isCouponEligible(coupon)) {
      console.log("Coupon not eligible, returning 0");
      return 0;
    }

    let discount = 0;

    if (coupon.discountType === "FLAT") {
      discount = Number(coupon.discountAmount) || 0;
      console.log(`FLAT discount: ${discount} (from ${coupon.discountAmount})`);
    } else if (coupon.discountType === "PERCENT") {
      const discountPercent = Number(coupon.discountValue) || 0;
      const value = (itemTotal * discountPercent) / 100;
      const maxDiscount = Number(coupon.maxDiscount) || Infinity;
      discount = Math.min(value, maxDiscount);
    } else {
      console.log(`Unknown discount type: ${coupon.discountType}`);
    }

    console.log(`Final discount for ${coupon.couponCode}: ${discount}`);
    return discount;
  };

  // Handle manual coupon application
  const handleApplyManualCoupon = () => {
    if (!manualCouponCode.trim()) {
      alert("Please enter a coupon code");
      return;
    }

    // Find coupon by code in this restaurant coupons
    const couponCard = cards.find(
      (card) =>
        (card.cardType === "couponCard" ||
          card.cardType === "availableCouponCardV2" ||
          card.cardType === "unavailableCouponCardV2") &&
        card.data?.data?.couponCode === manualCouponCode.toUpperCase(),
    );

    if (!couponCard) {
      alert("Invalid coupon code for this restaurant");
      return;
    }

    const coupon = normalizeCoupon(couponCard.data?.data);

    if (!isDiscountComputable(coupon)) {
      alert("This offer can't be applied automatically.");
      return;
    }

    const discount = calculateDiscount(coupon);

    if (discount <= 0) {
      alert(getLockedMessage(coupon));
      return;
    }

    applyCoupon({
      couponCode: coupon.couponCode,
      discountAmount: discount,
      couponData: coupon,
    });
    onClose();
  };

  // Handle click on coupon card
  const handleCouponClick = (coupon) => {
    if (!isDiscountComputable(coupon)) {
      alert("This offer can't be applied automatically.");
      return;
    }

    const discount = calculateDiscount(coupon);

    if (discount <= 0) {
      alert(getLockedMessage(coupon));
      return;
    }

    applyCoupon({
      couponCode: coupon.couponCode,
      discountAmount: discount,
      couponData: coupon,
    });
    onClose();
  };

  // Check if there are any coupons for this restaurant
  const hasCoupons = cards.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* OVERLAY */}
      <div className="flex-1 bg-black/40" onClick={onClose} />

      {/* DRAWER */}
      <div
        className="w-full sm:w-[420px] max-w-[95vw] sm:max-w-none bg-white h-full p-4 sm:p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Apply Coupon</h2>
          <button onClick={onClose} className="text-2xl font-bold">
            ×
          </button>
        </div>

        {/* CURRENT ORDER TOTAL */}
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <p className="text-sm font-semibold">
            Current Order Total: ₹{itemTotal.toFixed(2)}
          </p>
        </div>

        {!hasCoupons ? (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No coupons available for this restaurant
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Restaurant ID: {restaurantId}
            </p>
          </div>
        ) : (
          cards.map((card, index) => {
            const type = card.cardType;
            const data = normalizeCoupon(card.data?.data);

            if (!data) return null;

            /* INPUT */
            if (type === "couponApplyWidget") {
              return (
                <div key={`input-${index}`} className="flex gap-2 mb-6">
                  <input
                    placeholder={
                      data.textPlaceholder ||
                      data.textPlaceHolder ||
                      "Enter coupon code"
                    }
                    className="border px-4 py-2 flex-1 rounded outline-none"
                    value={manualCouponCode}
                    onChange={(e) => setManualCouponCode(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleApplyManualCoupon()
                    }
                  />
                  <button
                    className="bg-[#fc8019] text-white px-6 rounded font-semibold"
                    onClick={handleApplyManualCoupon}
                  >
                    {data.buttonText || "APPLY"}
                  </button>
                </div>
              );
            }

            /* SECTION TITLE */
            if (type === "messageCard") {
              return (
                <p
                  key={`msg-${index}`}
                  className="font-bold text-sm text-gray-500 mt-6 mb-3"
                >
                  {/* {data.title || data.message} */}
                </p>
              );
            }

            /* COUPONS */
            if (
              type === "couponCard" ||
              type === "availableCouponCardV2" ||
              type === "unavailableCouponCardV2"
            ) {
              const computable = isDiscountComputable(data);
              const eligible = isCouponEligible(data) && computable;
              const minValue = data.minOrderValue || 0;
              const remaining = Math.max(minValue - itemTotal, 0);
              const discountAmount = calculateDiscount(data);

              console.log(`Coupon ${data.couponCode}:`, {
                eligible,
                minValue,
                remaining,
                discountAmount,
              });

              /* AVAILABLE */
              if (eligible) {
                return (
                  <div
                    key={data.couponCode}
                    className="border p-4 mb-4 rounded cursor-pointer hover:border-[#fc8019]"
                    onClick={() => handleCouponClick(data)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                        {data.couponCode}
                      </span>
                      <span className="text-sm font-semibold text-green-600">
                        Save ₹{discountAmount.toFixed(2)}
                      </span>
                    </div>

                    <p className="font-semibold mt-2">{data.title}</p>
                    <p className="text-sm text-gray-600">{data.description}</p>

                    <div className="mt-2 text-xs text-gray-500">
                      <p>Minimum order: ₹{minValue}</p>
                      <p>
                        Discount:{" "}
                        {data.discountType === "FLAT" && data.discountAmount
                          ? `₹${data.discountAmount}`
                          : data.discountType === "PERCENT" &&
                              data.discountValue
                            ? `${data.discountValue}%${
                                data.maxDiscount
                                  ? ` (max ₹${data.maxDiscount})`
                                  : ""
                              }`
                            : "See details"}
                      </p>
                    </div>

                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-[#60b246] text-sm font-semibold">
                        APPLY COUPON
                      </p>
                      <p className="text-sm font-semibold text-[#fc8019]">
                        {data.discountType === "PERCENT" && data.discountValue
                          ? `${data.discountValue}% off`
                          : data.discountType === "FLAT" && data.discountAmount
                            ? `₹${data.discountAmount} off`
                            : "Offer"}
                      </p>
                    </div>
                  </div>
                );
              }

              /* LOCKED */
              return (
                <div
                  key={`${data.couponCode}-locked`}
                  className="border p-4 mb-4 rounded opacity-60 cursor-not-allowed"
                >
                  <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">
                    {data.couponCode}
                  </span>

                  <p className="font-semibold mt-2">{data.title}</p>
                  <p className="text-sm text-gray-600">{data.description}</p>

                  <p className="text-xs text-red-500 mt-1">
                    {computable
                      ? getLockedMessage(data)
                      : "This offer can't be applied automatically."}
                  </p>
                  <p className="text-xs text-gray-500">
                    Minimum order required: ₹{minValue}
                  </p>
                </div>
              );
            }

            return null;
          })
        )}
      </div>
    </div>
  );
}
