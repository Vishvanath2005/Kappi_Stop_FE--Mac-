import React from "react";
import Modal from "../../components/Modal";
import { TbBuildingStore } from "react-icons/tb";
import { BsCheckCircle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../../Host";
import { useNavigate } from "react-router";

const Disable_Store = ({ onClose, item }) => {
  const navigate = useNavigate();

  const handleDisable = async () => {
    try {
      const payload = {
        ...item,
        status: "Inactive",
      };

      await axios.put(`${API}/store/updatestore/${item.storeId}`, payload);

      toast.success("Store disabled successfully ");
      onClose();
      navigate(-1);
    } catch (error) {
      toast.error("Failed to disable store ");
      console.error("Disable store error:", error);
    }
  };

  return (
    <Modal
      title="Disable Store"
      onClose={onClose}
      Children={
        <>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-3 bg-[#FCFAF7] p-3 rounded-md">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#F2E8E6]">
                <TbBuildingStore size={20} className="text-dark-brown" />
              </div>
              <div>
                <p className="font-medium">{item.store_name}</p>
                <span className="text-xs text-dark-brown">
                  Store ID: #{item.storeId || item._id?.slice(-6)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#FCFAF7] p-3 rounded-md">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#F2E8E6]">
                <BsCheckCircle size={20} />
              </div>
              <p className="font-medium">Current Status: {item.status}</p>
            </div>
          </div>

          <p className="text-sm text-center mb-4">
            Are you sure you want to disable this store?
          </p>

          <textarea
            className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#FCFAF7]"
            placeholder="Reason (Optional)"
            rows={5}
          />

          <p className="text-xs text-[#99594D] mt-3">
            Disabling the store will hide it from customers and block new
            orders.
          </p>

          <div className="flex justify-end gap-3 mt-7">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-sm text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDisable}
              className="px-6 py-2 bg-red-600 text-white rounded-sm text-sm cursor-pointer"
            >
              Disable
            </button>
          </div>
        </>
      }
    />
  );
};

export default Disable_Store;
