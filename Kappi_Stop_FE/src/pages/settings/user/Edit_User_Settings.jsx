import React from "react";
import { useForm } from "react-hook-form";
import { IoSave } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { InputField } from "../../../components/InputField";

const userSchema = Yup.object().shape({
  userId: Yup.string().required("User ID is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  role: Yup.string().required("Role is required"),
});

const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/[a-z]/, "Must include at least one lowercase letter")
    .matches(/[0-9]/, "Must include at least one number")
    .matches(/[!@#$%^&*]/, "Must include at least one special character")
    .min(9, "Must be at least 9 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const Edit_User_Settings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = (data) => {
    console.log("User Info Submitted:", data);
  };

  const onSubmitPassword = (data) => {
    console.log("Password Change Submitted:", data);
  };

  return (
    <>
      <div className="font-roboto-flex flex flex-col">
        <p className="space-x-1">
          <span>Settings</span>
          <span>/ User</span>
        </p>
        <p className="text-xl font-semibold">Edit User</p>
      </div>

      <div className="grid grid-cols-12 gap-4 my-4 mr-4">
        <div className="sm:col-span-6 col-span-12 w-full py-6 rounded-lg bg-white shadow-lg">
          <p className="w-full text-2xl font-semibold flex justify-center items-center mb-4">
            Edit User
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 px-6">
              <InputField
                label="User ID"
                name="userId"
                register={register}
                errors={errors}
                placeholder="Type Here"
              />
              <InputField
                label="Name"
                name="name"
                register={register}
                errors={errors}
                placeholder="Type Here"
              />
              <InputField
                label="Email ID"
                name="email"
                register={register}
                errors={errors}
                placeholder="Type Here"
                type="email"
              />
              <InputField
                label="Phone Number"
                name="phoneNumber"
                register={register}
                errors={errors}
                placeholder="Type Here"
              />
              <InputField
                label="Role"
                name="role"
                type="select"
                register={register}
                errors={errors}
                options={[
                  { value: "Admin", label: "Admin" },
                  { value: "User", label: "User" },
                  { value: "Manager", label: "Manager" },
                ]}
                placeholder="Select Role"
              />
            </div>

            <div className="mx-5 text-xs flex justify-end gap-2 mt-6">
              <button
                type="submit"
                className="flex gap-2 text-base items-center p-2 px-5 bg-layout-text text-white rounded"
              >
                <IoSave size={20} />
                Save
              </button>
            </div>
          </form>
        </div>

        <div className="sm:col-span-6 col-span-12 h-fit py-5 rounded-lg bg-white shadow-lg">
          <p className="w-full text-2xl font-semibold flex justify-center items-center mb-4">
            Change Password
          </p>

          <form
            onSubmit={handleSubmitPassword(onSubmitPassword)}
            className="space-y-4 px-6"
          >
            <InputField
              label="New Password"
              name="newPassword"
              type="password"
              register={registerPassword}
              errors={passwordErrors}
              placeholder="Enter New Password"
            />

            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={registerPassword}
              errors={passwordErrors}
              placeholder="Re-enter New Password"
            />

            <p className="text-xs text-gray-700">
              Make sure your password has: one capital letter, one small letter,
              one number, one special symbol, and is at least 9 characters long.
            </p>
            <p className="text-sm mt-1">
              <strong>Example:</strong> Design@2024
            </p>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-layout-text text-white rounded"
              >
                <IoSave size={20} /> Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit_User_Settings;