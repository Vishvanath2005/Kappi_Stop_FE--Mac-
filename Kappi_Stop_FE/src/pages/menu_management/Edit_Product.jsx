import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../../components/Modal";
import { InputField } from "../../components/InputField";
import axios from "axios";
import { API } from "../../Host";

const schema = yup.object().shape({
  product_name: yup.string().required("Product name is required"),

  category: yup.string().required("Category is required"),

  type: yup.string().nullable().required("Type is required"),

  add_ons: yup.string().required("Add-ons is required"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),

  status: yup
    .string()
    .oneOf(["Available", "Unavailable"], "Invalid status")
    .required("Status is required"),
});

const Edit_Product = ({ onClose, item }) => {
  const [Category, setCategory] = useState([]);
  const [selectedCategoryType, setSelectedCategoryType] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectedCategoryId = watch("category");

  const fetchCategory = async () => {
    try {
      const res = await axios.get(`${API}/category/getallcategory`);
      setCategory(res.data.data);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // 🔥 When category changes → update its types
  useEffect(() => {
    if (selectedCategoryId) {
      const selected = Category.find((cat) => cat._id === selectedCategoryId);

      if (selected && selected.type) {
        // Remove empty strings
        const cleanedType = selected.type.filter((t) => t.trim() !== "");

        setSelectedCategoryType(cleanedType);
      } else {
        setSelectedCategoryType([]);
      }
    }
  }, [selectedCategoryId, Category]);

  const onSubmit = async (data) => {
    try {
      data.add_ons = data.add_ons
        ? data.add_ons.split(",").map((a) => a.trim())
        : [];

      console.log("Updated Product:", data);

      await axios.put(`${API}/menu/updatemenu/${item.productId}`, data);

      onClose();
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return (
    <>
      <Modal
        title="Edit Product"
        onClose={onClose}
        Children={
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-7 py-6">
                <div className="lg:space-y-4 space-y-3">
                  <InputField
                    label="Product Name"
                    name="product_name"
                    placeholder={item.product_name}
                    register={register}
                    errors={errors}
                  />

                  <InputField
                    label="Category"
                    name="category"
                    type="select"
                    placeholder={item.category}
                    options={Category.map((cat) => ({
                      value: cat._id,
                      label: cat.category_name,
                    }))}
                    register={register}
                    errors={errors}
                  />

                  {/* 🔥 Auto-filled TYPE dropdown */}
                  <InputField
                    label="Type"
                    name="type"
                    type="select"
                    placeholder={item.type}
                    options={
                      selectedCategoryType.length > 0
                        ? selectedCategoryType.map((t) => ({
                            value: t,
                            label: t,
                          }))
                        : [{ value: "", label: "No types available" }]
                    }
                    register={register}
                    errors={errors}
                  />

                  <InputField
                    label="Add-ons"
                    name="add_ons"
                    placeholder={item.add_ons}
                    register={register}
                    errors={errors}
                  />

                  <InputField
                    label="Price"
                    name="price"
                    placeholder={item.price}
                    register={register}
                    errors={errors}
                  />

                  <InputField
                    label="Status"
                    name="status"
                    type="select"
                    placeholder={item.status}
                    options={[
                      {
                        value: "Available",
                        label: "Available",
                      },
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
    </>
  );
};

export default Edit_Product;
