import React from "react";
import { FaChevronDown } from "react-icons/fa";

const ChartTitle = ({ title, count, growth,fontclass }) => {
  return (
    <div>
      {" "}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <p className="font-bold text-sm">{title}</p>
          <div className="flex justify-center items-center border border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Month"
              className="w-24 px-2 text-sm outline-none"
            />
            <p className="text-blue-800 bg-blue-200 p-1.5">
              <FaChevronDown />
            </p>
          </div>
        </div>
        <p className={`text-xl font-bold ${fontclass}`}>{count}</p>
        <p className={`text-gray-500 text-base ${fontclass}`}>
          Last 30 Days
          <span
            className={`px-2 ${
              growth.startsWith("+") ? "text-green-800" : "text-red-600"
            }`}
          >
            {growth}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ChartTitle;
