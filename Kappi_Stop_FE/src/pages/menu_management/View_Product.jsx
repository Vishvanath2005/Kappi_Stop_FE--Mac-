import React from "react";
import { useLocation } from "react-router";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import View_Page from "../../components/View_Page";

const View_Product = () => {
  const { state } = useLocation();
  const product = state?.item || {};

  console.log(product);

  const productColumns = [
    { key: "productId", label: "Product ID" },
    { key: "product_name", label: "Product Name" },
    { key: "category", label: "Category" },
    { key: "type", label: "Type" },
    { key: "price", label: "Price" },
    { key: "last_updated", label: "Last Updated" },
    { key: "status", label: "Status" },
  ];

  return (
    <View_Page
      title="Menu Management"
      status_name={product.status === "Available" ? "Unavailable" : "Available"}
      icon_name={<HiOutlineBuildingStorefront size={22} />}
      button_color={
        product.status === "Available" ? "bg-layout-text" : "bg-white"
      }
      button_text_color={
        product.status === "Available" ? "text-white" : "text-layout-text"
      }
      images_upload={`menu/${product.product_img}`}
      status_change={`menu/updatemenu/${product.productId}`}
      status_success="Product updated successfully"
      status_error="Failed to update the product"
      columns={productColumns}
      data={product}
    />
  );
};

export default View_Product;
