import React from "react";

const Button = ({
  onClick,
  button_icon,
  button_name,
  bgColor,
  textColor,
  paddingX,
  paddingY,
}) => {
  const bgClass = bgColor ? `${bgColor}` : "bg-dark-brown";
  const textClass = textColor ? `${textColor}` : "text-white";
  const paddingXClass = paddingX ? `${paddingX}` : "px-3";
  const paddingYClass = paddingY ? `${paddingY}` : "py-3";
  return (
    <div>
      <button
        onClick={onClick}
        className={` cursor-pointer  w-fit  text-sm flex items-center drop-shadow-sm rounded-lg  gap-2 
      ${bgClass} ${textClass} ${paddingXClass} ${paddingYClass} `}
      >
        {button_icon}
        {button_name}
      </button>
    </div>
  );
};

export default Button;
