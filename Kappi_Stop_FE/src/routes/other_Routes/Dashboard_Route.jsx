import React from "react";
import { Route } from "react-router";
import Dashboard from "../../pages/dashboard/Dashboard";
import Profile from "../../pages/dashboard/profile/Profile";

const Dashboard_Route = () => {
  return (
    <>
     <Route path="/dashboard" >
      <Route index element={<Dashboard />}/>
      <Route path="profile" element={<Profile />}/>
     </Route>
    </>
  );
};

export default Dashboard_Route;
