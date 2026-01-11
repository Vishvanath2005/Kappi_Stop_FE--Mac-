import React from "react";
import Modal from "../../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputField } from "../../components/InputField";
import { API, formatTime } from "../../Host";
import axios from "axios";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  store_name: yup.string().required("Store Name is required"),
  city: yup.string().required("City is required"),
  address: yup.string().required("Address is required"),
  contact_number: yup.string().required("Contact Number is required"),
  opening_time: yup.string().required("Opening Time is required"),
  closing_time: yup.string().required("Closing Time is required"),
  latitude: yup
    .number()
    .typeError("Latitude must be a number")
    .required("Latitude is required"),
  longitude: yup
    .number()
    .typeError("Longitude must be a number")
    .required("Longitude is required"),
  status: yup
    .string()
    .oneOf(["Active", "Inactive"], "Invalid Status")
    .required("Status is required"),
});

const Edit_Store = ({ onClose, item }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Split opening_hours "10:00 AM - 10:00 PM"
  const [open = "", close = ""] = item.opening_hours
    ? item.opening_hours.split(" - ")
    : ["", ""];

  const onSubmit = async (data) => {
    try {
      const opening_hours = `${formatTime(data.opening_time)} - ${formatTime(
        data.closing_time
      )}`;

      const finalData = {
        store_name: data.store_name,
        city: data.city,
        address: data.address,
        store_number: data.contact_number,
        opening_hours,
        latitude: data.latitude,
        longitude: data.longitude,
        status: data.status,
      };

      const response = await axios.put(
        `${API}/store/updatestore/${item.storeId}`,
        finalData
      );

      if (response.status === 200) {
        toast.success("Store updated successfully");
        onClose();
      }
    } catch (error) {
      console.error("Error creating store:", error);
      toast.error("Failed to update store");
    }
  };

  return (
    <Modal
      title="Edit Store"
      onClose={onClose}
      Children={
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-7 py-6">
            <div className="lg:space-y-4 space-y-3">
              <InputField
                label="Store Name"
                name="store_name"
                placeholder={item.store_name}
                register={register}
                errors={errors}
              />
              <InputField
                label="City"
                name="city"
                placeholder={item.city}
                register={register}
                errors={errors}
              />
              <InputField
                label="Address"
                name="address"
                placeholder={item.address}
                register={register}
                errors={errors}
              />
              <InputField
                label="Contact Number"
                name="contact_number"
                placeholder={item.store_number}
                register={register}
                errors={errors}
              />

              {/* ⏰ Opening Time */}
              <InputField
                label="Opening Time"
                name="opening_time"
                type="time"
                placeholder={open}
                register={register}
                errors={errors}
              />

              {/* ⏰ Closing Time */}
              <InputField
                label="Closing Time"
                name="closing_time"
                type="time"
                placeholder={close}
                register={register}
                errors={errors}
              />

              {/* 📍 Latitude */}
              <InputField
                label="Latitude"
                name="latitude"
                placeholder={item.latitude}
                register={register}
                errors={errors}
              />

              {/* 📍 Longitude */}
              <InputField
                label="Longitude"
                name="longitude"
                placeholder={item.longitude}
                register={register}
                errors={errors}
              />

              <InputField
                label="Status"
                name="status"
                register={register}
                errors={errors}
                placeholder={item.status}
                type="select"
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Inactive", label: "Inactive" },
                ]}
              />
            </div>
          </div>

          <div className="mx-5 text-xs flex lg:justify-end md:justify-center justify-center gap-2 mb-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer border border-dark-yellow text-dark-yellow px-6 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-6 bg-layout-text text-white py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      }
    />
  );
};

export default Edit_Store;
