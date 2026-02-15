const RestaurantShimmer = () => {
  return (
    <div className="w-[94%] sm:w-[90%] lg:w-[80%] mx-auto mt-8 sm:mt-12 lg:mt-20">
      {/* ================= RESTAURANT NAME SHIMMER ================= */}
      <div className="h-10 w-64 bg-gray-200 rounded mb-3 relative overflow-hidden">
        <div className="absolute inset-0 shimmer"></div>
      </div>

      {/* ================= HEADER CARD SHIMMER ================= */}
      <div className="mt-6 rounded-3xl bg-[#f2f3f7] p-4">
        <div className="bg-white rounded-2xl px-4 sm:px-6 py-4 sm:py-5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          {/* Rating row */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
            </div>
            <div className="h-4 w-4 bg-gray-200 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
            </div>
            <div className="h-4 w-24 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
            </div>
          </div>

          {/* Cuisines */}
          <div className="mt-2 h-4 w-48 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 shimmer"></div>
          </div>

          {/* Outlet + Delivery */}
          <div className="mt-4 flex gap-4">
            <div className="flex flex-col items-center pt-1">
              <div className="w-2 h-2 bg-gray-200 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 shimmer"></div>
              </div>
              <div className="w-[2px] h-6 bg-gray-200"></div>
              <div className="w-2 h-2 bg-gray-200 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 shimmer"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-gray-200 rounded relative overflow-hidden">
                <div className="absolute inset-0 shimmer"></div>
              </div>
              <div className="h-4 w-40 bg-gray-200 rounded relative overflow-hidden">
                <div className="absolute inset-0 shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DEALS SHIMMER ================= */}
      <div className="mt-10">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4 relative overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[260px] sm:min-w-[320px] flex items-center gap-3 border rounded-xl px-3 sm:px-4 py-3 bg-white"
            >
              <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] bg-gray-200 rounded relative overflow-hidden">
                <div className="absolute inset-0 shimmer"></div>
              </div>

              <div className="flex-1">
                <div className="h-5 w-40 bg-gray-200 rounded mb-2 relative overflow-hidden">
                  <div className="absolute inset-0 shimmer"></div>
                </div>
                <div className="h-4 w-56 bg-gray-200 rounded relative overflow-hidden">
                  <div className="absolute inset-0 shimmer"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MENU DIVIDER SHIMMER ================= */}
      <div className="mt-12 bg-[#f2f2f2] py-6">
        <div className="flex items-center justify-center">
          <div className="h-4 w-32 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 shimmer"></div>
          </div>
        </div>
      </div>

      {/* ================= SEARCH DISHES SHIMMER ================= */}
      <div className="mt-6 flex items-center bg-[rgba(2,6,12,0.06)] rounded-2xl px-6 py-3 gap-4">
        <div className="flex-1 h-6 bg-gray-200 rounded relative overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
        </div>
        <div className="w-5 h-5 bg-gray-200 rounded relative overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
        </div>
      </div>

      {/* ================= TOP PICKS SHIMMER ================= */}
      <div className="mt-12">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4 relative overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
            className="group w-[270px] sm:w-[300px] lg:w-[320px] shrink-0 border relative overflow-hidden rounded-2xl p-0"
            >
              <div className="w-full h-[190px] sm:h-[210px] lg:h-[220px] bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 shimmer"></div>
              </div>

              <div className="p-3">
                <div className="h-5 w-40 bg-gray-200 rounded mb-2 relative overflow-hidden">
                  <div className="absolute inset-0 shimmer"></div>
                </div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2 relative overflow-hidden">
                  <div className="absolute inset-0 shimmer"></div>
                </div>
                <div className="h-3 w-56 bg-gray-200 rounded relative overflow-hidden">
                  <div className="absolute inset-0 shimmer"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FILTER SHIMMER ================= */}
      <div className="mt-6 flex gap-3 sm:gap-4 mb-10">
        {["Veg", "Non-Veg"].map((i) => (
          <div
            key={i}
            className="h-10 w-24 bg-gray-200 rounded-lg relative overflow-hidden"
          >
            <div className="absolute inset-0 shimmer"></div>
          </div>
        ))}
      </div>

      {/* ================= CATEGORIES SHIMMER ================= */}
      <div className="mt-10">
        {[1, 2, 3, 4].map((categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            {/* Category Title */}
            <div className="h-7 w-48 bg-gray-200 rounded mb-6 relative overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
            </div>

            {/* Menu Items */}
            {[1, 2, 3].map((itemIndex) => (
              <div
                key={itemIndex}
                className="flex flex-col sm:flex-row justify-between gap-4 border-b pb-6 mb-6"
              >
                {/* Left side */}
                <div className="flex-1">
                  <div className="h-6 w-56 bg-gray-200 rounded mb-2 relative overflow-hidden">
                    <div className="absolute inset-0 shimmer"></div>
                  </div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-3 relative overflow-hidden">
                    <div className="absolute inset-0 shimmer"></div>
                  </div>
                  <div className="h-3 w-48 bg-gray-200 rounded mb-2 relative overflow-hidden">
                    <div className="absolute inset-0 shimmer"></div>
                  </div>
                  <div className="h-5 w-20 bg-gray-200 rounded relative overflow-hidden">
                    <div className="absolute inset-0 shimmer"></div>
                  </div>
                </div>

                {/* Right side - Image */}
                <div className="relative w-[132px] h-[122px] sm:w-[156px] sm:h-[144px] self-end sm:self-auto">
                  <div className="w-[132px] h-[122px] sm:w-[156px] sm:h-[144px] bg-gray-200 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 shimmer"></div>
                  </div>
                  <div className="absolute -bottom-4 w-24 h-8 bg-gray-200 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 shimmer"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default RestaurantShimmer;
