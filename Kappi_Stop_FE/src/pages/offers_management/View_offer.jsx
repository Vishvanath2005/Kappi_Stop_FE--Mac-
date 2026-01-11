import React from "react";
import View_Page from "../../components/View_Page";
import { useLocation } from "react-router";
import { MdOutlineBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";

const View_offer = () => {
  const { state } = useLocation();
  const offer = state?.item || {};

  const offerColumns = [
    { key: "offerId", label: "Offer ID" },
    { key: "title", label: "Title" },
    { key: "offer_type", label: "Offer Type" },
    { key: "discount", label: "Discount %" },
    { key: "validity", label: "Validity (From - To)" },
    { key: "applicableStores", label: "Applicable Stores" },
    { key: "status", label: "Status" },
  ];

  return (
    <>
      <View_Page
        title="Offer Management"
        status_name={offer?.status === "Active" ? "Inactive" : "Active"}
        icon_name={
          offer.status === "Active" ? (
            <MdOutlineBlock size={22} />
          ) : (
            <CgUnblock size={22} />
          )
        }
        button_color={`${
          offer.status === "Active" ? "bg-layout-text" : "bg-white"
        }`}
        button_text_color={`${
          offer.status === "Active" ? "text-white" : "text-layout-text"
        }`}
        columns={offerColumns}
        data={offer}
        StatusModal={true}
      />
    </>
  );
};

export default View_offer;
