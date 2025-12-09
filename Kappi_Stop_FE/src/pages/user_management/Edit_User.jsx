import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Modal from "../../components/Modal";
import { InputField } from "../../components/InputField";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone Number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  wallet_balance: yup.string().required("Wallet Balance is required"),
});

const Edit_User = ({ onClose, item }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      reset();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Modal
      onClose={onClose}
      title="Edit User"
      Children={
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-7 py-6">
            <div className="space-y-4">
              <InputField
                label="Name"
                name="name"
                placeholder={`${item.name}`}
                register={register}
                errors={errors}
              />
              <InputField
                label="Phone Number"
                name="phone"
                placeholder={`${item.phone}`}
                register={register}
                errors={errors}
              />
              <InputField
                label="Email ID"
                name="email"
                placeholder={`${item.email}`}
                register={register}
                errors={errors}
              />
              <InputField
                label="Wallet Balance"
                name="wallet_balance"
                placeholder={`${item.wallet_balance}`}
                register={register}
                errors={errors}
              />
            </div>
          </div>

          <div className="mx-5 mb-4 flex justify-center gap-2 text-xs lg:justify-end md:justify-center">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer border border-dark-yellow text-dark-yellow px-6 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer bg-layout-text text-white px-6 py-2 rounded"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      }
    />
  );
};

export default Edit_User;
