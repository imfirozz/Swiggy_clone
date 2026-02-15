import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addItems, Increament, Decreament } from "../../Store/Cart_slicer";
import restaurantExtraData from "../../data/restaurantExtraData.json";
import SearchShimmer from "./Search_shimmer";

export default function Restaurant_Search() {
  const { id: restaurantId } = useParams();

  const menuResponse = restaurantExtraData[restaurantId];

  const restaurantName =
    menuResponse?.data?.cards?.find(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.Restaurant",
    )?.card?.card?.info?.name || "Restaurant";

  /* SEARCH STATE */
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.Cart_slice.items);

  /* DEBOUNCE */
  useEffect(() => {
    if (searchText.length < 2) {
      setDebouncedText("");
      setLoading(false);
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      setDebouncedText(searchText);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  /*  ALL DISHES */
  const regularCards =
    menuResponse?.data?.cards?.find((c) => c.groupedCard)?.groupedCard
      ?.cardGroupMap?.REGULAR?.cards || [];

  const allItems = [];

  regularCards.forEach((c) => {
    const type = c.card?.card?.["@type"];

    // Normal category
    if (
      type === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) {
      c.card.card.itemCards?.forEach((i) => {
        if (i.card?.info) allItems.push(i.card.info);
      });
    }

    // Nested category
    if (
      type ===
      "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
    ) {
      c.card.card.categories?.forEach((cat) => {
        cat.itemCards?.forEach((i) => {
          if (i.card?.info) allItems.push(i.card.info);
        });
      });
    }
  });

  /* SEARCH FILTER */
  const filteredItems =
    debouncedText.length < 2
      ? []
      : allItems.filter((item) =>
          item.name.toLowerCase().includes(debouncedText.toLowerCase()),
        );

  const getPrice = (item) => {
    if (item.price) return item.price / 100;
    if (item.defaultPrice) return item.defaultPrice / 100;
    return null;
  };

  const getRating = (item) => item?.ratings?.aggregatedRating?.rating;

  /* UI */
  return (
    <div className="w-[94%] sm:w-[90%] lg:w-[80%] mx-auto mt-6 sm:mt-10">
      {/* SEARCH BAR */}
      <div
        className="
          flex items-center
          bg-[rgba(2,6,12,0.06)]
          rounded-2xl px-4 sm:px-6 py-3 gap-3 sm:gap-4
          focus-within:ring-2 focus-within:ring-[#fc8019]
        "
      >
        <input
          autoFocus
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={`Search in ${restaurantName}`}
          className="
            w-full bg-transparent text-[14px] sm:text-[16px]
            text-center placeholder:text-[#686b78]
            outline-none
          "
        />
        🔍
      </div>

      {/* SEARCH RESULTS */}
      <div className="mt-8">
        {!loading && debouncedText && filteredItems.length === 0 && (
          <p className="text-center text-gray-500">No items found</p>
        )}

        {loading && <SearchShimmer />}

        {filteredItems.map((item, index) => {
          const price = getPrice(item);
          const rating = getRating(item);
          const itemCount =
            cartItems.find((i) => i.id === item.id)?.quantity || 0;

          return (
            <div
              key={`${item.id}-${index}`}
              className="flex flex-col sm:flex-row justify-between gap-4 border-b pb-6 mb-6"
            >
              {/* LEFT */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-4 h-4 border-2 flex items-center justify-center
                      ${item.isVeg === 1 ? "border-green-600" : "border-red-600"}
                    `}
                  >
                    <span
                      className={`w-2 h-2 rounded-full
                        ${item.isVeg === 1 ? "bg-green-600" : "bg-red-600"}
                      `}
                    />
                  </span>

                  <p className="font-semibold text-[#02060c] text-sm sm:text-base">{item.name}</p>
                </div>

                {rating && (
                  <p className="text-sm text-green-700 mt-1">★ {rating}</p>
                )}

                {item.description && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                )}

                {price && (
                  <p className="mt-2 font-medium text-[#02060c]">₹{price}</p>
                )}
              </div>

              {/* RIGHT */}
              <div className="relative w-[132px] h-[122px] sm:w-[156px] sm:h-[144px] flex justify-center self-end sm:self-auto">
                {item.imageId && (
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                    className="w-[132px] h-[122px] sm:w-[156px] sm:h-[144px] object-cover rounded-lg"
                    alt={item.name}
                  />
                )}

                {itemCount === 0 ? (
                  <button
                    onClick={() =>
                      dispatch(addItems({ ...item, restaurantId }))
                    }
                    className="
                      absolute -bottom-4
                      bg-white text-[#60b246] font-bold
                      px-6 sm:px-8 py-1 rounded-lg
                      border shadow cursor-pointer
                    "
                  >
                    ADD
                  </button>
                ) : (
                  <div
                    className="
                      absolute -bottom-4
                      bg-white text-[#60b246] flex gap-4 items-center
                      px-3 sm:px-4 py-1 rounded-lg border shadow text-base sm:text-lg
                    "
                  >
                    <button
                      onClick={() => dispatch(Decreament({ id: item.id }))}
                    >
                      -
                    </button>
                    <span>{itemCount}</span>
                    <button
                      onClick={() => dispatch(Increament({ id: item.id }))}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
