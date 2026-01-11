import React from "react";
import { MdOutlineBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { useLocation } from "react-router";
import View_Page from "../../components/View_Page";
import Block_User from "./Block_User";

const View_User = () => {
  const { state } = useLocation();
  const user = state?.item || {};

  const userColumns = [
    { key: "userId", label: "User ID" },
    { key: "user_name", label: "Name" },
    { key: "phone", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "wallet_balance", label: "Wallet Balance" },
    { key: "membership_type", label: "Membership Type" },
    { key: "status", label: "Status" },
  ];

  return (
    <View_Page
      title="User Management"
      status_name={user?.status === "Active" ? "Blocked" : "Active"}
      icon_name={
        user.status === "Active" ? (
          <MdOutlineBlock size={22} />
        ) : (
          <CgUnblock size={22} />
        )
      }
      button_color={`${
        user.status === "Active" ? "bg-layout-text" : "bg-white"
      }`}
      button_text_color={`${
        user.status === "Active" ? "text-white" : "text-layout-text"
      }`}
      columns={userColumns}
      data={user}
      StatusModal={Block_User}
    />
  );
};

export default View_User;
