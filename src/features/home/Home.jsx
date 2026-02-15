import Header from "./Header";
import React from "react";
import Food_Options from "./Food_Options";
import Grocery from "../grocery/Grocery";
import Dine_Restaurant from "../dineout/Dine_Restourant";

export default function Home() {
  return (
    <>
      <Header></Header>
      <Food_Options></Food_Options>
      <Grocery></Grocery>
      <Dine_Restaurant></Dine_Restaurant>
    </>
  );
}
