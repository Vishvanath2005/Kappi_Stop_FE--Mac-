import React from "react";
import { Plus } from "lucide-react";
import Table from "../../components/Table";
import Add_User from "./Add_User";
import Edit_User from "./Edit_User";

const User_Management = () => {
  const userColumns = [
    { key: "userId", label: "User ID" },
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "wallet_balance", label: "Wallet Balance" },
    { key: "membership_type", label: "Membership Type" },
    { key: "status", label: "Status" },
  ];

  const userData = [
    {
      userId: "#5689336",
      name: "Aarnav",
      phone: "00000 00000",
      email: "sophia.clark@email.com",
      wallet_balance: "$500",
      membership_type: "Premium",
      status: "Active",
    },
    {
      userId: "#5689337",
      name: "Sophia",
      phone: "99999 88888",
      email: "sophia@email.com",
      wallet_balance: "$650",
      membership_type: "Premium",
      status: "Blocked",
    },
    {
      userId: "#5689336",
      name: "Aarnav",
      phone: "00000 00000",
      email: "sophia.clark@email.com",
      wallet_balance: "$500",
      membership_type: "Premium",
      status: "Active",
    },
    {
      userId: "#5689340",
      name: "Liam",
      phone: "90000 55555",
      email: "liam.patel@email.com",
      wallet_balance: "$500",
      membership_type: "Premium",
      status: "Active",
    },
    {
      userId: "#5689338",
      name: "Ethan",
      phone: "98765 43210",
      email: "ethan.jones@email.com",
      wallet_balance: "$300",
      membership_type: "Basic",
      status: "Blocked",
    },
    {
      userId: "#5689336",
      name: "Aarnav",
      phone: "00000 00000",
      email: "sophia.clark@email.com",
      wallet_balance: "$500",
      membership_type: "Premium",
      status: "Active",
    },
    {
      userId: "#5689340",
      name: "Liam",
      phone: "90000 55555",
      email: "liam.patel@email.com",
      wallet_balance: "$500",
      membership_type: "Premium",
      status: "Active",
    },
    {
      userId: "#5689339",
      name: "Olivia",
      phone: "98700 11111",
      email: "olivia.ross@email.com",
      wallet_balance: "$700",
      membership_type: "Premium",
      status: "Active",
    },
    {
      userId: "#5689336",
      name: "Aarnav",
      phone: "00000 00000",
      email: "sophia.clark@email.com",
      wallet_balance: "$500",
      membership_type: "Premium",
      status: "Active",
    },
    {
      userId: "#5689340",
      name: "Liam",
      phone: "90000 55555",
      email: "liam.patel@email.com",
      wallet_balance: "$500",
      membership_type: "Premium",
      status: "Active",
    },
  ];

  return (
    <div>
      <Table
        title="User Management"
        add_icon={<Plus size={18} />}
        add_button="Add User"
        columns={userColumns}
        data={userData}
        ViewRoute="/user_management/view_user_management"
        EditModal={Edit_User}
        AddModal={Add_User}
        itemsPerPage={9}
      />
    </div>
  );
};

export default User_Management;
