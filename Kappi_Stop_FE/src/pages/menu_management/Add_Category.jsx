import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../../components/Modal";
import { InputField } from "../../components/InputField";
import axios from "axios";
import { API } from "../../Host";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

const onSubmit = async (data) => {
  try {
    const formData = new FormData();

    formData.append("category_name", data.category_name);

    // Handle types (only if checkbox enabled)
    const typeArray =
      data.type && data.type.length > 0
        ? data.type.split(",").map((i) => i.trim())
        : [];

    formData.append("type", JSON.stringify(typeArray));

    // Image upload
    if (data.category_img && data.category_img[0]) {
      formData.append("category_img", data.category_img[0]);
    }

    // Debugging → view formData content
    for (let pair of formData.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }

    const res = await axios.post(`${API}/category/createcategory`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response:", res.data);
    onClose();
  } catch (err) {
    console.error("Submit Error:", err);
  }
};

  return (
    <>
      <Modal
        title="Add Category"
        onClose={onClose}
        Children={
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-7 py-6">
                <div className="lg:space-y-4 space-y-3">
                  <InputField
                    label="Category Name"
                    name="category_name"
                    placeholder="Enter Category Name"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="Upload Category Image"
                    name="category_img"
                    type="file"
                    register={register}
                    errors={errors}
                  />
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
                  {hasType && (
                    <InputField
                      label="Type"
                      name="type"
                      placeholder="(example: veg, non-veg)"
                      register={register}
                      errors={errors}
                    />
                  )}
                </div>
              </div>

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
    </>
  );
};

export default Add_Category;
