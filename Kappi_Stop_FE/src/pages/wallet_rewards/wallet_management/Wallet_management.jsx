import React from "react";
import Table from "../../../components/Table";

const Wallet_management = () => {
  const walletData = [
    {
      userId: "#12345",
      name: "Sophia Clark",
      balance: "$500",
      lastTopup: "27.08.2025",
      rechargeMode: "Manual",
    },
    {
      userId: "#12345",
      name: "Sophia Clark",
      balance: "$500",
      lastTopup: "27.08.2025",
      rechargeMode: "Manual",
    },
    {
      userId: "#12345",
      name: "Sophia Clark",
      balance: "$500",
      lastTopup: "27.08.2025",
      rechargeMode: "Manual",
    },
    {
      userId: "#12345",
      name: "Sophia Clark",
      balance: "$500",
      lastTopup: "27.08.2025",
      rechargeMode: "Manual",
    },
    {
      userId: "#12345",
      name: "Sophia Clark",
      balance: "$500",
      lastTopup: "27.08.2025",
      rechargeMode: "Manual",
    },
    {
      userId: "#12345",
      name: "Sophia Clark",
      balance: "$500",
      lastTopup: "27.08.2025",
      rechargeMode: "Manual",
    },
    {
      userId: "#12345",
      name: "Sophia Clark",
      balance: "$500",
      lastTopup: "27.08.2025",
      rechargeMode: "Manual",
    },
    {
      userId: "#12345",
      name: "Sophia Clark",
      balance: "$500",
      lastTopup: "27.08.2025",
      rechargeMode: "Manual",
    },
    {
      userId: "#12345",
      name: "Sophia Clark",
      balance: "$500",
      lastTopup: "27.08.2025",
      rechargeMode: "Manual",
    },
  ];

  const walletcolumns = [
    { key: "userId", label: "User ID" },
    { key: "name", label: "Name" },
    { key: "balance", label: "Current Balance" },
    { key: "lastTopup", label: "Last Top-up" },
    { key: "rechargeMode", label: "Recharge Mode" },
  ];
  return (
    <>
      <Table
        Export_Filter={false}
        showActions={false}
        columns={walletcolumns}
        data={walletData}
        itemsPerPage={8}
      />
    </>
  );
};

export default Wallet_management;
