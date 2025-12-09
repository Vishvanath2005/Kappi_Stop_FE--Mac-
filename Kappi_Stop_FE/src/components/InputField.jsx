import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import MultiSelect from "./MultiSelect"; // <-- Add your multiselect file

export const InputField = ({
  label,
  name,
  register,
  errors,
  bg_color,
  width,
  text_size = "text-sm",
  gap = "gap-x-10",
  placeholder,
  type = "text",
  options = [],
  multiple = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={`grid grid-cols-12 items-center ${gap}`}>
      {/* LEFT SIDE LABEL */}
      <label className={`col-span-5 ${text_size} font-medium`}>{label}</label>

      {/* MULTISELECT TYPE */}
      {type === "multiselect" ? (
        <div className="col-span-7">
          <MultiSelect
            options={options}
            placeholder={placeholder}
            onChange={(vals) =>
              register(name).onChange({
                target: { name, value: vals },
              })
            }
            error={errors[name]?.message}
          />
        </div>
      ) : type === "select" ? (
        <select
          defaultValue=""
          {...register(name)}
          className={`col-span-7 ${bg_color} ${width} border border-input-bordergrey 
            rounded-lg outline-none py-2.5 pl-2 text-xs font-light 
            ${errors[name] ? "border-red-500" : ""}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "password" ? (
        <div className="col-span-7 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            {...register(name)}
            className={`w-full border border-input-bordergrey rounded-lg 
              outline-none py-2 px-2 pr-10 text-xs 
              ${errors[name] ? "border-red-500" : ""}`}
          />
          <span
            className="absolute right-3 top-3.5 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
          </span>
        </div>
      ) : type === "file" ? (
        <input
          type="file"
          {...register(name)}
          multiple={multiple}
          className={`col-span-7 border border-input-bordergrey rounded-lg outline-none 
            py-3 px-2 text-xs text-gray-600
            ${errors[name] ? "border-red-500" : ""}`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className={`col-span-7 border border-input-bordergrey rounded-lg outline-none 
            py-2 px-2 text-xs
            ${errors[name] ? "border-red-500" : ""}`}
        />
      )}

      {/* ERROR MESSAGE */}
      {errors[name] && (
        <p className="text-red-500 text-xs col-span-12 text-end pt-1.5">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};
