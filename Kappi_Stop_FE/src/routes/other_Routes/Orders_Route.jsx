import React from "react";
import Orders_Kitchen_Management from "../../pages/orders_kitchen_management/Orders_Kitchen_Management";
import { Route } from "react-router";

const Orders_Route = () => {
  return (
    <>
      <Route path="/orders" element={<Orders_Kitchen_Management />} />
    </>
  );
};

export default Orders_Route;
