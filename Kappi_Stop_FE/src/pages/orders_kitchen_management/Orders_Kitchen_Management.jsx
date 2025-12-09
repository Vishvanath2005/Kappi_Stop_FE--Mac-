import React, { useState } from "react";
import { TbFileExport } from "react-icons/tb";
import { BiFilterAlt } from "react-icons/bi";
import Title from "../../components/graph/Title";
import Button from "../../components/Button";
import Orders_Table from "./table/Orders_Table";
import Summary from "./summary/Summary";

const Orders_Kitchen_Management = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const tabs = [
    { id: "summary", label: "Summary" },
    { id: "table", label: "Table" },
  ];
  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <Title
          title="Orders & Kitchen Management"
          page_title="Orders & Kitchen Management"
        />

        <div className="flex flex-wrap items-center gap-2 md:gap-3 mr-0 md:mr-4">
          <Button
            button_icon={<TbFileExport size={22} />}
            button_name="Export"
            bgColor="bg-white"
            textColor="text-darkest-blue"
            paddingY="py-3"
            paddingX="px-3"
          />
          <Button
            button_icon={<BiFilterAlt size={22} />}
            button_name="Filter"
            bgColor="bg-white"
            textColor="text-darkest-blue"
            paddingY="py-3"
            paddingX="px-3"
          />
        </div>
      </div>
      <div className="flex justify-between my-4">
        <div className="flex gap-2  ">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-3 px-4 rounded-md text-sm font-medium ${
                activeTab === tab.id
                  ? " text-white bg-layout-text font-light   font-roboto-flex"
                  : "text-black bg-background drop-shadow-sm   font-light font-roboto-flex"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {activeTab === "summary" && (
        <>
          <Summary />
        </>
      )}
      {activeTab === "table" && (
        <>
          <Orders_Table />
        </>
      )}
    </div>
  );
};

export default Orders_Kitchen_Management;
