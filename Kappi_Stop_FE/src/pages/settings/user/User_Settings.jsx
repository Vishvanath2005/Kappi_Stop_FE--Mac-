import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { Plus } from "lucide-react";
import Add_User_Settings from "./Add_User_Settings";
import axios from "axios";
import { API } from "../../../Host";

const User_Settings = () => {
  const [member, setmember] = useState([]);

  const usersettingColumns = [
    { key: "name", label: "Name" },
    { key: "role", label: "Roles" },
    { key: "phone", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status" },
    { key: "created_by", label: "Created By" },
  ];



  const fetchMember = async () => {
    try {
      const res = await axios.get(`${API}/member/getallmembers`);
      console.log(res);
      
      const transformedData = res.data.data.map((item) => ({
        name:item.member_name,
        role: item.role,
        phone: item.phone,
        email: item.email,
        status: item.status,
        created_by: item.created_by,
      
      }));
      setmember(transformedData);
      console.log(member);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };
  useEffect(() => {
    fetchMember();
  }, []);

  return (
    <>
      <Table
        setting_title="Member"
        add_button="Add Member"
        add_icon={<Plus size={18} />}
        columns={usersettingColumns}
        data={member}
        AddModal={Add_User_Settings}
        EditRoute="/settings/user/edit_user_setting"
      />
    </>
  );
};

export default User_Settings;
