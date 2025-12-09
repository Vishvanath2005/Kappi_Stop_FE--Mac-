import React from "react";
import Table from "../../../components/Table";

const Scratch_Management = () => {
  const scratchColumns = [
    { key: "card_id", label: "Card ID" },
    { key: "type", label: "Type" },
    { key: "eligibility", label: "Eligibility" },
    { key: "expiry_date", label: "Expiry Date" },
    { key: "status", label: "Status" },
  ];

  const scratchData = [
    {
      card_id: "#A1B2C3",
      type: "Discount",
      eligibility: "All Users",
      expiry_date: "27.08.2025",
      status: "Active",
    },
    {
      card_id: "#A1B2C3",
      type: "Discount",
      eligibility: "All Users",
      expiry_date: "27.08.2025",
      status: "Active",
    },
    {
      card_id: "#A1B2C3",
      type: "Discount",
      eligibility: "All Users",
      expiry_date: "27.08.2025",
      status: "Active",
    },
    {
      card_id: "#A1B2C3",
      type: "Discount",
      eligibility: "All Users",
      expiry_date: "27.08.2025",
      status: "Active",
    },
    {
      card_id: "#A1B2C3",
      type: "Discount",
      eligibility: "All Users",
      expiry_date: "27.08.2025",
      status: "Expired",
    },
    {
      card_id: "#A1B2C3",
      type: "Discount",
      eligibility: "All Users",
      expiry_date: "27.08.2025",
      status: "Active",
    },
    ,
    {
      card_id: "#A1B2C3",
      type: "Discount",
      eligibility: "All Users",
      expiry_date: "27.08.2025",
      status: "Active",
    },

    {
      card_id: "#A1B2C3",
      type: "Discount",
      eligibility: "All Users",
      expiry_date: "27.08.2025",
      status: "Active",
    },
    {
      card_id: "#A1B2C3",
      type: "Discount",
      eligibility: "All Users",
      expiry_date: "27.08.2025",
      status: "Active",
    },
  ];

  return (
    <>
      <Table
        Export_Filter={false}
        data={scratchData}
        columns={scratchColumns}
        EditModal={true}
        ViewRoute={true}
        itemsPerPage={9}
      />
    </>
  );
};

export default Scratch_Management;
