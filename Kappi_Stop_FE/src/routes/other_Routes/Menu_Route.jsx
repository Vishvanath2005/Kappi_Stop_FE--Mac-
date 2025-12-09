import React from "react";
import { Route } from "react-router";
import Menu_Management from "../../pages/menu_management/Menu_Management";
import View_Product from "../../pages/menu_management/View_Product";

const Menu_Route = () => {
  return (
    <>
      <Route path="/menu">
        <Route index element={<Menu_Management />} />
        <Route path="view_product" element={<View_Product />} />
      </Route>
    </>
  );
};

export default Menu_Route;
