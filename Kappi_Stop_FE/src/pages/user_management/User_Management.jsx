import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Add_User from "./Add_User";
import Table from "../../components/Table";
import Edit_User from "./Edit_User";
import axios from "axios";
import { API } from "../../Host";

const User_Management = () => {
  const [user, setUser] = useState([]);

  const userColumns = [
    { key: "userId", label: "User ID" },
    { key: "user_name", label: "Name" },
    { key: "phone", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "wallet_balance", label: "Wallet Balance" },
    { key: "membership_type", label: "Membership Type" },
    { key: "status", label: "Status" },
  ];

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API}/user/all`);
      const transformedData = res.data.data
      setUser(transformedData);
      console.log(user);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <Table
        title="User Management"
        // add_icon={<Plus size={18} />}
        // add_button="Add User"
        // AddModal={Add_User}
        columns={userColumns}
        data={user}
        ViewRoute="/user_management/view_user_management"
        EditModal={Edit_User}
        itemsPerPage={9}
        DeleteModal={false}
      />
    </div>
  );
};

export default User_Management;
