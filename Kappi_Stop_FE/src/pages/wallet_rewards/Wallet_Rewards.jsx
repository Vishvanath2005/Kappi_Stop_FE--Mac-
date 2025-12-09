import React, { useState } from "react";
import { Wallet } from "lucide-react";
import { TbFileExport } from "react-icons/tb";
import { BiFilterAlt } from "react-icons/bi";
import Title from "../../components/graph/Title";
import Button from "../../components/Button";
import Wallet_management from "./wallet_management/Wallet_management";
import Scratch_Management from "./scratch_management/Scratch_Management";
const Wallet_Rewards = () => {
  const [activeTab, setActiveTab] = useState("wallet_management");
  const tabs = [
    { id: "wallet_management", label: "Wallet Management" },
    { id: "scratch_management", label: "ScratchCard Management" },
  ];
  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <Title title="Wallet & Rewards" page_title="Wallet and Rewards" />

        <div className="flex flex-wrap items-center gap-2 md:gap-3 mr-0 md:mr-4">
          <Button
            button_icon={<Wallet size={22} />}
            button_name="Add money"
            bgColor="bg-layout-text"
            textColor="text-white"
            paddingY="py-3 "
            paddingX="px-3"
          />
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
      <div className="flex justify-between my-2 ">
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
      {activeTab === "wallet_management" && (
        <>
          <Wallet_management />
        </>
      )}
      {activeTab === "scratch_management" && (
        <>
          <Scratch_Management />
        </>
      )}
    </div>
  );
};

export default Wallet_Rewards;
