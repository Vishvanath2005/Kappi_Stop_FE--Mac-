import React, { Children } from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ Children, onClose, title }) => {
  return (
    <div>
      <div className="font-layout-font fixed inset-0 flex justify-center items-center backdrop-blur-sm z-10">
        <div className="dark:bg-layout-dark bg-white rounded-lg drop-shadow-md  w-fit h-fit p-6">
          <p
            className="absolute -top-4 -right-4 cursor-pointer bg-white shadow-sm py-2 px-2 rounded-full"
            onClick={onClose}
          >
            <IoClose className="size-6" />
          </p>
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold">{title}</h2>
          </div>
          {Children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
