import { Outlet } from "react-dom";
import Footer from "../../../shared/layout/Footer";

export default function RestaurantLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
