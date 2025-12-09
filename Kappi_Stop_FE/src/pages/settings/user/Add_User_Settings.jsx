import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import Modal from "../../../components/Modal";
import { InputField } from "../../../components/InputField";
import { API } from "../../../Host";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone Number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.string().required("Role is required"),
  store: yup.array().min(1, "Select at least one store"),
});

const Add_User_Settings = ({ onClose }) => {
  const [stores, setStores] = useState([]);
  const [roles, setRoles] = useState([]);

  const myrole = localStorage.getItem("role");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stores
        const storeRes = await axios.get(`${API}/store/getallstores`);
        setStores(storeRes.data.data || []);

        // Fetch roles
        const roleRes = await axios.get(`${API}/role/getallroles`);
        setRoles(roleRes.data.data || []);
      } catch (error) {
        console.error("Error fetching stores/roles:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const payload = {
        member_name: data.name,
        phone: data.phone,
        email: data.email,
        role: data.role,
        store: data.store,
        created_by: myrole, // array of store IDs
      };

      // sending role as query
      const res = await axios.post(
        `${API}/member/createmember?role=${myrole}`,
        payload
      );

      console.log("Response:", res.data);

      reset();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Modal
      onClose={onClose}
      title="Add User"
      Children={
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-7 py-6">
            <div className="space-y-4">
              <InputField
                label="Name"
                name="name"
                placeholder="Enter your name"
                register={register}
                errors={errors}
              />

              <InputField
                label="Phone Number"
                name="phone"
                placeholder="Enter the phone number"
                register={register}
                errors={errors}
              />

              <InputField
                label="Email ID"
                name="email"
                placeholder="Enter the mail ID"
                register={register}
                errors={errors}
              />

              {/* Dynamic Roles */}
              <InputField
                label=" Role"
                name="role"
                type="select"
                register={register}
                errors={errors}
                placeholder="Select Role"
                options={roles.map((r) => ({
                  value: r.role_name,
                  label: r.role_name,
                }))}
              />

              {/* Store Multi-Select */}
              <InputField
                label="Store"
                name="store"
                type="multiselect"
                placeholder="Select Store"
                options={stores.map((store) => ({
                  value: store.storeId,
                  label: store.storeId,
                }))}
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

export default Add_User_Settings;
