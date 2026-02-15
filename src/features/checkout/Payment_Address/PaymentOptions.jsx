import React, { useState } from "react";

export default function PaymentOptions({ amount, onPaymentComplete, onBack }) {
  const safeAmount = Number.isFinite(Number(amount)) ? Number(amount) : 0;

  const [selectedMethod, setSelectedMethod] = useState("card");
  const savedCards = [
    { id: 1, last4: "4242", type: "visa", name: "Primary Card" },
    { id: 2, last4: "8888", type: "mastercard", name: "Secondary Card" },
  ];
  const [selectedCardId, setSelectedCardId] = useState(
    savedCards[0]?.id ?? null,
  );
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const walletBalance = 350;
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: "💳" },
    { id: "upi", name: "UPI", icon: "📱" },
    { id: "wallet", name: "Swiggy Money", icon: "💰", balance: walletBalance },
    { id: "netbanking", name: "Net Banking", icon: "🏦" },
    { id: "cash", name: "Cash on Delivery", icon: "💵" },
  ];

  const handlePayment = async () => {
    if (safeAmount <= 0) {
      alert("Invalid amount. Please try again.");
      return;
    }

    if (selectedMethod === "upi" && !upiId.trim()) {
      alert("Please enter your UPI ID");
      return;
    }

    if (selectedMethod === "card" && !selectedCardId) {
      alert("Please select a card");
      return;
    }

    if (selectedMethod === "netbanking" && !selectedBank) {
      alert("Please select a bank");
      return;
    }

    if (selectedMethod === "wallet" && walletBalance < safeAmount) {
      alert(
        `Insufficient wallet balance. Add ₹${(safeAmount - walletBalance).toFixed(2)} more`,
      );
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete({
        method: selectedMethod,
        amount: safeAmount,
        transactionId: `TXN${Date.now()}`,
        status: "success",
        timestamp: new Date().toISOString(),
      });
    }, 2000);
  };

  const isWalletInsufficient =
    selectedMethod === "wallet" && walletBalance < safeAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onBack} />

      <div
        className="relative w-full max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="text-2xl font-light text-gray-600 hover:text-gray-800 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                ×
              </button>
              <div>
                <h2 className="font-bold text-xl text-gray-800">
                  Choose payment method
                </h2>
                <p className="text-sm text-gray-600">
                  Amount to pay:{" "}
                  <span className="font-bold">₹{safeAmount.toFixed(2)}</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Secure payment</p>
              <p className="text-xs text-green-600 font-medium">
                🔒 100% Secure
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Order Summary Banner */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-blue-800">Order Summary</p>
                <p className="text-2xl font-bold text-blue-900">
                  ₹{safeAmount.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-600">Includes all charges</p>
                <p className="text-xs text-blue-500">Taxes + Delivery</p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3 mb-8">
            <h3 className="font-bold text-gray-800 text-lg mb-3">
              Select Payment Option
            </h3>

            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? "border-orange-500 bg-orange-50 shadow-sm"
                    : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50"
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{method.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{method.name}</p>
                    {method.balance && (
                      <p className="text-sm text-gray-600 mt-1">
                        Balance: ₹{method.balance.toFixed(2)}
                      </p>
                    )}
                    {method.id === "cash" && (
                      <p className="text-xs text-gray-500 mt-1">
                        Pay when you receive
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {selectedMethod === method.id ? (
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Method Details */}
          {selectedMethod === "card" && (
            <div className="mb-8 p-4 border border-gray-200 rounded-xl">
              <p className="font-semibold text-gray-800 mb-3">Saved Cards</p>
              <div className="space-y-2">
                {savedCards.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setSelectedCardId(card.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border ${
                      selectedCardId === card.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {card.type === "visa" ? "💳" : "💳"}
                      </span>
                      <div className="text-left">
                        <p className="font-medium text-gray-800">{card.name}</p>
                        <p className="text-xs text-gray-500">
                          •••• {card.last4}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedCardId === card.id
                          ? "border-orange-500 bg-orange-500"
                          : "border-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                You can add a new card during a real payment flow.
              </p>
            </div>
          )}

          {selectedMethod === "upi" && (
            <div className="mb-8 p-4 border border-gray-200 rounded-xl">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Enter UPI ID
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@bank"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
              />
              <p className="text-xs text-gray-500 mt-2">
                Example: user@okhdfcbank
              </p>
            </div>
          )}

          {selectedMethod === "netbanking" && (
            <div className="mb-8 p-4 border border-gray-200 rounded-xl">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Select Bank
              </label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>SBI</option>
                <option>Axis Bank</option>
                <option>Kotak Bank</option>
              </select>
            </div>
          )}

          {selectedMethod === "wallet" && (
            <div className="mb-8 p-4 border border-gray-200 rounded-xl">
              <p className="text-sm text-gray-700">
                Wallet Balance:{" "}
                <span className="font-semibold">
                  ₹{walletBalance.toFixed(2)}
                </span>
              </p>
              {isWalletInsufficient && (
                <p className="text-xs text-red-500 mt-2">
                  Insufficient balance. Add ₹
                  {(safeAmount - walletBalance).toFixed(2)} to proceed.
                </p>
              )}
            </div>
          )}

          {selectedMethod === "cash" && (
            <div className="mb-8 p-4 border border-gray-200 rounded-xl">
              <p className="text-sm text-gray-700">
                Pay in cash when your order is delivered.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-3xl font-bold text-gray-800">
                ₹{safeAmount.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Selected Method</p>
              <p className="font-semibold text-gray-800 text-lg capitalize">
                {paymentMethods.find((m) => m.id === selectedMethod)?.name}
              </p>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing || isWalletInsufficient}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : isWalletInsufficient
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:shadow-xl"
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing Payment...</span>
              </div>
            ) : selectedMethod === "wallet" && walletBalance < safeAmount ? (
              "Add Money to Wallet"
            ) : selectedMethod === "cash" ? (
              `PLACE ORDER ₹${safeAmount.toFixed(2)}`
            ) : (
              `PAY ₹${safeAmount.toFixed(2)} NOW`
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            🔒 100% Secure Payment • By proceeding, you agree to our Terms &
            Conditions
          </p>
        </div>
      </div>
    </div>
  );
}
