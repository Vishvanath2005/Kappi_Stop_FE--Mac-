import React from "react";
import Modal from "../../components/Modal";
import axios from "axios";
import { API } from "../../Host";
import toast from "react-hot-toast";

const Delete_Store = ({ item, onClose }) => {
  const handledlete = async () => {
    try {
      await axios.delete(`${API}/store/deletestore/${item.storeId}`);
      toast.success("Store disabled successfully ");
      onClose();
    } catch (error) {
      toast.error("Failed to disable store ");
      console.error("Disable store error:", error);
    }
  };
  return (
    <Modal
      title="Delete Store"
      onClose={onClose}
      Children={
        <>
          <p className="mb-4 text-center items-center">
            Are you sure you want to delete the store{" "} <br />
            <span className="font-semibold text-red-400">
              {item?.store_name}
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

export default Delete_Store;
