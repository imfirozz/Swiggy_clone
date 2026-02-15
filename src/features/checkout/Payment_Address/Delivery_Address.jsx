import React from "react";
import { useState } from "react";
export default function DeliveryAddress() {
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState("");

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-bold text-lg mb-3">Add a delivery address</h2>

      {!address ? (
        <div className="border border-dashed p-4 rounded">
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 border border-green-600 text-green-600 font-semibold rounded"
          >
            ADD NEW
          </button>
        </div>
      ) : (
        <div className="border p-4 rounded flex justify-between items-start">
          <p className="text-sm text-gray-700 whitespace-pre-line">{address}</p>
          <button
            onClick={() => setShowForm(true)}
            className="text-sm text-green-600 font-semibold"
          >
            Change
          </button>
        </div>
      )}

      {/* ADDRESS FORM */}
      {showForm && (
        <div className="mt-4 border rounded p-4">
          <textarea
            rows={3}
            placeholder="Enter full delivery address"
            className="w-full border p-2 rounded text-sm outline-none"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="flex gap-3 mt-3">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border rounded text-sm"
            >
              Cancel
            </button>

            <button
              onClick={() => setShowForm(false)}
              disabled={!address.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded text-sm disabled:opacity-50"
            >
              Save Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
