import React from "react";
import Auth_Screens from "../../components/auth_component/Auth_Screens";
import Auth_Inputs from "../../components/auth_component/Auth_Inputs";
import { useNavigate } from "react-router";

const Reset_Password = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Auth_Screens
        auth_title="Reset Password"
        auth_body={
          <>
            <Auth_Inputs
              label="New Password"
              type="password"
              placeholder="Enter new Password"
            />
            <Auth_Inputs
              label="Confirm Password"
              type="password"
              placeholder="Enter confirm Password"
            />
            <button
              onClick={() => {
                navigate(`/`);
              }}
              className="cursor-pointer text-white bg-layout-text text-center w-full py-2 my-3 rounded-md text-lg font-semibold transition duration-200"
            >
              Change Password
            </button>
          </>
        }
      />
    </div>
  );
};

export default Reset_Password;
