import React from "react";
import Modal from "../../components/Modal";
import axios from "axios";
import { API } from "../../Host";
import toast from "react-hot-toast";

const Delete_Offer = ({ item, onClose }) => {
  const handledlete = async () => {
    try {
      await axios.delete(`${API}/offer/deleteoffer/${item.offerId}`);
      toast.success("Offer deleted successfully ");
      onClose();
    } catch (error) {
      toast.error("Failed to Delete Offer");
      console.error("Disable store error:", error);
    }
  };
  return (
    <Modal
      title="Delete Offer"
      onClose={onClose}
      Children={
        <>
          <p className="mb-4 text-center items-center">
            Are you sure you want to delete the Offer{" "} <br />
            <span className="font-semibold text-red-400">
              {item?.offerId}
            </span>
            ?
          </p>

          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-1 bg-gray-200 rounded-md"
            >
              Cancel
            </button>

            <button
              onClick={handledlete}
              className="px-4 py-1 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </>
      }
    />
  );
};

export default Delete_Offer