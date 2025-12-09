import React from "react";
import { Route } from "react-router";
import Store_Management from "../../pages/store_management/Store_Management";
import View_Store from "../../pages/store_management/View_Store";

const Store_Route = () => {
  return (
    <>
      <Route path="/store">
        <Route index element={<Store_Management />} />
        <Route path="view_store" element={<View_Store />} />
      </Route>
    </>
  );
};

export default Store_Route;
