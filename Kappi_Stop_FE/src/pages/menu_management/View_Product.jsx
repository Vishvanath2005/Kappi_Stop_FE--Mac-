import React from "react";
import { useLocation } from "react-router";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import View_Page from "../../components/View_Page";

const View_Product = () => {
  const { state } = useLocation();
  const product = state?.item || {};

  const productColumns = [
    { key: "productId", label: "Product ID" },
    { key: "product_name", label: "Product Name" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "add_ons", label: "Add-ons Available" },
    { key: "last_updated", label: "Last Updated" },
    { key: "status", label: "Status" },
  ];

  return (
    <View_Page
      title="Menu Management"
      status_name={
        product?.status === "Available" ? "Unavailable" : "Available"
      }
      icon_name={<HiOutlineBuildingStorefront size={22} />}
      button_color={`${
        product.status === "Available" ? "bg-layout-text" : "bg-white"
      }`}
      button_text_color={`${
        product.status === "Available" ? "text-white" : "text-layout-text"
      }`}
      columns={productColumns}
      data={product}
      StatusModal={true}
    />
  );
};

export default View_Product;
