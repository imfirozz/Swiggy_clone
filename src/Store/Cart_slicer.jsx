import { createSlice } from "@reduxjs/toolkit";

const Cart = createSlice({
  name: "Cart_slice",
  initialState: {
    items: [],
  },
  reducers: {
   addItems: (state, action) => {
  const existingItem = state.items.find(
    (item) => item.id === action.payload.id
  );

  if (!existingItem) {
    state.items.push({
      ...action.payload,
      quantity: 1,
      restaurantId: action.payload.restaurantId,
    });
  }
},
 

    Increament: (state, action) => {
      const element = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (element) {
        element.quantity += 1;
      }
    },

    Decreament: (state, action) => {
      const element = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!element) return;

      if (element.quantity > 1) {
        element.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
  },
});

export const { addItems, Increament, Decreament } = Cart.actions;
export default Cart.reducer;