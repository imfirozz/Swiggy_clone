import React, { useState, useEffect, useRef } from "react";

export default function AddressModal({ onClose, onSave }) {
  const [flat, setFlat] = useState("");
  const [landmark, setLandmark] = useState("");
  const [type, setType] = useState("Home");
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [locationError, setLocationError] = useState("");

  // area search
  const [areaSearch, setAreaSearch] = useState("");
  const [areaSuggestions, setAreaSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const watchIdRef = useRef(null);
  const lastGeocodeRef = useRef(0);
  const areaSearchRef = useRef("");
  const userEditedAreaRef = useRef(false);

  useEffect(() => {
    areaSearchRef.current = areaSearch;
  }, [areaSearch]);

  // current location (real-time)
  useEffect(() => {
    startLocationWatch();
    return () => {
      if (watchIdRef.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //  address from coordinates
  const getAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      );
      const data = await response.json();

      if (data && data.display_name) {
        return data.display_name;
      }
      return "Address not found";
    } catch (error) {
      console.warn("Error reverse geocoding:", error);
      return "Error getting address";
    }
  };

  const getGeoErrorMessage = (error) => {
    let errorMessage = "Unable to get your location. ";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage +=
          "Please allow location access in your browser settings.";
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

  const startLocationWatch = () => {
    if (!("geolocation" in navigator)) {
      setLocationError("Geolocation is not supported by your browser");
      setLoadingLocation(false);
      return;
    }

    setLoadingLocation(true);
    setLocationError("");

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setLoadingLocation(false);

        const now = Date.now();
        const shouldGeocode =
          !areaSearchRef.current || now - lastGeocodeRef.current > 15000;

        if (shouldGeocode && !userEditedAreaRef.current) {
          lastGeocodeRef.current = now;
          const address = await getAddressFromCoords(latitude, longitude);
          if (
            address !== "Address not found" &&
            address !== "Error getting address"
          ) {
            setAreaSearch(address);
          }
        }
      },
      (error) => {
        console.warn("Error getting location:", error);
        setLocationError(getGeoErrorMessage(error));
        setLoadingLocation(false);
        if (watchIdRef.current !== null && navigator.geolocation) {
          navigator.geolocation.clearWatch(watchIdRef.current);
          watchIdRef.current = null;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  //  search for area suggestions
  const searchAreaSuggestions = async (query) => {
    if (!query.trim()) {
      setAreaSuggestions([]);
      return;
    }

    setLoadingSuggestions(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`,
      );
      const data = await response.json();

      const suggestions = data.map((item) => ({
        display_name: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        type: item.type,
        address: item.address,
      }));

      setAreaSuggestions(suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.warn("Error searching area:", error);
      setAreaSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // Handle area search input change
  const handleAreaSearchChange = (e) => {
    const value = e.target.value;
    setAreaSearch(value);
    userEditedAreaRef.current = true;

    // Debounce search
    const timeoutId = setTimeout(() => {
      if (value.trim().length > 2) {
        searchAreaSuggestions(value);
      } else {
        setAreaSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  // Handle area selection
  const handleAreaSelect = (suggestion) => {
    setAreaSearch(suggestion.display_name);
    setLocation({
      latitude: suggestion.lat,
      longitude: suggestion.lon,
    });
    setShowSuggestions(false);
    userEditedAreaRef.current = true;

    // Auto-fill landmark with the selected address
    if (suggestion.address) {
      const { road, suburb, city, state, country } = suggestion.address;
      const landmarkParts = [road, suburb, city, state, country].filter(
        Boolean,
      );
      setLandmark(landmarkParts.join(", "));
    }
  };

  // enable location when user clicks
  const handleEnableLocation = async () => {
    userEditedAreaRef.current = false;
    startLocationWatch();
  };

  const handleSave = () => {
    if (!flat.trim()) {
      setError("Door / Flat no. can not be empty");
      return;
    }

    if (!location) {
      setError("Please select a location or enable GPS");
      return;
    }

    onSave({
      flat,
      landmark,
      area: areaSearch,
      type,
      fullAddress: `${flat}, ${areaSearch}${landmark ? `, ${landmark}` : ""}`,
      location,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="shrink-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="text-2xl font-light text-gray-600 hover:text-gray-800 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                ×
              </button>
              <h2 className="font-bold text-xl text-gray-800">
                Save delivery address
              </h2>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Location Section */}
            <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl mb-6 flex flex-col items-center justify-center overflow-hidden border border-blue-200">
              {loadingLocation ? (
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                    <svg
                      className="w-6 h-6 text-blue-500"
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
                  <p className="text-sm text-blue-600 font-medium">
                    Detecting your location...
                  </p>
                  <p className="text-xs text-blue-500 mt-1">Please wait</p>
                </div>
              ) : locationError ? (
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-red-600 font-medium mb-2">
                    {locationError}
                  </p>
                  <button
                    onClick={handleEnableLocation}
                    className="mt-2 px-4 py-2 bg-orange-500 text-white text-sm rounded-lg font-medium hover:bg-orange-600"
                  >
                    Try Again
                  </button>
                </div>
              ) : location ? (
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-green-600 font-medium">
                    Location detected!
                  </p>
                  <p className="text-xs text-gray-600 mt-1 truncate max-w-xs">
                    {areaSearch || "Address selected"}
                  </p>
                  <button
                    onClick={handleEnableLocation}
                    className="mt-3 px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-200"
                  >
                    Refresh Location
                  </button>
                </div>
              ) : (
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-500"
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
                  <p className="text-sm text-gray-700 font-medium mb-2">
                    Enable your location
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Get accurate delivery estimates
                  </p>
                  <button
                    onClick={handleEnableLocation}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Enable Location
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            {/* Input Fields */}
            <div className="space-y-4" ref={suggestionsRef}>
              {/* Area Search Input */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search for area, street name{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    value={areaSearch}
                    onChange={handleAreaSearchChange}
                    onFocus={() =>
                      areaSearch.trim().length > 2 && setShowSuggestions(true)
                    }
                    placeholder="Type area, street, or landmark"
                    className="w-full border border-gray-300 rounded-lg p-3.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                  {loadingSuggestions && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                    </div>
                  )}
                </div>

                {/* Area Suggestions Dropdown */}
                {showSuggestions && areaSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {areaSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleAreaSelect(suggestion)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 text-gray-400">
                            <svg
                              className="w-4 h-4"
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
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {suggestion.display_name}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {suggestion.type.charAt(0).toUpperCase() +
                                suggestion.type.slice(1)}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {areaSearch &&
                  !showSuggestions &&
                  areaSearch.trim().length > 2 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Press Enter or click on a suggestion to select location
                    </p>
                  )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Door / Flat no. <span className="text-red-500">*</span>
                </label>
                <input
                  value={flat}
                  onChange={(e) => {
                    setFlat(e.target.value);
                    setError("");
                  }}
                  placeholder="e.g., 401, 2nd Floor"
                  className="w-full border border-gray-300 rounded-lg p-3.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Landmark (optional)
                </label>
                <input
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g., Near Bank of India"
                  className="w-full border border-gray-300 rounded-lg p-3.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
                {location && (
                  <p className="text-xs text-green-600 mt-1 font-medium">
                    ✓ Location set: {areaSearch}
                  </p>
                )}
              </div>

              {/* Address Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Save address as
                </label>
                <div className="flex gap-3">
                  {["Home", "Work", "Other"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`flex-1 border rounded-lg p-3 text-sm font-medium transition-all ${
                        type === t
                          ? "border-orange-500 bg-orange-50 text-orange-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 bg-white border-t border-gray-200 p-6">
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-lg font-bold text-base shadow-md hover:shadow-lg transition-all"
          >
            SAVE ADDRESS & PROCEED
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            By proceeding, you agree to our Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  );
}
