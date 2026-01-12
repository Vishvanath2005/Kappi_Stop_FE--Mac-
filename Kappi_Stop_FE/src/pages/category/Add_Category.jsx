import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../../components/Modal";
import { InputField } from "../../components/InputField";
import axios from "axios";
import { API } from "../../Host";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  category_name: yup.string().required("Category Name is required"),
  category_img: yup
    .mixed()
    .required("Image is required")
    .test(
      "fileRequired",
      "Image is required",
      (value) => value && value.length > 0
    ),
});

const Add_Category = ({ onClose }) => {
  const [hasType, setHasType] = useState(false);
  const [typeFields, setTypeFields] = useState([""]); // ⭐ dynamic field store

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Update a specific type field
  const handleTypeChange = (index, value) => {
    const updated = [...typeFields];
    updated[index] = value;
    setTypeFields(updated);
    setValue("type", updated); // sync with react-hook-form
  };

  // Add new type input
  const addNewType = () => {
    setTypeFields([...typeFields, ""]);
  };

  // Submit
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("category_name", data.category_name);

      // convert dynamic fields → clean array
      const typeArray = typeFields
        .filter((t) => t.trim() !== "")
        .map((t) => t.trim());

      formData.append("type", JSON.stringify(typeArray));

      if (data.category_img?.[0]) {
        formData.append("category_img", data.category_img[0]);
      }

      await axios.post(`${API}/category/createcategory`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Category Created");
      onClose();
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Category found error");
    }
  };

  return (
    <Modal
      title="Add Category"
      onClose={onClose}
      Children={
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-7 py-6">
              <div className="lg:space-y-4 space-y-3">
                {/* Category Name */}
                <InputField
                  label="Category Name"
                  name="category_name"
                  placeholder="Enter Category Name"
                  register={register}
                  errors={errors}
                />

                {/* Upload Image */}
                <InputField
                  label="Upload Category Image"
                  name="category_img"
                  type="file"
                  register={register}
                  errors={errors}
                />

                {/* Checkbox */}
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={hasType}
                    onChange={() => setHasType(!hasType)}
                    className="w-4 h-4"
                  />
                  <label className="text-sm font-medium">
                    Does this category have types?
                  </label>
                </div>

                {/* ⭐ Dynamic Types */}
                {hasType && (
                  <div className="space-y-2">
                    {typeFields.map((field, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-12 items-center gap-2"
                      >
                        <label className="col-span-5 text-sm font-medium">
                          Type {index + 1}
                        </label>

                        <input
                          type="text"
                          value={field}
                          onChange={(e) =>
                            handleTypeChange(index, e.target.value)
                          }
                          placeholder="Enter type (e.g., veg)"
                          className="col-span-6 border border-input-bordergrey rounded-lg outline-none py-2 px-2 text-xs"
                        />

                        {/* ➕ show only on last input */}
                        {index === typeFields.length - 1 && (
                          <button
                            type="button"
                            className="col-span-1 px-2 py-2 bg-layout-text text-white rounded text-sm"
                            onClick={addNewType}
                          >
                            +
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mx-5 text-xs flex lg:justify-end justify-center gap-2 mb-4">
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

export default Add_Category;
