import React from "react";
import { Routes, Route } from "react-router-dom";
import User_Settings from "../../pages/settings/user/User_Settings";
import Edit_User_Settings from "../../pages/settings/user/Edit_User_Settings";
import Roles_Settings from "../../pages/settings/roles/Roles_Settings";
import Edit_Roles from "../../pages/settings/roles/Edit_Roles";
import Add_Roles from "../../pages/settings/roles/Add_Roles";

const Settings_Route = () => {
  return (
    <>
      <Route path="/settings">
        <Route path="user">
          <Route index element={<User_Settings />} />
          <Route path="edit_user_setting" element={<Edit_User_Settings />} />
        </Route>
        <Route path="roles">
          <Route index element={<Roles_Settings />} />
          <Route path="edit_roles" element={<Edit_Roles />} />
          <Route path="add_roles" element={<Add_Roles />} />
        </Route>
      </Route>
    </>
  );
};

export default Settings_Route;
