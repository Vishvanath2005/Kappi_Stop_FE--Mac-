import React from "react";
import Logo from "../../assets/images/Logo.png";
const Auth_Screens = ({ auth_title, auth_body }) => {
  return (
    <div className="bg-background w-full h-screen flex justify-center items-center z-0">
      <div className="w-1/3 h-fit bg-white rounded-2xl shadow-2xl z-10 p-10">
        <div className="flex justify-between items-center mb-4">
          <img src={Logo} alt="Product_Logo" className="w-32 -ml-5" />
          <p className="text-3xl font-bold text-layout-text font-roboto-flex">
            {auth_title}
          </p>
        </div>
        {auth_body}
      </div>
    </div>
  );
};

export default Auth_Screens;
