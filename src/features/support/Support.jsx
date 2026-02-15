import React, { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Support() {
  const [hasOrders, setHasOrders] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpModalData, setHelpModalData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const userHasOrders = true;
      setHasOrders(userHasOrders);

      if (userHasOrders) {
        setRecentOrders([
          {
            id: "SW123456789",
            restaurant: "McDonald's",
            date: "27 Jan 2026",
            time: "7:30 PM",
            items: [
              { name: "McSpicy Chicken Burger Meal", quantity: 1, price: 285 },
              { name: "French Fries (Medium)", quantity: 1, price: 89 },
              { name: "Coke (500ml)", quantity: 1, price: 51 },
            ],
            amount: 385,
            status: "Delivered",
            rating: 4,
            issues: [],
            paymentMethod: "UPI",
            deliveryAddress: "Home • 3rd Block, Koramangala",
          },
          {
            id: "SW123456788",
            restaurant: "Domino's Pizza",
            date: "25 Jan 2026",
            time: "8:15 PM",
            items: [
              { name: "Farmhouse Pizza (Medium)", quantity: 1, price: 399 },
              { name: "Garlic Breadsticks", quantity: 1, price: 129 },
              { name: "Choco Lava Cake", quantity: 2, price: 98 },
            ],
            amount: 620,
            status: "Delivered",
            rating: 5,
            issues: [],
            paymentMethod: "Credit Card",
            deliveryAddress: "Office • Manyata Tech Park",
          },
          {
            id: "SW123456787",
            restaurant: "KFC",
            date: "23 Jan 2026",
            time: "6:45 PM",
            items: [
              { name: "Chicken Bucket (8 pcs)", quantity: 1, price: 399 },
              { name: "Zinger Burger", quantity: 1, price: 129 },
              { name: "Coleslaw", quantity: 1, price: 69 },
            ],
            amount: 540,
            status: "Refunded",
            rating: 2,
            issues: ["Late Delivery", "Missing Item"],
            paymentMethod: "Cash on Delivery",
            deliveryAddress: "Home • 5th Block, Koramangala",
          },
        ]);
      }
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleOrderHelp = (order) => {
    setSelectedOrder(order);
    setHelpModalData({
      title: "How can we help?",
      options: [
        { id: "missing", label: "Missing items", icon: "🔍" },
        { id: "quality", label: "Food quality issue", icon: "🍽️" },
        { id: "delivery", label: "Delivery issue", icon: "🛵" },
        { id: "payment", label: "Payment related", icon: "💰" },
        { id: "refund", label: "Refund status", icon: "↩️" },
        { id: "other", label: "Other issue", icon: "❓" },
      ],
    });
    setShowHelpModal(true);
  };

  const handleEmergencyClick = () => {
    setShowEmergencyModal(true);
  };

  const handleFaqClick = (faq) => {
    setHelpModalData({
      title: faq.title,
      description: faq.description,
      content: faq.content,
    });
    setShowHelpModal(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Professional skeleton loading */}
        <div className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex space-x-4">
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header skeleton */}
          <div className="mb-6">
            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="w-64 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Search skeleton */}
          <div className="mb-8">
            <div className="w-full max-w-xl h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Orders skeleton */}
          <div className="border border-gray-200 rounded-lg mb-8">
            <div className="p-6">
              <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border border-gray-100 rounded-lg p-4"
                  >
                    <div className="flex justify-between mb-3">
                      <div className="w-32 h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="w-48 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="flex justify-between">
                      <div className="w-20 h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ skeleton */}
          <div>
            <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Report safety concern
                </h3>
                <button
                  onClick={() => setShowEmergencyModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                This is for reporting serious safety issues only. Our emergency
                response team will contact you immediately.
              </p>
              <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-red-800 mb-2">
                  24x7 Emergency Helpline
                </p>
                <a
                  href="tel:08067452345"
                  className="text-lg font-semibold text-red-700 hover:text-red-800"
                >
                  080-6745-2345
                </a>
              </div>
              <div className="flex gap-3">
                <a
                  href="tel:08067452345"
                  className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 text-center"
                >
                  Call now
                </a>
                <button
                  onClick={() => setShowEmergencyModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && helpModalData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {helpModalData.title}
                </h3>
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {selectedOrder && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">
                        {selectedOrder.restaurant}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Order #{selectedOrder.id}
                      </p>
                    </div>
                    <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      {selectedOrder.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(selectedOrder.amount)} •{" "}
                    {selectedOrder.date}
                  </p>
                </div>
              )}

              {helpModalData.options ? (
                <div className="grid grid-cols-2 gap-3">
                  {helpModalData.options.map((option) => (
                    <button
                      key={option.id}
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors"
                    >
                      <span className="text-2xl mb-2">{option.icon}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  {helpModalData.description && (
                    <p className="text-gray-600 mb-4">
                      {helpModalData.description}
                    </p>
                  )}
                  {helpModalData.content && (
                    <div className="text-gray-600 space-y-3">
                      {helpModalData.content}
                    </div>
                  )}
                </div>
              )}

              {!helpModalData.options && (
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="mt-6 w-full bg-orange-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-600"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Hello! How can we help?
          </h1>
          <p className="text-sm text-gray-600">
            Choose a topic or search for what you need
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders, restaurants, or help topics"
              className="w-full h-12 pl-4 pr-12 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-sm"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-400"
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
            </button>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent orders
            </h2>
            <button className="text-sm text-orange-500 hover:text-orange-600 font-medium">
              View all orders →
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">{order.restaurant[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {order.restaurant}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {order.date} • {order.time} • {order.paymentMethod}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Refunded"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="ml-13 pl-13">
                  <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                    {order.items
                      .map((item) => `${item.quantity}x ${item.name}`)
                      .join(" • ")}
                  </p>

                  {order.issues.length > 0 && (
                    <div className="mb-2">
                      <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                        ⚠️ {order.issues.length} issue
                        {order.issues.length > 1 ? "s" : ""} reported
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      {formatCurrency(order.amount)}
                    </span>
                    <button
                      onClick={() => handleOrderHelp(order)}
                      className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                    >
                      Get help
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Help topics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">
                  Orders & Delivery
                </h3>
                <div className="space-y-2">
                  <HelpLink
                    label="Track your order"
                    onClick={() =>
                      handleFaqClick({
                        title: "Track your order",
                        description:
                          "You can track your order in real-time from the restaurant to your doorstep.",
                        content: (
                          <ul className="list-disc pl-4 space-y-2">
                            <li>Open the Swiggy app and go to 'Orders'</li>
                            <li>Select your active order</li>
                            <li>
                              View live tracking map and delivery partner
                              location
                            </li>
                            <li>Get updates via SMS and notification</li>
                          </ul>
                        ),
                      })
                    }
                  />
                  <HelpLink
                    label="Late delivery"
                    onClick={() =>
                      handleFaqClick({
                        title: "Late delivery",
                        description:
                          "If your order is delayed, here's what you can do:",
                        content: (
                          <ul className="list-disc pl-4 space-y-2">
                            <li>
                              Check live tracking for estimated delivery time
                            </li>
                            <li>Contact delivery partner via in-app chat</li>
                            <li>Call restaurant for order status</li>
                            <li>Eligible for delivery guarantee credit</li>
                          </ul>
                        ),
                      })
                    }
                  />
                  <HelpLink
                    label="Wrong/missing items"
                    onClick={() =>
                      handleFaqClick({
                        title: "Wrong or missing items",
                        description:
                          "Get help with incorrect or missing items in your order",
                        content: (
                          <div className="space-y-3">
                            <p>If items are missing or wrong:</p>
                            <ul className="list-disc pl-4 space-y-2">
                              <li>Report within 24 hours of delivery</li>
                              <li>Upload photos of received items</li>
                              <li>Get instant refund for missing items</li>
                              <li>Customer support will review your case</li>
                            </ul>
                          </div>
                        ),
                      })
                    }
                  />
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">
                  Payments & Refunds
                </h3>
                <div className="space-y-2">
                  <HelpLink
                    label="Payment failed"
                    onClick={() =>
                      handleFaqClick({
                        title: "Payment failed",
                        description:
                          "If your payment failed but amount was deducted:",
                        content: (
                          <ul className="list-disc pl-4 space-y-2">
                            <li>
                              Amount will be refunded within 5-7 working days
                            </li>
                            <li>
                              Check your bank statement for transaction status
                            </li>
                            <li>Contact your bank for UPI/CC failures</li>
                            <li>Save screenshots of failed transactions</li>
                          </ul>
                        ),
                      })
                    }
                  />
                  <HelpLink
                    label="Refund status"
                    onClick={() =>
                      handleFaqClick({
                        title: "Refund status",
                        description: "Track your refund status",
                        content: (
                          <ul className="list-disc pl-4 space-y-2">
                            <li>Refunds go to original payment method</li>
                            <li>UPI: 3-5 working days</li>
                            <li>Credit Card: 5-7 working days</li>
                            <li>Swiggy Money: Instant</li>
                          </ul>
                        ),
                      })
                    }
                  />
                  <HelpLink
                    label="Swiggy Money"
                    onClick={() =>
                      handleFaqClick({
                        title: "Swiggy Money",
                        description: "Your digital wallet with Swiggy",
                        content: (
                          <ul className="list-disc pl-4 space-y-2">
                            <li>Get instant refunds to Swiggy Money</li>
                            <li>Use for any order on Swiggy</li>
                            <li>No expiry on balance</li>
                            <li>Check balance in 'Wallet' section</li>
                          </ul>
                        ),
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">
                  Account & Settings
                </h3>
                <div className="space-y-2">
                  <HelpLink
                    label="Change phone number"
                    onClick={() =>
                      handleFaqClick({
                        title: "Change phone number",
                        description: "Update your registered mobile number",
                        content: (
                          <ul className="list-disc pl-4 space-y-2">
                            <li>Go to Account Settings</li>
                            <li>Select 'Change phone number'</li>
                            <li>Verify new number with OTP</li>
                            <li>Number updated instantly</li>
                          </ul>
                        ),
                      })
                    }
                  />
                  <HelpLink
                    label="Manage addresses"
                    onClick={() =>
                      handleFaqClick({
                        title: "Manage addresses",
                        description: "Add or remove delivery addresses",
                        content: (
                          <ul className="list-disc pl-4 space-y-2">
                            <li>
                              Save multiple addresses (Home, Office, etc.)
                            </li>
                            <li>Set default delivery location</li>
                            <li>Delete old addresses anytime</li>
                            <li>Add detailed instructions for delivery</li>
                          </ul>
                        ),
                      })
                    }
                  />
                  <HelpLink
                    label="Deactivate account"
                    onClick={() =>
                      handleFaqClick({
                        title: "Deactivate account",
                        description:
                          "Temporarily deactivate your Swiggy account",
                        content: (
                          <ul className="list-disc pl-4 space-y-2">
                            <li>Contact customer support for deactivation</li>
                            <li>Provide registered email/phone</li>
                            <li>Account can be reactivated anytime</li>
                            <li>Pending orders must be completed</li>
                          </ul>
                        ),
                      })
                    }
                  />
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">
                  Swiggy Programs
                </h3>
                <div className="space-y-2">
                  <HelpLink
                    label="Swiggy One"
                    onClick={() =>
                      handleFaqClick({
                        title: "Swiggy One Membership",
                        description: "Benefits and features of Swiggy One",
                        content: (
                          <ul className="list-disc pl-4 space-y-2">
                            <li>Free delivery on orders above ₹99</li>
                            <li>Extra 10% off on select restaurants</li>
                            <li>Priority customer support</li>
                            <li>Special member-only offers</li>
                            <li>₹0 delivery fee on Instamart</li>
                          </ul>
                        ),
                      })
                    }
                  />
                  <HelpLink
                    label="Swiggy HDFC Card"
                    onClick={() =>
                      handleFaqClick({
                        title: "Swiggy HDFC Bank Credit Card",
                        description: "Co-branded credit card benefits",
                        content: (
                          <ul className="list-disc pl-4 space-y-2">
                            <li>10% cashback on Swiggy orders</li>
                            <li>5% on dining out</li>
                            <li>Annual fee waiver on spends</li>
                            <li>Welcome benefits up to ₹1000</li>
                          </ul>
                        ),
                      })
                    }
                  />
                  <HelpLink
                    label="Swiggy Dineout"
                    onClick={() =>
                      handleFaqClick({
                        title: "Swiggy Dineout",
                        description: "Restaurant dining benefits",
                        content: (
                          <ul className="list-disc pl-4 space-y-2">
                            <li>Up to 50% off on total bill</li>
                            <li>Book tables at partner restaurants</li>
                            <li>Eatouts points on every visit</li>
                            <li>Special offers for Swiggy One members</li>
                          </ul>
                        ),
                      })
                    }
                  />
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 bg-red-50 border-red-200">
                <h3 className="font-medium text-gray-900 mb-3">
                  Safety & Emergency
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={handleEmergencyClick}
                    className="w-full text-left px-3 py-2 text-sm text-red-700 hover:bg-red-100 rounded-lg transition-colors font-medium"
                  >
                    🚨 Report safety emergency
                  </button>
                  <button
                    onClick={() =>
                      handleFaqClick({
                        title: "Contact safety team",
                        description: "Our safety team is available 24x7",
                        content: (
                          <div className="space-y-4">
                            <p>For immediate safety concerns:</p>
                            <a
                              href="tel:08067452345"
                              className="block text-lg font-semibold text-red-600"
                            >
                              080-6745-2345
                            </a>
                            <p className="text-sm text-gray-500">
                              Available 24 hours, 7 days a week
                            </p>
                          </div>
                        ),
                      })
                    }
                    className="w-full text-left px-3 py-2 text-sm text-red-700 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    Contact safety team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <QuickAction
              label="Track order"
              icon="📍"
              onClick={() =>
                handleFaqClick({
                  title: "Track your order",
                  description: "Live tracking feature",
                  content: (
                    <p>Open active order in app for real-time tracking</p>
                  ),
                })
              }
            />
            <QuickAction
              label="Call support"
              icon="📞"
              onClick={() => (window.location.href = "tel:08067452345")}
            />
            <QuickAction
              label="Chat with us"
              icon="💬"
              onClick={() =>
                handleFaqClick({
                  title: "Live chat",
                  description: "Start a chat with our support team",
                  content: (
                    <p>
                      Chat support available 24/7. Average response time: 2
                      minutes
                    </p>
                  ),
                })
              }
            />
            <QuickAction
              label="Email us"
              icon="✉️"
              onClick={() =>
                (window.location.href = "mailto:support@swiggy.in")
              }
            />
          </div>
        </div>

        {/* Restaurant CTA */}
        <Link to="/Restaurant">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-orange-500 transition-colors cursor-pointer group">
            <p className="text-gray-900 font-medium mb-1 group-hover:text-orange-500 transition-colors">
              Looking for restaurants?
            </p>
            <p className="text-sm text-gray-600">
              Explore 50,000+ restaurants and get exclusive offers
            </p>
          </div>
        </Link>

        {/* Footer Contact */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="text-gray-500">Need immediate assistance?</span>
            <a
              href="tel:08067452345"
              className="text-orange-500 font-medium hover:text-orange-600"
            >
              080-6745-2345
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="mailto:support@swiggy.in"
              className="text-gray-600 hover:text-gray-900"
            >
              support@swiggy.in
            </a>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600">24x7 support</span>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper Components
function HelpLink({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
    >
      {label}
    </button>
  );
}

function QuickAction({ label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors"
    >
      <span className="text-xl mb-1">{icon}</span>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </button>
  );
}
