import React from "react";
import { Route } from "react-router";
import Login from "../../pages/auth/Login";
import Forgot_Password from "../../pages/auth/Forgot_Password";
import Reset_Password from "../../pages/auth/Reset_Password";

const Auth_Route = () => {
  return (
    <>
      <Route path="/" element={<Login />} />
      <Route path="/forgot_password" element={<Forgot_Password />} />
      <Route path="/reset_password" element={<Reset_Password />} />
    </>
  );
};

export default Auth_Route;
