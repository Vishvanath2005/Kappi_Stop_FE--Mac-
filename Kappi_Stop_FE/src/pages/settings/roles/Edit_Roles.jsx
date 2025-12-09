import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import { IoSave } from "react-icons/io5";
import axios from "axios";
import { API } from "../../../Host";
import { useNavigate } from "react-router-dom";

const Edit_Roles = () => {
  const { handleSubmit } = useForm();
  const navigate = useNavigate();

  const settingsData = [
    "Dashboard",
    "User Management",
    "Store Management",
    "Menu Management",
    "Orders & Kitchen Management",
    "Wallet & Rewards Management",
    "Offers Management",
    "Nearby Attractions",
    "Reports",
    "Settings",
  ];

  const permissionTypes = ["All", "View", "Create", "Edit", "Delete", "Download"];

  const [checkedSettings, setCheckedSettings] = useState({});
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const permissionKeyMap = {
    Dashboard: "dashboard",
    "User Management": "user_management",
    "Store Management": "store_management",
    "Menu Management": "menu_management",
    "Orders & Kitchen Management": "order_kitchen",
    "Wallet & Rewards Management": "wallet_rewards",
    "Offers Management": "offer_management",
    "Nearby Attractions": "nearby_attractions",
    Reports: "reports",
    Settings: "settings",
  };

  // Fetch all roles on mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get(`${API}/role/getallroles`);
        setRoles(res.data.data || []);
      } catch (err) {
        console.error("Error fetching roles:", err);
      }
    };
    fetchRoles();
  }, []);

  // Fetch permissions for selected role
  const fetchRolePermissions = async (roleName) => {
    if (!roleName) return;
    try {
      const res = await axios.get(`${API}/role/getrole`, {
        params: { role_name: roleName },
      });
      const data = res.data;

      setCreatedBy(data.created_by || "Unknown");

      // Map backend permissions → frontend state
      const frontendPermissions = {};
      Object.keys(permissionKeyMap).forEach((label) => {
        const backendKey = permissionKeyMap[label];
        const perm = data.permission?.[backendKey]?.taboption || {};

        frontendPermissions[label] = {
          All: perm.all || false,
          View: perm.view || false,
          Create: perm.add || false,
          Edit: perm.edit || false,
          Delete: perm.delete || false,
          Download: perm.download || false,
        };
      });

      setCheckedSettings(frontendPermissions);
    } catch (err) {
      console.error("Error fetching role permissions:", err);
      setCheckedSettings({});
      setCreatedBy("");
    }
  };

  const handleSettingChange = (setting) => {
    setCheckedSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handlePermissionChange = (setting, perm) => {
    setCheckedSettings((prev) => {
      const current = prev[setting] || {};
      const updatedPerms = { ...current };

      if (perm === "All") {
        const newState = !current["All"];
        permissionTypes.forEach((p) => {
          updatedPerms[p] = newState;
        });
      } else {
        updatedPerms[perm] = !current[perm];
        updatedPerms["All"] = permissionTypes
          .filter((p) => p !== "All")
          .every((p) => updatedPerms[p]);
      }

      return { ...prev, [setting]: updatedPerms };
    });
  };

  const convertPermissions = () => {
    const permissions = {};
    Object.keys(permissionKeyMap).forEach((label) => {
      const backendKey = permissionKeyMap[label];
      const perm = checkedSettings[label] || {};

      permissions[backendKey] = {
        tab_access:
          perm.All || perm.View || perm.Create || perm.Edit || perm.Delete || perm.Download
            ? true
            : false,
        taboption: {
          all: perm.All || false,
          add: perm.Create || false,
          edit: perm.Edit || false,
          view: perm.View || false,
          delete: perm.Delete || false,
          download: perm.Download || false,
        },
      };
    });
    return permissions;
  };

  const onSubmit = async () => {
    const payload = {
      role_name: selectedRole,
      permission: convertPermissions(),
    };

    console.log("FINAL PAYLOAD:", payload);

    try {
      const response = await axios.put(`${API}/role/updaterolebyid/`, payload);
      console.log(response);
      alert("Role updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Error updating role");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="space-x-1">
            <span>Settings</span>
            <span>/ Roles</span>
          </p>
          <p className="text-xl font-semibold">Edit Roles</p>
        </div>
        <Button
          button_icon={<IoSave size={20} />}
          button_name="Save"
          bgColor="bg-layout-text"
          textColor="text-white"
          paddingX="px-4"
          onClick={handleSubmit(onSubmit)}
        />
      </div>

      <form className="flex flex-col lg:flex-row lg:items-center gap-6 m-4">
        <div className="flex gap-3 items-center">
          <span className="font-semibold">Role</span>
          <select
            className="w-60 px-3 py-2 drop-shadow-sm text-sm rounded-md outline-none bg-white text-black border border-gray-200 focus:ring-2 focus:ring-blue-500"
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value);
              fetchRolePermissions(e.target.value);
            }}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id || role.role_name} value={role.role_name}>
                {role.role_name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full flex gap-3 items-center">
          <span className="font-semibold">Created By</span>
          <p className="w-60 px-3 py-2 drop-shadow-sm text-sm rounded-md bg-white text-black">
            {createdBy || "N/A"}
          </p>
        </div>
      </form>

      <div className="bg-white p-7 rounded-md drop-shadow-sm">
        <div className="grid grid-cols-12">
          <div className="col-span-4 text-lg font-semibold text-center pb-3 border-r">Settings</div>
          <div className="col-span-8 text-lg font-semibold pl-10">Permissions</div>
        </div>

        {settingsData.map((setting, sIndex) => (
          <div key={sIndex} className="grid grid-cols-12 items-center">
            <div className="col-span-4 flex items-center pl-5 gap-3 py-2.5 border-r">
              <input
                type="checkbox"
                checked={!!checkedSettings[setting]}
                onChange={() => handleSettingChange(setting)}
                className="size-4 accent-layout-text cursor-pointer"
              />
              <p className="font-medium">{setting}</p>
            </div>
            <div className="col-span-8 flex justify-around gap-6 pl-10 py-2.5">
              {permissionTypes.map((perm, pIndex) => (
                <div
                  key={pIndex}
                  className={`flex gap-2 items-center transition-all duration-200 ${
                    checkedSettings[setting] ? "opacity-100" : "hidden"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checkedSettings[setting]?.[perm] || false}
                    onChange={() => handlePermissionChange(setting, perm)}
                    className="size-4 accent-layout-text cursor-pointer"
                  />
                  <p className="font-medium">{perm}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Edit_Roles;
