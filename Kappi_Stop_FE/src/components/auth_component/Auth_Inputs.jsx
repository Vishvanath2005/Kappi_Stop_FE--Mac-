import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Auth_Inputs = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  return (
    <div>
      <label className={`grid mb-4 text-layout-text font-semibold`}>
        {label}
        <div className="relative">
          <input
            type={isPassword && showPassword ? "text" : type}
            className="border-2 border-input-bordergrey outline-none rounded-md py-2 px-2 my-1 w-full pr-10"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          {isPassword && (
            <span
              className="absolute right-3 top-4.5 outline-none cursor-pointer dark:text-gray-400 text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          )}
        </div>
      </label>
    </div>
  );
};

export default Auth_Inputs;
