import { createSlice } from "@reduxjs/toolkit";

const RestaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    id: null,
    name: "",
  },
  reducers: {
    setRestaurant: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { setRestaurant } = RestaurantSlice.actions;
export default RestaurantSlice.reducer;
