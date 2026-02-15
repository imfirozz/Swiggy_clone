import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItems, Increament, Decreament } from "../../Store/Cart_slicer";

export default function CategorySection({ category, children }) {
  if (!category || !category.title) return null;

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true);

  const cartItems = useSelector((state) => state.Cart_slice.items);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  /*  HELPERS  */

  const getPrice = (item) => {
    if (!item) return null;
    if (Number.isFinite(item.finalPrice)) return item.finalPrice;
    if (Number.isFinite(item.price)) return item.price;
    if (Number.isFinite(item.defaultPrice)) return item.defaultPrice;

    const sizeGroup = item.variantsV2?.variantGroups?.find((g) =>
      g.name?.toLowerCase().includes("size"),
    );

    if (sizeGroup) {
      const v =
        sizeGroup.variations?.find((x) => x.default === 1) ||
        sizeGroup.variations?.[0];
      if (Number.isFinite(v?.price)) return v.price;
    }
    return null;
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-700";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const getDishRating = (item) => {
    const rating = item?.ratings?.aggregatedRating?.rating;
    const count =
      item?.ratings?.aggregatedRating?.ratingCount ||
      item?.ratings?.aggregatedRating?.ratingCountV2;
    if (!rating) return null;
    return { rating, count };
  };

  const validItems =
    Array.isArray(category.items) &&
    category.items.filter((item) => item && item.name);

  return (
    <div className="w-full border-b pb-4 mb-6">
      {/* HEADER */}
      <div
        className="flex justify-between items-center w-full cursor-pointer hover:bg-gray-50 p-2 rounded"
        onClick={toggleOpen}
      >
        <h2 className="text-lg sm:text-xl font-bold">{category.title}</h2>

        <div
          className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* CONTENT */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[5000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        {children && <div className="space-y-4">{children}</div>}

        {!children && validItems?.length > 0 && (
          <div className="space-y-4">
            {validItems.map((item, index) => {
              const price = getPrice(item);
              const ratingData = getDishRating(item);

              const itemCount =
                cartItems.find((i) => i.id === item.id)?.quantity || 0;

              return (
                <div
                  key={item.id || index}
                  className="flex flex-col sm:flex-row justify-between gap-4 border-b border-[#e9e9eb] py-6 relative last:border-b-0"
                >
                  {/* LEFT */}
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>

                    {ratingData && (
                      <div className="mt-1 flex items-center gap-1 text-sm">
                        <span
                          className={`font-semibold ${getRatingColor(
                            Number(ratingData.rating),
                          )}`}
                        >
                          ★ {ratingData.rating}
                        </span>
                        {ratingData.count && (
                          <span className="text-[#686b78]">
                            ({ratingData.count})
                          </span>
                        )}
                      </div>
                    )}

                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    {price && !isNaN(price) && (
                      <p className="mt-2 font-medium">
                        ₹{Math.round(price / 100)}
                      </p>
                    )}
                  </div>

                  {/* RIGHT */}
                  <div className="relative w-[132px] h-[122px] sm:w-[156px] sm:h-[144px] flex justify-center self-end sm:self-auto">
                    {item.imageId ? (
                      <img
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                        alt={item.name}
                        className="w-[132px] h-[122px] sm:w-[156px] sm:h-[144px] object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-[132px] h-[122px] sm:w-[156px] sm:h-[144px]" />
                    )}

                    {itemCount === 0 ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(
                            addItems({
                              ...item,
                              restaurantId: category.restaurantId,
                            }),
                          );
                        }}
                        className="absolute -bottom-4 bg-white text-[#60b246] font-bold px-6 sm:px-8 py-1 rounded-lg border shadow cursor-pointer hover:bg-gray-50"
                      >
                        ADD
                      </button>
                    ) : (
                      <div className="absolute -bottom-4 bg-white text-green-600 flex gap-4 items-center px-3 sm:px-4 py-1 rounded-lg border shadow text-base sm:text-xl">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(Decreament({ id: item.id }));
                          }}
                        >
                          -
                        </button>

                        <span>{itemCount}</span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(Increament({ id: item.id }));
                          }}
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
        )}
      </div>
    </div>
  );
}
