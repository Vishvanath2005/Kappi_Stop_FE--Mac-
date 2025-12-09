import React from "react";
import Auth_Screens from "../../components/auth_component/Auth_Screens";
import Auth_Inputs from "../../components/auth_component/Auth_Inputs";
import { useNavigate } from "react-router";

const Forgot_Password = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Auth_Screens
        auth_title="Forgot Password?"
        auth_body={
          <>
            <Auth_Inputs
              label="Email ID"
              type="email"
              placeholder="Enter email or phone number"
            />
            <button
              type="submit"
               onClick={() => {
                navigate(`/reset_password`);
              }}
              className="cursor-pointer text-white bg-layout-text text-center w-full py-2 my-3 rounded-md text-lg font-semibold transition duration-200"
            >
              Send Email
            </button>
            <p
              onClick={() => {
                navigate(`/`);
              }}
              className="text-sm cursor-pointer font-roboto-flex text-layout-text flex justify-center"
            >
              Back to login
            </p>
          </>
        }
      />
    </div>
  );
};

export default Forgot_Password;
