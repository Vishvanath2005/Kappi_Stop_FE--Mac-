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
  product_name: yup.string().required("Product Name is required"),

  product_img: yup
    .mixed()
    .test("required", "Product image is required", (value) => {
      return value && value.length > 0;
    }),

  category: yup.string().required("Category is required"),

  type: yup
    .string()
    .required("Type is required")
    .test("not-empty", "Type is required", (value) => {
      return value && value.trim() !== "";
    }),

  price: yup.string().required("Price is required"),

  available_store: yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one store")
    .required("Available store is required"),

  status: yup
    .string()
    .oneOf(["Available", "Unavailable"], "Invalid Status")
    .required("Status is required"),
});

const Add_Product = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [stores, setStores] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectedCategory = watch("category");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API}/category/getallcategory`);
        setCategories(res.data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    const fetchStores = async () => {
      try {
        const res = await axios.get(`${API}/store/getallstores`);
        setStores(res.data.data);
      } catch (err) {
        console.error("Error fetching stores:", err);
      }
    };

    fetchCategories();
    fetchStores();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const selected = categories.find(
        (cat) => cat.category_name === selectedCategory
      );
      if (selected) {
        const cleaned = selected.type.filter((t) => t.trim() !== "");
        setTypes(cleaned);
      } else {
        setTypes([]);
      }
    }
  }, [selectedCategory, categories]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("product_name", data.product_name);
      formData.append("category", data.category);
      formData.append("type", data.type);
      formData.append("price", data.price);
      formData.append("status", data.status);
      formData.append("available_store", JSON.stringify(data.available_store));

      if (data.product_img && data.product_img[0]) {
        formData.append("product_img", data.product_img[0]);
      }

      await axios.post(`${API}/menu/createmenu`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Created a product");
      onClose();
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Failed to create product");
    }
  };

  return (
    <Modal
      title="Add Product"
      onClose={onClose}
      Children={
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-7 py-6">
              <div className="lg:space-y-4 space-y-3">
                <InputField
                  label="Product Name"
                  name="product_name"
                  placeholder="Enter Product Name"
                  register={register}
                  errors={errors}
                />

                <InputField
                  label="Product Image"
                  name="product_img"
                  type="file"
                  register={register}
                  errors={errors}
                />

                <InputField
                  label="Category"
                  name="category"
                  type="select"
                  placeholder="Select the Category"
                  options={categories.map((cat) => ({
                    value: cat.category_name,
                    label: cat.category_name,
                  }))}
                  register={register}
                  errors={errors}
                />

                <InputField
                  label="Type"
                  name="type"
                  type="select"
                  placeholder="Select the type"
                  options={
                    types.length > 0
                      ? types.map((t) => ({ value: t, label: t }))
                      : [{ value: "", label: "No type available" }]
                  }
                  register={register}
                  errors={errors}
                />

                <InputField
                  label="Price"
                  name="price"
                  placeholder="Enter Price"
                  register={register}
                  errors={errors}
                />

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

                <InputField
                  label="Status"
                  name="status"
                  type="select"
                  placeholder="Select the status"
                  options={[
                    { value: "Available", label: "Available" },
                    { value: "Unavailable", label: "Unavailable" },
                  ]}
                  register={register}
                  errors={errors}
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

export default Add_Product;
