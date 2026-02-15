import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import AddressModal from "../modals/AddressModal";

export default function Restro_Header() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({
    type: "HOME",
    address: "28A/1, Chhattisgarh Colony, Prakash Pradesh 462022, India",
    isGPS: true,
  });
  const locationWatchIdRef = useRef(null);
  const lastGeocodeRef = useRef(0);
  const lastAddressRef = useRef("");
  const hasSetLocationRef = useRef(false);

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.Cart_slice.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const restaurant = useSelector((state) => state.restaurant);

  const getItemPrice = (item) => {
    if (!item) return 0;
    const raw =
      Number(item.finalPrice) ||
      Number(item.price) ||
      Number(item.defaultPrice) ||
      0;
    return raw / 100;
  };

  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + getItemPrice(item) * (item.quantity || 0),
    0,
  );

  const formatMoney = (value) =>
    Number.isFinite(value) ? `₹${value.toFixed(2)}` : "₹0.00";

  const restaurantId = restaurant?.id || cartItems[0]?.restaurantId || "bhopal";
  const restaurantName = restaurant?.name || "Your Order";

  // Saved addresses data
  const savedAddresses = [
    {
      id: 1,
      type: "HOME",
      address: "28A/1, Chhattisgarh Colony, Prakash Pradesh 462022, India",
      isGPS: true,
      isSelected: true,
      deliveryInfo: "Delivery in 20-25 mins",
    },
    {
      id: 2,
      type: "WORK",
      address: "BHEL, Piplani, Bhopal",
      isGPS: false,
      isSelected: false,
      deliveryInfo: "Delivery in 30-35 mins",
    },
    {
      id: 3,
      type: "OTHER",
      address: "Maharana Pratap Nagar, Zone 2",
      isGPS: false,
      isSelected: false,
      deliveryInfo: "Delivery in 25-30 mins",
    },
  ];

  const getGeoErrorMessage = (error) => {
    let errorMessage = "Could not get location. ";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage += "Please enable location access.";
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage += "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        errorMessage += "Location request timed out.";
        break;
      default:
        errorMessage += "Unknown error occurred.";
    }
    return errorMessage;
  };

  const clearLocationWatch = () => {
    if (locationWatchIdRef.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(locationWatchIdRef.current);
      locationWatchIdRef.current = null;
    }
  };

  // location (real-time)
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setIsLocationModalOpen(true);
      return;
    }

    clearLocationWatch();

    locationWatchIdRef.current = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const now = Date.now();

        let addressText =
          lastAddressRef.current ||
          `Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;

        if (now - lastGeocodeRef.current > 15000) {
          lastGeocodeRef.current = now;
          try {
            const address = await reverseGeocode(latitude, longitude);
            addressText = address;
            lastAddressRef.current = address;
          } catch (error) {
            console.warn("Error getting address:", error);
          }
        }

        setSelectedAddress({
          type: "GPS",
          address: addressText,
          isGPS: true,
        });

        if (!hasSetLocationRef.current) {
          hasSetLocationRef.current = true;
          setIsLocationDropdownOpen(false);
        }
      },
      (error) => {
        console.warn("Geolocation error:", error);
        alert(getGeoErrorMessage(error));
        setIsLocationModalOpen(true);
        clearLocationWatch();
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  };

  // Reverse geocoding function
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
      );
      const data = await response.json();
      return data.display_name || "Current Location";
    } catch (error) {
      throw error;
    }
  };

  // Handle address selection
  const handleAddressSelect = (address) => {
    clearLocationWatch();
    hasSetLocationRef.current = false;
    setSelectedAddress({
      type: address.type,
      address: address.address,
      isGPS: address.isGPS,
    });
    setIsLocationDropdownOpen(false);
  };

  //save new address from modal
  const handleSaveAddress = (newAddress) => {
    clearLocationWatch();
    hasSetLocationRef.current = false;
    setSelectedAddress({
      type: newAddress.type,
      address: newAddress.fullAddress,
      isGPS: false,
    });
    setIsLocationModalOpen(false);
  };

  useEffect(() => {
    return () => {
      clearLocationWatch();
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isLocationDropdownOpen &&
        !event.target.closest(".location-selector")
      ) {
        setIsLocationDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isLocationDropdownOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Main header container */}
        <div className="flex items-center justify-between h-16">
          {/* LEFT SIDE: Address Section */}
          <div className="location-selector relative flex items-center gap-4">
            {/* Location Icon with HOME */}
            <Link to={"/"}>
              <div className="group cursor-pointer">
                <img
                  className="h-[52px] w-[52px] group-hover:scale-105 transition-transform duration-200"
                  src="https://imgs.search.brave.com/K1Ggp9DQRqjzfWEfxQ8NswQVojCFIvliZud2_fkwkO0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmdo/ZHByby5jb20vd3At/Y29udGVudC90aGVt/ZXMvcG5naGRwcm8v/ZG93bmxvYWQvc29j/aWFsLW1lZGlhLWFu/ZC1icmFuZHMvc3dp/Z2d5LWxvZ28tYXBw/LWljb24ucG5n"
                  alt="Swiggy Logo"
                />
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <div className="relative">
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
             <Link to={"/"}>
              <span className="text-[14px] cursor-pointer font-semibold hover:scale-105 hover:text-[#fc8019] transition-all duration-200 text-gray-800">
                HOME
              </span>
              </Link>
            </div>

            {/* Address with Dropdown */}
            <div className="hidden md:block cursor-pointer">
              <button
                onClick={() =>
                  setIsLocationDropdownOpen(!isLocationDropdownOpen)
                }
                className="text-left hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-[14px] text-gray-600 font-medium truncate max-w-[180px] lg:max-w-[250px]">
                    {selectedAddress.address.length > 25
                      ? selectedAddress.address.substring(0, 25) + "..."
                      : selectedAddress.address}
                  </span>
                  <svg
                    className="inline w-4 h-4 ml-1 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {selectedAddress.type === "HOME" && (
                  <p className="text-[12px] text-gray-500 mt-0.5">
                    Delivery in 20-25 mins
                  </p>
                )}
              </button>
            </div>

            {/* Location Dropdown */}
            {isLocationDropdownOpen && (
              <div className="absolute top-full cursor-pointer left-0 mt-1 w-[92vw] sm:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                {/* Header */}
                <div className="p-4 cursor-pointer border-b">
                  <h3 className="font-bold text-gray-800">
                    Select delivery location
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Choose your location to find restaurants near you
                  </p>
                </div>

                {/* GPS Location Option */}
                <div className="p-4 border-b">
                  <button
                    onClick={getCurrentLocation}
                    className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-blue-300">
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-blue-700">
                          Get current location
                        </p>
                        <p className="text-sm text-blue-600">Using GPS</p>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {/* Saved Addresses */}
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    SAVED ADDRESSES
                  </h4>
                  <div className="space-y-2">
                    {savedAddresses.map((address) => (
                      <button
                        key={address.id}
                        onClick={() => handleAddressSelect(address)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          address.isSelected
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`text-xs font-bold ${
                                  address.isSelected
                                    ? "text-orange-600"
                                    : "text-gray-600"
                                }`}
                              >
                                {address.type}
                              </span>
                              {address.isGPS && (
                                <span className="text-[10px] font-medium bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                                  GPS
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-800">
                              {address.address}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {address.deliveryInfo}
                            </p>
                          </div>
                          {address.isSelected && (
                            <svg
                              className="w-5 h-5 text-green-500 ml-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* New Address Button */}
                  <button
                    onClick={() => {
                      setIsLocationModalOpen(true);
                      setIsLocationDropdownOpen(false);
                    }}
                    className="w-full mt-4 p-3 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center text-orange-600 font-medium"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add New Address
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* CENTER:  Corporate Badge */}
          <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full px-4 py-2 cursor-pointer">
              <svg
                className="w-4 h-4 text-orange-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-[14px] font-semibold text-gray-800">
              <a target="_blank" href="https://www.swiggy.com/corporate/"> Swiggy Corporate </a>
               
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: Navigation Items */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search */}
            <button
              onClick={() => navigate("/search")}
              className="hidden md:flex items-center gap-1 cursor-pointer group"
            >
              <div className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded group-hover:bg-orange-50 transition-colors">
                <svg
                  className="w-3 h-3 text-gray-600 group-hover:text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <span className="text-[14px] font-medium text-gray-700 group-hover:text-orange-500 transition-colors">
                Search
              </span>
            </button>

            {/* Mobile Search Button */}
            <button
              onClick={() => navigate("/search")}
              className="md:hidden flex items-center gap-1 cursor-pointer group"
            >
              <div className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded group-hover:bg-orange-50 transition-colors">
                <svg
                  className="w-3 h-3 text-gray-600 group-hover:text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </button>

            {/* Offers  */}
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <span className="text-[14px] font-medium text-gray-700 group-hover:text-orange-500 transition-colors">
                <a target="_blank" href="https://www.swiggy.com/offers-near-me">Offers</a>
              </span>
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                <a  href="https://www.swiggy.com/offers-near-me">NEW</a>
              </span>
            </div>

            {/* Help */}
            <Link to={"/Support"}>
              <div className="hidden md:block cursor-pointer group">
                <span className="text-[14px] font-medium text-gray-700 group-hover:text-orange-500 transition-colors">
                  Help
                </span>
              </div>
            </Link>

            {/* User Profile */}
            <div className="hidden md:flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                F
              </div>
              <span className="text-[14px] font-medium text-gray-700 group-hover:text-orange-500 transition-colors">
                Firoz
              </span>
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Cart */}
            <div className="relative cursor-pointer group">
              <Link to="/Checkout" className="flex items-center gap-2">
                <div className="relative">
                  <svg
                    className="w-6 h-6 text-gray-700 group-hover:text-orange-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>

                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#60b246] text-white text-[11px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border border-white">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden md:inline text-[14px] font-medium text-gray-700 group-hover:text-orange-500 transition-colors">
                  Cart
                </span>
              </Link>

              {/* Cart Hover Dropdown */}
              <div className="absolute right-0 top-full mt-3 w-[92vw] sm:w-[360px] bg-white border border-gray-200 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.15)] opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
                <div className="absolute -top-2 right-8 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />

                {cartItems.length > 0 ? (
                  <div className="p-4">
                    <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                        🍽️
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {restaurantName}
                        </p>
                        <Link
                          to={`/city/bhopal/${restaurantId}`}
                          className="text-xs text-blue-600 font-semibold"
                        >
                          VIEW FULL MENU
                        </Link>
                      </div>
                    </div>

                    <div className="py-3 space-y-3">
                      {cartItems.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-gray-800 line-clamp-1 max-w-[180px]">
                              {item.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-700">
                            <span className="text-xs">x{item.quantity}</span>
                            <span className="font-semibold">
                              {formatMoney(getItemPrice(item) * item.quantity)}
                            </span>
                          </div>
                        </div>
                      ))}
                      {cartItems.length > 3 && (
                        <p className="text-xs text-gray-500">
                          + {cartItems.length - 3} more items
                        </p>
                      )}
                    </div>

                    <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Sub total</p>
                        <p className="font-bold text-gray-800">
                          {formatMoney(cartSubtotal)}
                        </p>
                      </div>
                      <Link
                        to="/Checkout"
                        className="bg-[#fc8019] text-white text-sm font-bold px-6 py-2 rounded-lg"
                      >
                        CHECKOUT
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="p-5">
                    <p className="font-semibold text-gray-800">Cart is empty</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Add items to get started.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden flex items-center">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {isLocationModalOpen && (
        <AddressModal
          onClose={() => setIsLocationModalOpen(false)}
          onSave={handleSaveAddress}
        />
      )}
    </header>
  );
}
