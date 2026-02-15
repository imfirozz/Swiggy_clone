
export const extractRestaurantsFromData = (data) => {
  try {
   
  
    const restaurants = data?.data?.cards?.find(
      card => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
    
    return restaurants;
  } catch (error) {
    console.error("Error while  extracting restaurants data:", error);
    return [];
  }
};

export const extractDeliveryTimeMinutes = (slaString) => {
  if (!slaString) return 999;
  
  const match = slaString.match(/(\d+)/);
  return match ? parseInt(match[0]) : 999;
};

export const extractMinPrice = (restaurant) => {
  // Try to get price from aggregated Discount 
  if (restaurant.info?.aggregatedDiscountInfoV3?.header) {
    const match = restaurant.info.aggregatedDiscountInfoV3.header.match(/₹(\d+)/);
    if (match) return parseInt(match[1]);
  }
  
  // Fallback to costForTwo string
  if (restaurant.info?.costForTwo) {
    const match = restaurant.info.costForTwo.match(/₹(\d+)/);
    if (match) return Math.floor(parseInt(match[1]) / 2); 
  }
  
  return 9999;
};