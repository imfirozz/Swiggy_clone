import React from "react";
import { useNavigate } from "react-router";
import swiggyData from "../../data/swiggyData.json";

export default function Restro_Header() {
  const navigate = useNavigate();
  const headerData = swiggyData?.data?.cards[0]?.card?.card;
  const headerTitle = "What's on your mind?";
  const imageGridInfo = headerData?.imageGridCards?.info || [];

  function handleClick(item) {
    const link = item.action?.link;
    if (!link) return;

    const title = item.action?.text;

    try {
      const baseUrl = link.startsWith("http")
        ? link
        : `https://www.swiggy.com${link}`;

      const url = new URL(baseUrl);
      const pathMatch = url.pathname.match(/\/collections\/([^\/]+)/);
      const collectionId =
        pathMatch?.[1] || url.searchParams.get("collection_id");

      if (!collectionId) return;

      const searchContext = url.searchParams.get("search_context") || "";
      const dishType = (searchContext || title || "")
        .toLowerCase()
        .replace(/\s+/g, "");

      const params = new URLSearchParams();
      params.set("title", title || "");
      params.set("dish", dishType);

      navigate(`/collections/${collectionId}?${params.toString()}`);
    } catch (error) {
      console.error("URL parse error:", error);
    }
  }

  return (
    <div className="w-[92%] sm:w-[88%] lg:max-w-[80%] mx-auto px-2 sm:px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-10 px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">{headerTitle}</h1>
      </div>

      {/* Categories */}
      <div className="relative">
        <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 px-2 sm:px-4 scrollbar-hide">
          {imageGridInfo.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center cursor-pointer flex-shrink-0 group"
              onClick={() => handleClick(item)}
            >
              <div className="w-[120px] h-[150px] sm:w-[132px] sm:h-[168px] lg:w-[144px] lg:h-[180px] rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all">
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/w_288,h_360/${item.imageId}`}
                  alt={item.action?.text}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="mt-3 text-center w-[120px] sm:w-[132px] lg:w-[144px]">
                <span className="font-semibold text-gray-800">
                  {item.action?.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
