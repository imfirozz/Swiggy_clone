import Restro_Header from "./Restro_Header";

import { Outlet, useLocation } from "react-router";
import React from "react";
import Footer_for_Restaurant from "./Footer/Footer_for_Restaurant";
import Footer_for_Restaurant2 from "./Footer/Footer_for_Restaurant2";

export default function Secondary_Header() {
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();
  const hideFooters =
    pathname.startsWith("/collections/") || pathname.startsWith("/support");

  return (
    <>
      <Restro_Header />

      <Outlet></Outlet>
      {!hideFooters && (
        <>
          <Footer_for_Restaurant />
          <Footer_for_Restaurant2 />
        </>
      )}
    </>
  );
}
