import React from "react";
import { useLocation } from "react-router";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import View_Page from "../../components/View_Page";
import Disable_Store from "./Disable_Store";

const View_Store = () => {
  const { state } = useLocation();
  const store = state?.item || {};

 const storeColumns = [
    { key: "storeId", label: "Store ID" },
    { key: "store_name", label: "Store Name" },
    { key: "city", label: "City" },
    { key: "address", label: "Address" },
    { key: "store_number", label: "Contact Number" },
    { key: "opening_hours", label: "Opening Hours" },
    { key: "latitude", label: "Latitude" },
    { key: "longitude", label: "Longitude" },
    { key: "status", label: "Status" },
  ];

  return (
    <View_Page
      title="Store Management"
      status_name={
        store?.status === "Active" ? "Disable Store" : "Enable Store"
      }
      icon_name={<HiOutlineBuildingStorefront size={22} />}
      button_color={`${
        store.status === "Active" ? "bg-layout-text" : "bg-white"
      }`}
      button_text_color={`${
        store.status === "Active" ? "text-white" : "text-layout-text"
      }`}
      columns={storeColumns}
      data={store}
      StatusModal={Disable_Store}
    />
  );
};

export default View_Store;
