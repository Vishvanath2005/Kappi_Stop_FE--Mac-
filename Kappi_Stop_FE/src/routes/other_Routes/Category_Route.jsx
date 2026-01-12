import React from "react";
import { Route } from "react-router";
import Category from "../../pages/category/Category";
import View_Category from "../../pages/category/View_Category";

const Category_Route = () => {
  return (
    <>
      <Route path="/category">
        <Route index element={<Category />} />
        <Route path="view_category" element={<View_Category />} />
      </Route>
    </>
  );
};

export default Category_Route;
