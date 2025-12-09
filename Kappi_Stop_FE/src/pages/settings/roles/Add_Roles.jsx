import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import { IoSave } from "react-icons/io5";
import axios from "axios";
import { API } from "../../../Host";
import { useNavigate } from "react-router-dom";

const Add_Roles = () => {
  const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const [role_name, setRoleName] = useState("");
  const myrole = localStorage.getItem("role");

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

  const permissionTypes = [
    "All",
    "View",
    "Create",
    "Edit",
    "Delete",
    "Download",
  ];

  const [checkedSettings, setCheckedSettings] = useState({});

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

  // Toggle main setting checkbox
  const handleSettingChange = (setting) => {
    setCheckedSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  // Toggle individual permissions
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

  // Convert frontend permissions to backend schema
  const convertPermissions = () => {
    const permissions = {};
    Object.keys(permissionKeyMap).forEach((label) => {
      const backendKey = permissionKeyMap[label];
      const perm = checkedSettings[label] || {};

      permissions[backendKey] = {
        tab_access:
          perm.All ||
          perm.View ||
          perm.Create ||
          perm.Edit ||
          perm.Delete ||
          perm.Download
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

  // Submit form
  const onSubmit = async () => {
    if (!role_name) {
      alert("Please enter a role name.");
      return;
    }

    const payload = {
      role_name: role_name,
      created_by:myrole,
      permission: convertPermissions(),
    };

    console.log("FINAL PAYLOAD:", payload);

    try {
      const response = await axios.post(`${API}/role/createrole`, payload);
      console.log(response);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <p className="space-x-1">
            <span>Settings</span> / <span>Roles</span>
          </p>
          <p className="text-xl font-semibold">Add Roles</p>
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

      {/* Role Input */}
      <form className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
        <div className="flex gap-3 items-center w-full">
          <span className="font-semibold">Role</span>
          <input
            type="text"
            value={role_name}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Enter role name"
            className="w-60 px-3 py-2 drop-shadow-sm text-sm rounded-md outline-none bg-white text-black"
          />
        </div>
      </form>

      {/* Permissions Table */}
      <div className="bg-white p-7 rounded-md drop-shadow-sm">
        <div className="grid grid-cols-12">
          <div className="col-span-4 text-lg font-semibold text-center pb-3 border-r">
            Settings
          </div>
          <div className="col-span-8 text-lg font-semibold pl-10">
            Permissions
          </div>
        </div>

        {settingsData.map((setting, index) => (
          <div key={index} className="grid grid-cols-12 items-center">
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

export default Add_Roles;
