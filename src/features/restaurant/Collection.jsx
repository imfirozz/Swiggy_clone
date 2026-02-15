import React, { useEffect, useState, useMemo } from "react";
import FilterSection from "./filters/FilterSection";
import { Link } from "react-router";
import swiggyData from "../../data/swiggyData.json";

import { ShimmerCard } from "./filters/Top_Shimmer";

const DISH_MAP = {
  pizza: ["pizza", "pizzeria", "italian", "domino's", "pizza hut", "oven"],
  burger: [
    "burger",
    "fast food",
    "whopper",
    "mcdonald",
    "burger king",
    "fast-food",
  ],
  biryani: [
    "biryani",
    "hyderabadi",
    "dum biryani",
    "rice",
    "mutton biryani",
    "chicken biryani",
  ],
  dosa: ["dosa", "south indian", "uttapam", "idli", "vada", "masala dosa"],
  momos: ["momo", "dumpling", "steamed", "tibetan", "nepalese"],
  noodles: ["noodles", "chinese", "hakka", "chowmein", "ramen", "pasta"],
  cake: ["cake", "bakery", "desserts", "pastry", "sweets", "cream"],
  waffle: ["waffle", "desserts", "belgian", "ice cream"],
  paratha: [
    "paratha",
    "north indian",
    "lachha",
    "stuffed",
    "alooparatha",
    "parantha",
  ],
  rolls: ["roll", "kathi", "frankie", "wrap", "spring roll"],
  chinese: ["chinese", "manchurian", "schezwan", "dim sum", "soup", "noodles"],
  northindian: [
    "north indian",
    "tandoori",
    "butter chicken",
    "naan",
    "roti",
    "paneer",
  ],
  southindian: ["south indian", "dosa", "idli", "vada", "sambar", "chutney"],
  icecream: ["ice cream", "gelato", "frozen yogurt", "dessert", "sundae"],
  thali: ["thali", "meal", "combo", "platter", "full meal"],
  sandwich: ["sandwich", "sub", "grilled", "club", "toast"],
  coffee: ["coffee", "cafe", "espresso", "cappuccino", "latte", "americano"],
  pastry: ["pastry", "baker", "croissant", "danish", "éclair", "patisserie"],
  khichdi: ["khichdi", "khichadi", "rice", "lentil", "comfort food"],
  pasta: ["pasta", "italian", "spaghetti", "penne", "fettuccine", "macaroni"],
  "pav bhaji": ["pav bhaji", "street food", "mumbai", "butter", "bhaji"],
};

// collection ID to dish types detection
const COLLECTION_TO_DISH = {
  83631: "pizza",
  83637: "burger",
  2568574: "burger",

  83639: "biryani",
  2568016: "pizza",
  80424: "dosa",
  2568015: "cholebhature",
  83669: "rolls",
  83649: "chinese",
  83650: "thali",
  83658: "southindian",
  83660: "icecream",
  83655: "cake",
  2568312: "cake",
  80463: "noodles",
  116178: "waffle",
  80475: "parotta",
  83659: "coffee",
  2568332: "coffee",
  80355: "pastry",
  2568330: "shawarma",
  80455: "khichdi",
  80479: "pasta",
  83673: "shake",
  2568019: "tea",
  2568349: "samosa",
  80362: "pav bhaji",
};

// Collection descriptions
const COLLECTION_DESCRIPTIONS = {
  pizza: "Savor the cheesy, delicious slices of heaven",
  biryani:
    "Taste these delectable classics, delectable biryanis to make your day",
  burger: "Juicy burgers to satisfy your cravings",
  rolls: "Delicious rolls and wraps for quick bites",
  chinese: "Chinese cuisine for oriental flavors",
  thali: "Complete meals with variety",
  southindian: "Authentic South Indian flavors",
  icecream: "Sweet and creamy delights",
  cake: "Sweet treats and desserts",
  dosa: "Crispy, savory South Indian crepes",
  noodles: "Slurp-worthy noodle dishes from around the world",
  waffle: "Crispy, golden waffles with delicious toppings",
  paratha: "Flaky, buttery Indian flatbreads",
  coffee: "Aromatic brews to perk up your day",
  pastry: "Flaky, buttery baked delights",
  khichdi: "Comforting rice and lentil porridge",
  pasta: "Italian pasta dishes in creamy and tangy sauces",
  "pav bhaji": "Buttery, spicy Mumbai street food classic",
};

const isLocalhost = () => {
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
};

const normalizeRestaurant = (restaurant) => {
  const info = restaurant?.info || restaurant || {};
  const avgRating = Number(info.avgRating) || 0;
  const totalRatings = Number(String(info.totalRatings || "").replace(/\D/g, "")) || 0;

  let costDisplay = info.costForTwoMessage;
  if (!costDisplay && info.costForTwo) {
    const cost = Number(info.costForTwo) / 100;
    costDisplay = Number.isFinite(cost) ? `₹${Math.round(cost)} for two` : "";
  }
  if (!costDisplay) costDisplay = "₹400 for two";

  return {
    id: String(info.id || `${info.name || "restaurant"}-${Math.random()}`),
    name: info.name || "Restaurant",
    cuisines: info.cuisines || [],
    imageId: info.cloudinaryImageId,
    rating: avgRating,
    totalRatings,
    cost: costDisplay,
    time: info.sla?.deliveryTime || 30,
    area: info.areaName || info.locality || "",
    locality: info.locality || "",
    open: info.availability?.opened !== false,
    discount: info.aggregatedDiscountInfoV3 || null,
    promoted: Boolean(info.promoted),
    veg: Boolean(info.veg),
  };
};

const getStaticRestaurants = (dishType) => {
  const cards = swiggyData?.data?.cards || [];
  const list = [];

  cards.forEach((rootCard) => {
    const card = rootCard?.card?.card;

    const directRestaurants =
      card?.gridElements?.infoWithStyle?.restaurants || card?.restaurants;
    if (Array.isArray(directRestaurants) && directRestaurants.length > 0) {
      list.push(...directRestaurants);
    }

    const groupedRestaurantCards =
      rootCard?.groupedCard?.cardGroupMap?.RESTAURANT?.cards || [];

    groupedRestaurantCards.forEach((groupCard) => {
      const groupedRestaurants =
        groupCard?.card?.card?.restaurants ||
        groupCard?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      if (Array.isArray(groupedRestaurants) && groupedRestaurants.length > 0) {
        list.push(...groupedRestaurants);
      }
    });
  });

  const normalized = list.map(normalizeRestaurant);
  const uniqueRestaurants = normalized.filter(
    (restaurant, index, self) =>
      index === self.findIndex((r) => r.id === restaurant.id),
  );

  if (!dishType || !DISH_MAP[dishType]) {
    return uniqueRestaurants;
  }

  const keywords = DISH_MAP[dishType].map((k) => k.toLowerCase());
  const filtered = uniqueRestaurants.filter((restaurant) => {
    const text = `${restaurant.name} ${restaurant.cuisines.join(" ")} ${restaurant.area}`.toLowerCase();
    return keywords.some((keyword) => text.includes(keyword));
  });

  return filtered.length > 0 ? filtered : uniqueRestaurants;
};

export default function Collection() {
  const [collectionId, setCollectionId] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [collectionTitle, setCollectionTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [dishType, setDishType] = useState("");
  const [error, setError] = useState("");

  // Filter states
  const [filters, setFilters] = useState({
    fastDelivery: false,
    rating4: false,
    pureVeg: false,
    offers: false,
    lessThan300: false,
    lessThan600: false,
    cuisineType: [],
    deliveryTime: null,
  });
  const [sortBy, setSortBy] = useState("RELEVANCE");

  // pagination
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalRestaurants, setTotalRestaurants] = useState(0);

  // Read URL and determine dish type
  useEffect(() => {
    const match = window.location.pathname.match(/\/collections\/(.+)/);
    if (match) {
      const id = match[1];
      setCollectionId(id);
      const params = new URLSearchParams(window.location.search);
      setCollectionTitle(params.get("title") || "");

      // Auto-detect dish type from collection ID
      if (COLLECTION_TO_DISH[id]) {
        setDishType(COLLECTION_TO_DISH[id]);
      } else {
        setDishType(params.get("dish") || "");
      }
    }
  }, []);

  //  Reset when collection changes
  useEffect(() => {
    setRestaurants([]);
    setOffset(0);
    setHasMore(true);
    setTotalRestaurants(0);
    setError("");
  }, [collectionId, dishType]);

  //  Fetch paginated data
  useEffect(() => {
    if (!collectionId || !hasMore) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        if (!isLocalhost()) {
          const staticRestaurants = getStaticRestaurants(dishType);
          setRestaurants(staticRestaurants);
          setTotalRestaurants(staticRestaurants.length);
          setHasMore(false);
          setLoading(false);
          return;
        }

        const apiUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.2581049&lng=77.4795184&collection_id=${collectionId}&offset=${offset}&page_type=DESKTOP_WEB_LISTING&sortBy=RELEVANCE`;

        const res = await fetch(apiUrl);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const json = await res.json();

        // Check if API returned an error
        if (json.statusCode !== 0) {
          setError(`API Error: ${json.statusMessage || "Unknown error"}`);
          setHasMore(false);
          setLoading(false);
          return;
        }

        let list = [];
        let title = "";
        let totalCount = 0;

        // Find restaurants and collection info
        for (const card of json?.data?.cards || []) {
          const data = card?.card?.card;

          // Get collection title
          if (!title) {
            title = data?.title || data?.header?.title || "";
          }

          // Try different restaurant data locations
          if (data?.gridElements?.infoWithStyle?.restaurants) {
            list = data.gridElements.infoWithStyle.restaurants;
            totalCount = list.length;
            break;
          } else if (data?.restaurants) {
            list = data.restaurants;
            totalCount = list.length;
            break;
          } else if (card?.groupedCard?.cardGroupMap?.RESTAURANT?.cards) {
            const restaurantCards =
              card.groupedCard.cardGroupMap.RESTAURANT.cards;
            restaurantCards.forEach((groupCard) => {
              if (groupCard?.card?.card?.restaurants) {
                list = [...list, ...groupCard.card.card.restaurants];
              }
            });
            totalCount = list.length;
            break;
          }
        }

        if (list.length === 0) {
          if (offset === 0) {
            setError("No restaurants found in this collection");
          }
          setHasMore(false);
          setLoading(false);
          return;
        }

        const cleaned = list.map(normalizeRestaurant);

        // Remove duplicates
        const uniqueRestaurants = cleaned.filter(
          (restaurant, index, self) =>
            index === self.findIndex((r) => r.id === restaurant.id),
        );

        setRestaurants((prev) => [...prev, ...uniqueRestaurants]);
        setCollectionTitle(title);
        setTotalRestaurants((prev) => prev + uniqueRestaurants.length);

        // load more
        if (uniqueRestaurants.length < 16) {
          setHasMore(false);
        }

        setLoading(false);
      } catch (e) {
        console.error("❌ Fetch error:", e);

        const staticRestaurants = getStaticRestaurants(dishType);
        if (offset === 0 && staticRestaurants.length > 0) {
          setRestaurants(staticRestaurants);
          setTotalRestaurants(staticRestaurants.length);
          setHasMore(false);
          setError("");
          setLoading(false);
          return;
        }

        setError(`Failed to load restaurants: ${e.message}`);
        setLoading(false);
        setHasMore(false);
      }
    };

    fetchData();
  }, [collectionId, offset, hasMore, dishType]);

  //filters to restaurants with useMemo
  const filteredRestaurants = useMemo(() => {
    let result = restaurants;

    // keyword filtering based on dish type
    if (dishType && DISH_MAP[dishType]) {
      const keywords = DISH_MAP[dishType];
      result = result.filter((r) => {
        const text =
          `${r.name} ${r.cuisines.join(" ")} ${r.area}`.toLowerCase();
        return keywords.some((k) => text.includes(k.toLowerCase()));
      });
    }

    // fast delivery filter
    if (filters.fastDelivery) {
      result = result.filter((r) => r.time <= 30);
    }

    // rating filter
    if (filters.rating4) {
      result = result.filter((r) => r.rating >= 4.0);
    }

    // pure veg filter
    if (filters.pureVeg) {
      result = result.filter((r) => r.veg === true);
    }

    // offers filter
    if (filters.offers) {
      result = result.filter((r) => r.discount);
    }

    // cost filters
    if (filters.lessThan300) {
      result = result.filter((r) => {
        const cost = parseInt(r.cost.replace(/[^0-9]/g, ""));
        return cost >= 300 && cost <= 600;
      });
    }

    // cuisine filters
    if (filters.cuisineType.length > 0) {
      result = result.filter((r) =>
        filters.cuisineType.some((cuisine) =>
          r.cuisines.join(", ").toLowerCase().includes(cuisine.toLowerCase()),
        ),
      );
    }

    // delivery time filter
    if (filters.deliveryTime) {
      result = result.filter((r) => r.time <= filters.deliveryTime);
    }

    // sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "DELIVERY_TIME":
          return a.time - b.time;
        case "RATING":
          return b.rating - a.rating;
        case "COST_FOR_TWO_L2H":
          const costA = parseInt(a.cost.replace(/[^0-9]/g, "")) || 0;
          const costB = parseInt(b.cost.replace(/[^0-9]/g, "")) || 0;
          return costA - costB;
        case "COST_FOR_TWO_H2L":
          const costA2 = parseInt(a.cost.replace(/[^0-9]/g, "")) || 0;
          const costB2 = parseInt(b.cost.replace(/[^0-9]/g, "")) || 0;
          return costB2 - costA2;
        default:
          return 0;
      }
    });

    return result;
  }, [restaurants, dishType, filters, sortBy]);

  const getImage = (id) => {
    if (!id)
      return "https://via.placeholder.com/400x200/FF6B35/FFFFFF?text=Restaurant";
    return `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${id}`;
  };

  // Get emoji for dish type
  const getDishEmoji = (type) => {
    const emojiMap = {
      pizza: "🍕",
      burger: "🍔",
      biryani: "🍛",
      dosa: "🥘",
      momos: "🥟",
      noodles: "🍜",
      cake: "🍰",
      waffle: "🧇",
      paratha: "🫓",
      rolls: "🌯",
      chinese: "🥡",
      northindian: "🍛",
      southindian: "🥘",
      icecream: "🍦",
      thali: "🍽️",
      sandwich: "🥪",
      coffee: "☕",
      pastry: "🥐",
      khichdi: "🍚",
      pasta: "🍝",
      "pav bhaji": "🍛",
    };
    return emojiMap[type] || "🍽️";
  };

  // display name for dish type
  const getDishDisplayName = (type) => {
    const nameMap = {
      pizza: "Pizza",
      burger: "Burger",
      biryani: "Biryani",
      dosa: "Dosa",
      momos: "Momos",
      noodles: "Noodles",
      cake: "Cake",
      waffle: "Waffle",
      paratha: "Paratha",
      rolls: "Rolls",
      chinese: "Chinese",
      northindian: "North Indian",
      southindian: "South Indian",
      icecream: "Ice Cream",
      thali: "Thali",
      sandwich: "Sandwich",
      coffee: "Coffee",
      pastry: "Pastry",
      khichdi: "Khichdi",
      pasta: "Pasta",
      "pav bhaji": "Pav Bhaji",
    };
    return nameMap[type] || type;
  };

  // description for dish type
  const getDishDescription = (type) => {
    return COLLECTION_DESCRIPTIONS[type] || "";
  };

  // Initial loading
  if (loading && restaurants.length === 0) {
    return <ShimmerCard />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 lg:px-6 pt-4 sm:pt-6 pb-8 sm:pb-10">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="text-red-500 mr-3">⚠️</div>
              <div>
                <h3 className="font-bold text-red-800">Error</h3>
                <p className="text-red-600">{error}</p>
                <div className="mt-2">
                  <button
                    onClick={() => window.location.reload()}
                    className="text-sm text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Reload page
                  </button>
                  <button
                    onClick={() => (window.location.href = "/")}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Go back home
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-left mt-6 sm:mt-10 mb-8 sm:mb-10">
          <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-extrabold text-[#282c3f]">
            {getDishDisplayName(dishType) || collectionTitle || "Restaurants"}
          </h1>

          {dishType && (
            <p className="text-[15px] sm:text-[16px] lg:text-[18px] text-[#686b78] mt-2 max-w-3xl">
              {getDishDescription(dishType)}
            </p>
          )}
        </div>

        {/* FILTER SECTION */}
        <FilterSection
          filteredRestaurants={filteredRestaurants}
          totalRestaurants={totalRestaurants}
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Grid */}
        {filteredRestaurants.length > 0 ? (
          <>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex justify-center gap-5 sm:gap-6 lg:gap-8 w-full">
                {filteredRestaurants.map((r) => (
                  <Link
                    key={r.id}
                    to={`/city/bhopal/${r.id}`}
                    className="group"
                  >
                    {/* Restaurant Card FROM Top_Restro */}
                    <div
                      className="bg-white rounded-2xl border border-[#e9e9eb] hover:border-[#d4d5d9] 
                                hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] 
                                transition-all duration-200 overflow-hidden h-full"
                    >
                      {/* Restaurant Image */}
                      <div className="relative h-[170px] sm:h-[186px] w-full overflow-hidden">
                        <img
                          src={getImage(r.imageId)}
                          alt={r.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/400x200/FF6B35/FFFFFF?text=Restaurant";
                          }}
                        />

                        {/* Top Badges  */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between">
                          {/* Discount Badge*/}
                          {r.discount && (
                            <div
                              className="bg-gradient-to-r from-[#ff5c35] to-[#ffa700] text-white 
                                        text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg"
                            >
                              {r.discount.header}
                              {r.discount.subHeader &&
                                ` ${r.discount.subHeader}`}
                            </div>
                          )}

                          {/* Veg/Non-Veg Tag */}
                          <div
                            className="bg-white/90 backdrop-blur-sm rounded-full w-1 h-1 flex 
            items-center justify-center border border-[#d4d5d9]"
                          >
                            {r.veg ? (
                              <div className="w-4 h-4 bg-[#0f8a65] rounded-full border border-[#0f8a65]" />
                            ) : (
                              <div className="w-1 h-1 bg-[#e43b4f] rounded-full border border-[#e43b4f]" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Restaurant Details */}
                      <div className="p-4 sm:p-5">
                        <h3 className="font-bold text-[#282c3f] text-[16px] sm:text-[18px] mb-3 line-clamp-1">
                          {r.name}
                        </h3>

                        {/* Rating & Delivery Time  */}
                        <div className="flex items-center justify-between mb-3">
                          {/* Rating on left */}
                          <div className="flex items-center gap-2 text-[15px] font-semibold text-[#3d4152]">
                            <span className="w-5 h-5 rounded-full bg-[#3d9b6d] text-white flex items-center justify-center text-xs">
                              ★
                            </span>
                            {r.rating.toFixed(1) || "4.0"}
                            {r.totalRatings > 0 && (
                              <span className="ml-1 text-gray-500 text-xs">
                                ({r.totalRatings}+)
                              </span>
                            )}
                          </div>

                          {/* Time on right */}
                          <div className="flex items-center gap-2">
                            <span className="text-[#686b78] text-sm">
                              {r.time} mins
                            </span>
                          </div>
                        </div>

                        {/* Cuisines */}
                        <p className="text-[#686b78] text-sm mb-4 line-clamp-2 h-10">
                          {r.cuisines.join(", ")}
                        </p>

                        {/* Area & Price  */}
                        <div className="flex items-center justify-between text-[#686b78] text-sm">
                          <span className="line-clamp-1">
                            {r.area || r.locality}
                          </span>
                          <span className="font-medium text-[#3e4152]">
                            {r.cost}
                          </span>
                        </div>
                      </div>

                      {/* Quick Action  */}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* No Results  */
          <div className="text-center py-16">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No {getDishDisplayName(dishType)} Restaurants Found
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                We couldn't find any restaurants serving{" "}
                {getDishDisplayName(dishType)} in this area. Try a different
                collection or location.
              </p>
            </div>

            {/* Popular Collections Grid  */}
            <div className="mt-10">
              <p className="font-medium mb-4 text-gray-700">
                Try these popular collections:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-lg mx-auto">
                {[
                  "pastry",
                  "pav bhaji",
                  "dosa",
                  "khichdi",
                  "noodles",
                  "paratha",
                ].map((collection) => (
                  <a
                    key={collection}
                    href={`/collections/${
                      Object.keys(COLLECTION_TO_DISH).find(
                        (id) => COLLECTION_TO_DISH[id] === collection,
                      ) || ""
                    }`}
                    className="px-4 py-3 bg-white border border-gray-200 hover:border-orange-500 
                             hover:shadow-sm rounded-lg text-center transition-all duration-200"
                  >
                    <div className="font-medium text-gray-800 capitalize">
                      {getDishDisplayName(collection)}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
