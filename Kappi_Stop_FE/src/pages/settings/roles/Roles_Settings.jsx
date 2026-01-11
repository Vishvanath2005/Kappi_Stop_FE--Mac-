import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { Plus } from "lucide-react";
import axios from "axios";
import { API } from "../../../Host";

const Roles_Settings = () => {
  const [roles, setRoles] = useState([]);

  const rolesColumns = [
    { key: "roleId", label: "Role Id" },
    { key: "role_name", label: "Roles" },
    { key: "created_by", label: "Created By" },
  ];

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${API}/role/getallroles`);
      const transformedData = res.data.data.map((item) => ({
        roleId: item.roleId,
        role_name: item.role_name,
        created_by: item.created_by,
      }));

      setRoles(transformedData);
      console.log(roles);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };
  useEffect(() => {
    fetchRoles();
  }, []);
  return (
    <>
      <Table
        setting_title="Roles"
        add_button="Add Roles"
        add_icon={<Plus size={21} />}
        columns={rolesColumns}
        data={roles}
        EditRoute="/settings/roles/edit_roles"
        AddRole={true}
        navigate_route="/settings/roles/add_roles"
      />
    </>
  );
};

export default Roles_Settings;
