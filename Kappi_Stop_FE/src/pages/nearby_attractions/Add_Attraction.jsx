import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../../components/Modal";
import { InputField } from "../../components/InputField";

const schema = yup.object().shape({
  attractionID: yup.string().required("AttractionID is required"),
  title: yup.string().required("Title is required"),
  city_location: yup.string().required("City/Location is required"),
  linked_store: yup
    .string()
    .oneOf(["Store A", "Store B"], "Invalid Linkedstore")
    .required("DateandTime is required"),
  status: yup
    .string()
    .oneOf(["Active", "Inactive"], "Invalid Status")
    .required("Court is required"),
  add_on: yup.string().required("Add On is required"),
});

const Add_Attraction = ({ onClose }) => {
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
        title="Add Nearby Attractions"
        onClose={onClose}
        Children={
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" px-7 py-6">
                <div className=" lg:space-y-4 space-y-3">
                  <InputField
                    label="Attraction ID"
                    name="attractionID"
                    placeholder="Type Here"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="Title"
                    name="title"
                    placeholder="Type Here"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="City/Location"
                    name="city_location"
                    placeholder="Type Here"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="Linked Store"
                    name="linkedstore"
                    register={register}
                    errors={errors}
                    type="select"
                    placeholder="Type Here"
                    options={[
                      {
                        value: "Store A",
                        label: "Store A",
                      },
                      { value: "Store B", label: "Store B" },
                    ]}
                  />
                  <InputField
                    label="Status"
                    name="status"
                    register={register}
                    errors={errors}
                    type="select"
                    placeholder="Type Here"
                    options={[
                      {
                        value: "Active",
                        label: "Active",
                      },
                      { value: "Inactive", label: "Inactive" },
                    ]}
                  />
                  <InputField
                    label="Add On"
                    name="add_on"
                    register={register}
                    errors={errors}
                    placeholder="Type Here"
                  />
                </div>
              </div>
              <div className="mx-5 text-xs flex lg:justify-end md:justify-center justify-center gap-2 mb-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer  border  border-layout-text  text-layout-text px-6 py-2   rounded"
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

export default Add_Attraction;
