import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./Cart_slicer";
import RestaurantReducer from "./Restaurant_slicer";

const store = configureStore({
  reducer: {
    Cart_slice: CartReducer,
    restaurant: RestaurantReducer,
  },
});

export default store;
