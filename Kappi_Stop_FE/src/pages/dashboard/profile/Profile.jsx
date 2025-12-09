import React, { useState } from "react";
import Pic from "../../../assets/images/block_pic.png";
import Table_profile from "./Table_profile";
import Edit_profile from "./Edit_profile";
import Update_Password from "./Update_Password";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("table");

  const user = {
    name: "Sophia Clark",
    role: "Admin / User",
    email: "sophia.clark@email.com",
  };

  const headings = [
    { key: "date", label: "Date" },
    { key: "time", label: "Time" },
    { key: "activity", label: "Activity" },
    { key: "device", label: "Device" },
  ];
  const activities = [
    {
      date: "29.08.2025",
      time: "11:23 am",
      activity: "User logged in",
      device: "Desktop",
    },
    {
      date: "29.08.2025",
      time: "12:10 pm",
      activity: "Password updated",
      device: "Mobile",
    },
    {
      date: "30.08.2025",
      time: "09:15 am",
      activity: "User logged out",
      device: "Desktop",
    },
    {
      date: "30.08.2025",
      time: "10:45 am",
      activity: "User logged in",
      device: "Tablet",
    },
    {
      date: "30.08.2025",
      time: "02:18 pm",
      activity: "Profile updated",
      device: "Desktop",
    },
    {
      date: "31.08.2025",
      time: "08:05 am",
      activity: "User logged in",
      device: "Mobile",
    },
    {
      date: "31.08.2025",
      time: "08:30 am",
      activity: "Email changed",
      device: "Mobile",
    },
    {
      date: "31.08.2025",
      time: "01:12 pm",
      activity: "User logged out",
      device: "Tablet",
    },
    {
      date: "01.09.2025",
      time: "07:45 am",
      activity: "User logged in",
      device: "Desktop",
    },
    {
      date: "01.09.2025",
      time: "09:20 am",
      activity: "Password updated",
      device: "Desktop",
    },
  ];

  return (
    <div className="p-6 bg-white  mr-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-gray-600 text-sm">
            Manage your personal details and account settings.
          </p>
        </div>
        {activeTab === "table" && (
          <button
            className="bg-layout-text text-white text-sm font-semibold px-6 py-4 rounded-md"
            onClick={() => {
              setActiveTab("edit_profile");
            }}
          >
            Edit Profile
          </button>
        )}
        {activeTab === "update_password" && (
          <div className="flex  gap-2">
            <button
              className=" bg-[#FCFAF7] text-black text-sm drop-shadow-md font-bold px-6 py-2 rounded-md"
              onClick={() => {
                setActiveTab("table");
              }}
            >
              Cancel
            </button>
            <button className=" bg-layout-text text-white text-sm font-bold px-6 py-2 rounded-md">
              Save Password
            </button>
          </div>
        )}
        {activeTab === "edit_profile" && (
          <div className="flex  gap-2">
            <button
              className=" bg-[#F5F0E5] text-black text-sm  font-bold px-6 py-4 cursor-pointer rounded-md"
              onClick={() => {
                setActiveTab("table");
              }}
            >
              Cancel
            </button>
            <button className=" bg-layout-text text-white cursor-pointer text-sm font-bold px-6 py-4 rounded-md">
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className={`grid gap-3 grid-cols-3 lg:grid-cols-3`}>
        <div className=" p-6 bg-[#FCFAF7] drop-shadow-sm h-fit rounded-xl col-span-1 flex flex-col items-center lg:items-start">
          <img
            src={Pic}
            alt="avatar"
            className="w-56 h-56 rounded-full object-cover  mb-4"
          />
          <div className="flex justify-between w-full">
            <div className="">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-600 text-sm">{user.role}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
            <button
              className="text-sm bg-layout-text text-white h-fit mt-8 rounded-xl px-4 p-2 flex cursor-pointer justify-items-end "
              onClick={() => {
                setActiveTab("update_password");
              }}
            >
              Update Password
            </button>
          </div>
        </div>
        {activeTab === "table" && (
          <div className="col-span-2 h-90 overflow-scroll drop-shadow-sm no-scrollbar">
          <Table_profile headings={headings} data={activities} /></div>
        )}{" "}
        {activeTab === "update_password" && (
            <Update_Password />
        )}{" "}
        {activeTab === "edit_profile" && (
            <Edit_profile />
        )}
      </div>
    </div>
  );
};

export default Profile;
