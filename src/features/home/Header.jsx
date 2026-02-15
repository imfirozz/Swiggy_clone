import { Link, useNavigate } from "react-router";

import React, { useEffect, useState } from "react";
import AddressModal from "../../shared/modals/AddressModal";
import LoginDrawer from "./auth/LoginDrawer";
export default function Header() {
  const navigate = useNavigate();
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [locationText, setLocationText] = useState("Bhopal, India");
  const [searchText, setSearchText] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  useEffect(() => {
    const q = searchText.trim();
    if (!q) return;

    const timer = setTimeout(() => {
      navigate(`/search?query=${encodeURIComponent(q)}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText, navigate]);

  const handleSearch = () => {
    const q = searchText.trim();
    if (q) {
      navigate(`/search?query=${encodeURIComponent(q)}`);
    } else {
      navigate("/search");
    }
  };
  return (
    <header className="bg-[#ff5200] font-serif overflow-hidden">
      {/* Top header */}

      <div className="flex justify-between px-4 sm:px-6 md:px-10 lg:px-16 py-4 sm:py-6 md:py-8 flex-wrap gap-4">
        <Link to="/">
          <img
            className="w-28 h-9 sm:w-32 sm:h-10 md:w-40 md:h-12"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/static-assets/images/swiggy_logo_white.png"
            alt="Swiggy"
          />
        </Link>

        <div className="text-white text-sm sm:text-base font-bold flex gap-3 sm:gap-6 items-center flex-wrap justify-end">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.swiggy.com/corporate/"
          >
            Swiggy Corporate
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://partner.swiggy.com/login#/swiggy"
          >
            Partner with us
          </a>

          <button
            onClick={() =>
              document
                .getElementById("footer")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="border border-white py-2 sm:py-3 cursor-pointer px-3 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base"
          >
            Get the App
          </button>

          <button
            onClick={() => setLoginOpen(true)}
            className="text-white border border-white cursor-pointer py-2 px-4 sm:px-5 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base hover:bg-white hover:text-black transition"
          >
            Login
          </button>
        </div>
      </div>

      <LoginDrawer isOpen={loginOpen} onClose={() => setLoginOpen(false)} />

      {/* middle header */}
      <div className="pt-10 sm:pt-14 lg:pt-16 pb-6 sm:pb-8 relative">
        <img
          className="hidden lg:block h-[360px] xl:h-[450px] w-[200px] xl:w-[250px] absolute top-0 left-0"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
          alt=""
        />
        <img
          className="hidden lg:block h-[360px] xl:h-[450px] w-52 xl:w-60 absolute top-0 right-0"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
          alt=""
        />

        <h1 className="max-w-[92%] sm:max-w-[80%] lg:max-w-[60%] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mx-auto text-center leading-tight">
          Order food & groceries. Discover <br></br> best restaurants. Swiggy
          it!
        </h1>

        <div className="max-w-[92%] lg:max-w-[70%] mx-auto flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10 mt-6 mb-8">
          {/* Location section */}
          <div
            onClick={() => setIsAddressOpen(true)}
            className="flex items-center bg-white w-full md:flex-[0_0_320px] rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 gap-3 sm:gap-4 shadow focus-within:ring-2 focus-within:ring-[#ff5200] cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff5200] flex-shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2c-3.866 0-7 3.134-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>

            <input
              className="flex-1 text-base sm:text-lg lg:text-xl outline-none cursor-pointer min-w-0"
              value={locationText}
              readOnly
            />
          </div>

          {/* Search section */}
          <Link to="/search" className="w-full md:flex-1 block md:max-w-[1000px]">
            <div className="flex items-center bg-white w-full rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 gap-3 sm:gap-4 shadow focus-within:ring-2 focus-within:ring-[#ff5200]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <input
                className="flex-1 text-base sm:text-lg lg:text-xl outline-none min-w-0"
                placeholder="Search for items, restaurants and more"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />

              <button
                onClick={handleSearch}
                className="text-[#ff5200] font-semibold text-xs sm:text-sm flex-shrink-0"
              >
                Search
              </button>
            </div>
          </Link>
        </div>

        {/* Card section  */}

        <div className="max-w-[92%] md:max-w-[88%] lg:max-w-[80%] container mx-auto flex gap-3 sm:gap-0 overflow-x-auto sm:overflow-visible scrollbar-hide">
          <Link to={"/Restaurant"}>
            <img
              className="cursor-pointer min-w-[260px] sm:min-w-0"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/ec86a309-9b06-48e2-9adc-35753f06bc0a_Food3BU.png"
            ></img>
          </Link>
          <a href="https://www.swiggy.com/instamart?entryId=1234&entryName=mainTileEntry4&v=1">
            {" "}
            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b5c57bbf-df54-4dad-95d1-62e3a7a8424d_IM3BU.png"></img>
          </a>
          <a href="https://www.swiggy.com/dineout">
            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b6d9b7ab-91c7-4f72-9bf2-fcd4ceec3537_DO3BU.png"></img>
          </a>
        </div>
      </div>
      {isAddressOpen && (
        <AddressModal
          onClose={() => setIsAddressOpen(false)}
          onSave={(addr) => {
            setLocationText(addr.fullAddress || addr.area || "Your location");
            setIsAddressOpen(false);
          }}
        />
      )}
    </header>
  );
}
