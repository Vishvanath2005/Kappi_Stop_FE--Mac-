import React from "react";
import { Route } from "react-router";
import User_Management from "../../pages/user_management/User_Management";
import View_User from "../../pages/user_management/View_User";

const User_Route = () => {
  return (
    <>
      <Route path="/user_management">
        <Route index element={<User_Management />} />
        <Route path="view_user_management" element={<View_User />} />
      </Route>
    </>
  );
};

export default User_Route;
