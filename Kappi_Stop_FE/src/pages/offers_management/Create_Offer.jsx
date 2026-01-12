import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../../components/Modal";
import { InputField } from "../../components/InputField";
import axios from "axios";
import { API } from "../../Host";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  Title: yup.string().required("Title is required"),
  offer_type: yup.string().required("Offer Type is required"),
  discount: yup.string().required("Discount is required"),
  valid_from: yup.string().required("Valid From is required"),
  valid_to: yup.string().required("Valid To is required"),

  offer_img: yup
    .mixed()
    .test("required", "Offer image is required", (value) => {
      return value && value.length > 0;
    }),

  available_store: yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one store")
    .required("Available store is required"),

  status: yup
    .string()
    .oneOf(["Active", "Inactive"], "Invalid Status")
    .required("Status is required"),
});

const Create_Offer = ({ onClose }) => {
  const [stores, setStores] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get(`${API}/store/getallstores`);
        setStores(res.data.data);
      } catch (err) {
        console.error("Error fetching stores:", err);
      }
    };
    fetchStores();
  }, []);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.Title);
      formData.append("offer_type", data.offer_type);
      formData.append("discount", data.discount);
      formData.append("valid_from", data.valid_from);
      formData.append("valid_to", data.valid_to);
      formData.append("status", data.status);
      formData.append("available_store", JSON.stringify(data.available_store));

      if (data.offer_img && data.offer_img[0]) {
        formData.append("offer_img", data.offer_img[0]);
      }

      await axios.post(`${API}/offer/createoffer`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Offer created successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to create offer");
      console.error("Submit error:", error);
    }
  };

  return (
    <Modal
      title="Create Offer"
      onClose={onClose}
      Children={
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-7 py-6">
              <div className="lg:space-y-4 space-y-3">

                <InputField
                  label="Title"
                  name="Title"
                  placeholder="Type Here"
                  register={register}
                  errors={errors}
                />

                {/* Offer Image */}
                <InputField
                  label="Offer Image"
                  name="offer_img"
                  type="file"
                  register={register}
                  errors={errors}
                />

                <InputField
                  label="Offer Type"
                  name="offer_type"
                  placeholder="Type Here"
                  register={register}
                  errors={errors}
                />

                <InputField
                  label="Discount %"
                  name="discount"
                  placeholder="Type Here"
                  register={register}
                  errors={errors}
                />

                <InputField
                  label="Valid From"
                  name="valid_from"
                  type="date"
                  register={register}
                  errors={errors}
                />

                <InputField
                  label="Valid To"
                  name="valid_to"
                  type="date"
                  register={register}
                  errors={errors}
                />
                

                {/* Available Store */}
                <InputField
                  label="Available Store"
                  name="available_store"
                  type="multiselect"
                  placeholder="Select Store"
                  options={stores.map((store) => ({
                    value: store.storeId,
                    label: store.storeId,
                  }))}
                  register={register}
                  errors={errors}
                />

                {/* Status */}
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

            <div className="mx-5 text-xs flex justify-end gap-2 mb-4">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer border border-layout-text text-layout-text px-6 py-2 rounded"
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
  );
};

export default Create_Offer;
