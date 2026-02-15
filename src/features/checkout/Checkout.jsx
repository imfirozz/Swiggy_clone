import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Increament, Decreament } from "../../Store/Cart_slicer";
import CouponDrawer from "./Payment_Address/Offers/CouponDrawer";
import AddressModal from "./Payment_Address/AddressModal";
import PaymentOptions from "./Payment_Address/PaymentOptions";
import { Link } from "react-router";

export default function Checkout() {
  const dispatch = useDispatch();

  const [showPayment, setShowPayment] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);

  //  REDUX DATA
  const items = useSelector((state) => state.Cart_slice.items);
  const restaurant = useSelector((state) => state.restaurant);

  // Restaurant ID
  const restaurantId = restaurant?.id || items[0]?.restaurantId || null;

  //  LOCAL STATE
  const [showCoupon, setShowCoupon] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  //  PRICE CALCULATIONS
  const itemTotal = items.reduce(
    (sum, item) =>
      sum + item.quantity * ((item.price || item.defaultPrice || 0) / 100),
    0,
  );

  const formattedItemTotal = parseFloat(itemTotal.toFixed(2));
  const hasItems = items.length > 0;
  const deliveryFee = hasItems ? 32 : 0;
  const gst = hasItems ? Math.round(formattedItemTotal * 0.18) : 0;

  const toPay = hasItems
    ? Math.max(
        parseFloat(
          (formattedItemTotal + deliveryFee + gst - discount).toFixed(2),
        ),
        0,
      )
    : 0;

  const canShowCoupons = Boolean(restaurantId && items.length > 0);

  //  COUPON HANDLER
  const handleApplyCoupon = (couponInfo) => {
    if (
      couponInfo.couponData?.restaurantId &&
      couponInfo.couponData.restaurantId !== restaurantId
    ) {
      alert("This coupon is not valid for this restaurant");
      return;
    }

    setDiscount(couponInfo.discountAmount);
    setAppliedCoupon(couponInfo);
    setShowCoupon(false);
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
  };

  //  PAYMENT HANDLER
  const handlePaymentComplete = (paymentData) => {
    console.log("Payment completed:", paymentData);
    setShowPayment(false);
    alert(`Payment successful! Transaction ID: ${paymentData.transactionId}`);
  };

  useEffect(() => {
    if (!appliedCoupon) return;

    const minOrder = appliedCoupon.couponData?.minOrderValue || 0;
    if (formattedItemTotal < minOrder) {
      setDiscount(0);
      setAppliedCoupon(null);
    }
  }, [formattedItemTotal, appliedCoupon]);

  //  RENDER
  return (
    <div className="bg-[#e9ecee] min-h-screen">
      {/* HEADER */}

      <div className="bg-white px-4 sm:px-6 lg:px-10 py-3 sm:py-4 shadow flex items-center gap-3">
        <Link to={"/"}>
          <div>
            <img
              src="https://imgs.search.brave.com/K1Ggp9DQRqjzfWEfxQ8NswQVojCFIvliZud2_fkwkO0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmdo/ZHByby5jb20vd3At/Y29udGVudC90aGVt/ZXMvcG5naGRwcm8v/ZG93bmxvYWQvc29j/aWFsLW1lZGlhLWFu/ZC1icmFuZHMvc3dp/Z2d5LWxvZ28tYXBw/LWljb24ucG5n"
              className="h-10 w-10 sm:h-[52px] sm:w-[52px] group-hover:scale-105 transition-transform duration-200"
              alt="Swiggy"
            />
          </div>
        </Link>
        <h1 className="font-bold text-base sm:text-lg">SECURE CHECKOUT</h1>
      </div>

      <div className="max-w-7xl mx-auto mt-4 sm:mt-8 px-3 sm:px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          {/* ADDRESS SECTION */}
          <div className="bg-white p-4 sm:p-6 rounded shadow">
            <h2 className="font-bold text-lg mb-3">Add a delivery address</h2>
            {!savedAddress ? (
              <div className="border border-dashed p-4 rounded flex">
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="px-4 sm:px-6 py-2 border border-green-600 text-green-600 font-semibold rounded text-sm sm:text-base"
                >
                  ADD NEW
                </button>
              </div>
            ) : (
              <div className="border p-4 rounded flex flex-col sm:flex-row justify-between sm:items-end gap-2">
                <div>
                  <p className="font-semibold text-sm">{savedAddress.type}</p>
                  <p className="text-sm text-gray-600">
                    {savedAddress.fullAddress}
                  </p>
                </div>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="text-green-600 text-sm font-semibold"
                >
                  Change
                </button>
              </div>
            )}
          </div>

          {/* PAYMENT SECTION */}
          <div className="bg-white p-4 sm:p-6 rounded shadow">
            <h2 className="font-bold text-lg mb-4">Payment</h2>

            <div className="mb-4 p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Total Amount</span>
                <span className="font-bold text-lg">₹{toPay.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Including all taxes and delivery charges
              </p>

              {/* FIXED: Removed Link, using modal only */}
              <button
                onClick={() => {
                  console.log("Opening payment modal, amount:", toPay);
                  setShowPayment(true);
                }}
                disabled={!hasItems || toPay <= 0}
                className={`w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-bold shadow-md transition-all ${
                  !hasItems || toPay <= 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:from-orange-600 hover:to-orange-700 hover:shadow-lg"
                }`}
              >
                PROCEED TO PAY ₹{toPay.toFixed(2)}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-4">
          {/* ORDER SUMMARY */}
          <div className="bg-white p-4 sm:p-5 rounded shadow">
            <h3 className="font-bold mb-4">Your Order</h3>

            {items.map((item) => (
              <div key={item.id} className="flex gap-3 border-b pb-4 mb-4">
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded"
                  alt={item.name}
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <div className="mt-2 flex items-center gap-2 sm:gap-3 border w-fit px-2 rounded">
                    <button
                      onClick={() => dispatch(Decreament(item))}
                      className="w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(Increament(item))}
                      className="w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="text-sm font-semibold">
                  ₹
                  {Math.round(
                    ((item.price || item.defaultPrice) / 100) * item.quantity,
                  )}
                </p>
              </div>
            ))}

            {/* APPLY/REMOVE COUPON */}
            <div className="border p-3 rounded mb-4">
              {appliedCoupon ? (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sm text-green-600">
                      {appliedCoupon.couponCode} Applied
                    </p>
                    <p className="text-xs text-gray-500">
                      {appliedCoupon.couponData?.title ||
                        "Coupon discount applied"}
                    </p>
                    <p className="text-xs text-green-600 font-semibold">
                      Discount: -₹{discount.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-sm text-red-600 font-semibold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => canShowCoupons && setShowCoupon(true)}
                  className={`cursor-pointer ${
                    canShowCoupons
                      ? "hover:bg-gray-50"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <p className="font-semibold text-sm">Apply Coupon</p>
                </div>
              )}
            </div>

            {/* BILL DETAILS */}
            <div className="text-sm space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span>₹{formattedItemTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST & Charges</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <hr />
              <div className="flex justify-between font-bold text-black text-base">
                <span>TO PAY</span>
                <span>₹{toPay.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* COUPON APPLIED NOTIFICATION */}
          {discount > 0 && (
            <div className="bg-green-50 border border-green-400 text-green-700 p-3 rounded text-sm">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <span className="font-semibold">Coupon Applied!</span>
                  <p className="text-xs mt-1">
                    Savings of ₹{discount.toFixed(2)} on this order 🎉
                  </p>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-red-600 text-sm font-semibold hover:underline"
                >
                  Remove Coupon
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      {showCoupon && (
        <CouponDrawer
          restaurantId={restaurantId}
          itemTotal={formattedItemTotal}
          onClose={() => setShowCoupon(false)}
          applyCoupon={handleApplyCoupon}
        />
      )}

      {showAddressModal && (
        <AddressModal
          onClose={() => setShowAddressModal(false)}
          onSave={(addr) => setSavedAddress(addr)}
        />
      )}

      {showPayment && (
        <PaymentOptions
          amount={toPay}
          onPaymentComplete={handlePaymentComplete}
          onBack={() => setShowPayment(false)}
        />
      )}
    </div>
  );
}
