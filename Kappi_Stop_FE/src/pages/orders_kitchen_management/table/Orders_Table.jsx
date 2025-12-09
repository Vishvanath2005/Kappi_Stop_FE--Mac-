import React from "react";
import Table from "../../../components/Table";

const Orders_Table = () => {
  const ordersData = [
    {
      order_id: "#12345",
      store_name: "Main Street Diner",
      user_name: "Sophia Clark",
      order_type: "Dine-in",
      payment_mode: "Card",
      amount: "$25.50",
      order_time: "10:15 AM",
      status: "Completed",
    },
    {
      order_id: "#12345",
      store_name: "Main Street Diner",
      user_name: "Sophia Clark",
      order_type: "Dine-in",
      payment_mode: "Card",
      amount: "$25.50",
      order_time: "10:15 AM",
      status: "Completed",
    },
    {
      order_id: "#12345",
      store_name: "Main Street Diner",
      user_name: "Sophia Clark",
      order_type: "Dine-in",
      payment_mode: "Card",
      amount: "$25.50",
      order_time: "10:15 AM",
      status: "Completed",
    },
    {
      order_id: "#12345",
      store_name: "Main Street Diner",
      user_name: "Sophia Clark",
      order_type: "Dine-in",
      payment_mode: "Card",
      amount: "$25.50",
      order_time: "10:15 AM",
      status: "Completed",
    },
    {
      order_id: "#12345",
      store_name: "Main Street Diner",
      user_name: "Sophia Clark",
      order_type: "Dine-in",
      payment_mode: "Card",
      amount: "$25.50",
      order_time: "10:15 AM",
      status: "Completed",
    },
    {
      order_id: "#12345",
      store_name: "Main Street Diner",
      user_name: "Sophia Clark",
      order_type: "Dine-in",
      payment_mode: "Card",
      amount: "$25.50",
      order_time: "10:15 AM",
      status: "Completed",
    },
    {
      order_id: "#12345",
      store_name: "Main Street Diner",
      user_name: "Sophia Clark",
      order_type: "Dine-in",
      payment_mode: "Card",
      amount: "$25.50",
      order_time: "10:15 AM",
      status: "Completed",
    },
    {
      order_id: "#12345",
      store_name: "Main Street Diner",
      user_name: "Sophia Clark",
      order_type: "Dine-in",
      payment_mode: "Card",
      amount: "$25.50",
      order_time: "10:15 AM",
      status: "Completed",
    },
    {
      order_id: "#12345",
      store_name: "Main Street Diner",
      user_name: "Sophia Clark",
      order_type: "Dine-in",
      payment_mode: "Card",
      amount: "$25.50",
      order_time: "10:15 AM",
      status: "Completed",
    },
  ];

  const ordersColumns = [
    { key: "order_id", label: "Order ID" },
    { key: "store_name", label: "Store Name" },
    { key: "user_name", label: "User Name" },
    { key: "order_type", label: "Order Type" },
    { key: "payment_mode", label: "Payment Mode" },
    { key: "amount", label: "Amount" },
    { key: "order_time", label: "Order Time" },
    { key: "status", label: "Status" },
  ];
  return (
    <>
      <Table
        Export_Filter={false}
        showActions={true}
        ViewRoute={true}
        EditModal={true}
        columns={ordersColumns}
        data={ordersData}
        itemsPerPage={8}
      />
    </>
  );
};

export default Orders_Table;
