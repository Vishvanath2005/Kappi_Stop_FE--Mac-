import React from "react";
import Modal from "../../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputField } from "../../components/InputField";

const schema = yup.object().shape({
  store_name: yup.string().required("Store Name is required"),
  city: yup.string().required("City is required"),
  address: yup.string().required("Address is required"),
  contact_number: yup.string().required("Contact Number is required"),
  opening_hours: yup.string().required("Opening Hours is required"),
  status: yup
    .string()
    .oneOf(["Active", "Inactive"], "Invalid Status")
    .required("Status is required"),
});
const Edit_Store = ({onClose,item}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    onClose();
  };
  return (
    <>
      <Modal
        title="Edit Store"
        onClose={onClose}
        Children={
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" px-7 py-6">
                <div className=" lg:space-y-4 space-y-3">
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
                    placeholder={item.contact_number}
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="Opening Hours"
                    name="opening_hours"
                    placeholder={item.opening_hours}
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
                  className="cursor-pointer  border  border-dark-yellow  text-dark-yellow px-6 py-2   rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-6 bg-layout-text text-white py-2   rounded"
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

export default Edit_Store;
