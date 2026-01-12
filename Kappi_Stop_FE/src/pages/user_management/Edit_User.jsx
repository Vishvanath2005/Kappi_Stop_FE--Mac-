import React, { useEffect } from "react";
import Modal from "../../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { InputField } from "../../components/InputField";
import { API } from "../../Host";

const schema = yup.object().shape({
  user_name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone Number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  wallet_balance: yup.string().required("Wallet Balance is required"),
  status: yup
    .string()
    .oneOf(["Active", "Inactive"], "Invalid Status")
    .required("Status is required"),
});

const Edit_User = ({ onClose, item }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Pre-fill inputs using setValue
  useEffect(() => {
    if (item) {
      setValue("user_name", item.user_name);
      setValue("phone", item.phone);
      setValue("email", item.email);
      setValue("wallet_balance", item.wallet_balance);
      setValue("status", item.status || "Active");
    }
  }, [item, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        user_name: data.user_name,
        phone: data.phone,
        email: data.email,
        wallet_balance: data.wallet_balance,
        status: data.status,
      };
      console.log(payload);

      const response = await axios.put(
        `${API}/user/update/${item.userId}`,
        payload
      );

      if (response.status === 200) {
        toast.success("User updated successfully");
        onClose();
      }
    } catch (error) {
      toast.error("Failed to update user");
      console.error("Error updating user:", error);
    }
  };

  return (
    <Modal
      title="Edit User"
      onClose={onClose}
      Children={
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-7 py-6">
            <div className="lg:space-y-4 space-y-3">
              <InputField
                label="Name"
                name="user_name"
                register={register}
                errors={errors}
              />

              <InputField
                label="Phone Number"
                name="phone"
                register={register}
                errors={errors}
              />

              <InputField
                label="Email ID"
                name="email"
                register={register}
                errors={errors}
              />

              <InputField
                label="Wallet Balance"
                name="wallet_balance"
                register={register}
                errors={errors}
              />

              <InputField
                label="Status"
                name="status"
                type="select"
                register={register}
                errors={errors}
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Inactive", label: "Inactive" },
                ]}
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
