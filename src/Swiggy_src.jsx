import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./features/home/Home";
import Restaurant from "./features/restaurant/Restaurant";
import Restaurant_Location from "./features/restaurant/Restaurant_Location";
import Searching_bar from "./features/restaurant/Searching_bar";
import Secondary_Header from "./shared/layout/Secondary_Header";
import Store from "./Store/Store";
import { Provider } from "react-redux";
import Checkout from "./features/checkout/Checkout";
import SearchPage from "./features/restaurant/SearchPage";
import Support from "./features/support/Support"

import Collection from "./features/restaurant/Collection";
import Footer from "./shared/layout/Footer";
import NearMeSection from "./features/home/NearMeSection"
import HomeLayout from "./features/home/Home_Layout/HomeLayout";

import { BrowserRouter, Routes, Route } from "react-router";


function Swiggy() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />} />

          <Route element={<Secondary_Header />}>
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/city/bhopal/:id" element={<Restaurant_Location />} />
          <Route path="/city/bhopal/:id/search" element={<Searching_bar />} />
          <Route path="/collections/:id" element={<Collection />} />
          <Route path="/Support" element = {<Support></Support>} ></Route>
           
          </Route>

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search" element={<SearchPage />} /> 
       

        </Routes>
       
         
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Swiggy />);
