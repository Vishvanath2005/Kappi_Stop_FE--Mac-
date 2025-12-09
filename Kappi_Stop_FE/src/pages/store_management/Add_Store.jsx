import React from "react";
import Modal from "../../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputField } from "../../components/InputField";
import axios from "axios";
import { API, formatTime } from "../../Host";

const schema = yup.object().shape({
  store_name: yup.string().required("Store Name is required"),
  city: yup.string().required("City is required"),
  address: yup.string().required("Address is required"),

  contact_number: yup
    .string()
    .matches(/^[0-9]+$/, "Contact Number must contain only digits")
    .min(10, "Minimum 10 digits required")
    .max(15, "Maximum 15 digits allowed")
    .required("Contact Number is required"),

  opening_time: yup.string().required("Opening time is required"),
  closing_time: yup.string().required("Closing time is required"),
   status: yup
      .string()
      .oneOf(["Active", "Disable"], "Invalid status")
      .required("Status is required"),
});

const Add_Store = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Create opening_hours only
      const opening_hours = `${formatTime(data.opening_time)} - ${formatTime(
        data.closing_time
      )}`;

      // Build final data object WITHOUT opening_time & closing_time
      const finalData = {
        store_name: data.store_name,
        city: data.city,
        address: data.address,
        store_number: data.contact_number,
        opening_hours: opening_hours,
        status:data.status,
      };

      console.log("Submitting Store:", finalData);

      const response = await axios.post(`${API}/store/createstore`, finalData);

      if (response.status === 201 || response.status === 200) {
        onClose();
      }
    } catch (error) {
      console.error("Error creating store:", error);
    }
  };

  return (
    <>
      <Modal
        title="Add Store"
        onClose={onClose}
        Children={
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-7 py-6">
                <div className="lg:space-y-4 space-y-3">
                  <InputField
                    label="Store Name"
                    name="store_name"
                    placeholder="Enter the Store Name"
                    register={register}
                    errors={errors}
                  />

                  <InputField
                    label="City"
                    name="city"
                    placeholder="Enter the City"
                    register={register}
                    errors={errors}
                  />

                  <InputField
                    label="Address"
                    name="address"
                    placeholder="Enter the Address"
                    register={register}
                    errors={errors}
                  />

                  <InputField
                    label="Contact Number"
                    name="contact_number"
                    placeholder="Enter the Contact Number"
                    register={register}
                    errors={errors}
                  />

                  <InputField
                    label="Opening Time"
                    name="opening_time"
                    type="time"
                    register={register}
                    errors={errors}
                  />

                  <InputField
                    label="Closing Time"
                    name="closing_time"
                    type="time"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="Status"
                    name="status"
                    type="select"
                    placeholder="Select Status"
                    options={[
                      {
                        value: "Active",
                        label: "Active",
                      },
                      { value: "Disable", label: "Disable" },
                    ]}
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>

              <div className="mx-5 text-xs flex lg:justify-end justify-center gap-2 mb-4">
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
          </>
        }
      />
    </>
  );
};

export default Add_Store;
