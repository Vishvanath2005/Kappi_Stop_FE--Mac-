import React from "react";
import Modal from "../../components/Modal";
import { TbBuildingStore } from "react-icons/tb";
import { BsCheckCircle } from "react-icons/bs";

const Disable_Store = ({ onClose, item }) => {
  return (
    <>
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
                  <p className="font-medium">The Corner Shop</p>
                  <span className="text-xs text-dark-brown">
                    Store ID: #5689336
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#FCFAF7] p-3 rounded-md">
                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#F2E8E6]">
                  <BsCheckCircle size={20} />
                </div>
                <p className="font-medium">Status : {item.status}</p>
              </div>
            </div>

            <p className="text-sm text-center mb-4">
              Are you sure you want to enable this store?
            </p>

            <textarea
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#FCFAF7]"
              placeholder="Type Here"
              rows={5}
            />

            <p className="text-xs text-[#99594D] mt-3">
              Enabling the store will make it visible to customers and available
              for new orders.
            </p>

            <div className="flex justify-end gap-3 mt-7">
              <button
                onClick={onClose}
                className="px-5 py-2 border border-gray-300 rounded-sm text-sm cursor-pointer "
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-red-600 text-white rounded-sm text-sm cursor-pointer ">
                Disable
              </button>
            </div>
          </>
        }
      />
    </>
  );
};

export default Disable_Store;
