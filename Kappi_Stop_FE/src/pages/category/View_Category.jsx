import React from "react";
import { useLocation } from "react-router";
import View_Page from "../../components/View_Page";

const View_Category = () => {
  const { state } = useLocation();
  
  // convert array -> formatted text
  const product = {
    ...state?.item,
    type: Array.isArray(state?.item?.type)
      ? state.item.type.join(", ")
      : state?.item?.type || "-"
  };

  const productColumns = [
    { key: "category_name", label: "Category Name" },
    { key: "type", label: "Type" }
  ];

  return (
    <View_Page
      title="Category"
      columns={productColumns}
      data={product}
      images_upload={`/category/${product.category_img}`}
      StatusModal={true}
    />
  );
};

export default View_Category;
