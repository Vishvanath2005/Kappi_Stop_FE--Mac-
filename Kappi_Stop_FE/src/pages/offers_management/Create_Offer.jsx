import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../../components/Modal";
import { InputField } from "../../components/InputField";

const schema = yup.object().shape({
//   offerID: yup.string().required("OfferID is required"),
  Title: yup.string().required("Title is required"),
  offer_type: yup.string().required("OfferType is required"),
  discount: yup.string().required("Discount is required"),
  valid_from: yup.string().required("validfrom is required"),
  valid_to: yup.string().required("validto is required"),
  applicable_store: yup
    .string()
    .oneOf(["Store A", "Store B"], "Invalid Status")
    .required("Applicablestore is required"),
});

const Create_Offer = ({onClose}) => {
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
        title="Create Offer"
        onClose={onClose}
        Children={
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" px-7 py-6">
                <div className=" lg:space-y-4 space-y-3">
                  <InputField
                    label="Title"
                    name="Title"
                    placeholder="Type Here"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="Offer Type"
                    name="offertype"
                    placeholder="Type Here"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="Discount %"
                    name="discount"
                    register={register}
                    errors={errors}
                    placeholder="Type Here"
                  />
                  <InputField
                    label="Valid From"
                    name="validfrom"
                    register={register}
                    errors={errors}
                    placeholder="Type Here"
                  />
                  <InputField
                    label="Valid To"
                    name="validto"
                    register={register}
                    errors={errors}
                    placeholder="Type Here"
                  />
                  <InputField
                    label="Applicable Stores"
                    name="applicablestore"
                    register={register}
                    errors={errors}
                    placeholder="Type Here"
                    type="select"
                    options={[
                      {
                        value: "Store A",
                        label: "Store A",
                      },
                      { value: "Store B", label: "Store B" },
                    ]}
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

export default Create_Offer;
