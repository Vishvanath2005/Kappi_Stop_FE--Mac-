import React, { useState } from "react";
import Modal from "../../components/Modal";
import Pic from "../../assets/images/block_pic.png";

const Block_User = ({ onClose, item }) => {
  const user = item || {};
  const blockReasons = [
    "Suspicious activity",
    "Violation of terms",
    "Multiple failed login attempts",
    "Fraudulent transactions",
    "Other",
  ];
  const [selectedReason, setSelectedReason] = useState("");
  return (
    <Modal
      onClose={onClose}
      title="Block User"
      Children={
        <>
          <p className="text-sm text-center mb-4">
            Are you sure you want to block this user?
          </p>
          <div className="flex justify-center items-center gap-6">
            <img
              src={Pic}
              alt="User"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="text-center">
              <p className="text-xl font-semibold">{user.name}</p>
              <p className="text-gray-600">User ID: {user.userId}</p>
              <p
                className={`${
                  user.status === "Active" ? "text-green-600" : "text-red-600"
                }`}
              >
                Status: {user.status}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-gray-700">
              Reason for blocking
            </p>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-layout-text"
            >
              <option value="">Select a reason</option>
              {blockReasons.map((reason, idx) => (
                <option key={idx} value={reason}>
                  {reason}
                </option>
              ))}
            </select>

            {selectedReason === "Other" && (
              <input
                type="text"
                placeholder="Enter custom reason"
                className="w-full border rounded-lg p-2 mt-2 text-sm focus:outline-none focus:ring-1 focus:ring-layout-text"
              />
            )}
          </div>
          <p className="text-sm text-center text-red-700 mt-4">
            The user won’t be able to log in or place orders after being
            blocked.
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded text-sm cursor-pointer hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log(`User ${user.name} blocked for:`, selectedReason);
                onClose();
              }}
              className="px-6 py-2 bg-red-600 text-white rounded text-sm cursor-pointer hover:bg-red-700"
            >
              Block User
            </button>
          </div>
        </>
      }
    />
  );
};

export default Block_User;
