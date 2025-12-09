import React from "react";
import Navbar from "./Navbar";
import { NavLink, Outlet, useLocation } from "react-router";
import { RiDashboardLine, RiUserAddLine } from "react-icons/ri";
import { TbBuildingStore, TbReportAnalytics } from "react-icons/tb";
import { FaRegRectangleList } from "react-icons/fa6";
import { Plus, Settings, Wallet } from "lucide-react";
import { FaStackOverflow } from "react-icons/fa";
import { GrGroup, GrRestaurant } from "react-icons/gr";
import { File, Clipboard, DollarSign } from "lucide-react";

const Layouts = () => {
  const location = useLocation();

  const Menus = [
    {
      title: "Dashboard",
      icon: <RiDashboardLine size={27} />,
      to: "/dashboard",
    },
    {
      title: "User Management",
      icon: (
        <div className="relative w-6 h-6">
          <File className="absolute w-6 h-6" />
          <Plus className="absolute left-1.5 top-2 w-3 h-3" />
        </div>
      ),
      to: "/user_management",
    },
    {
      title: "Store Management",
      icon: <TbBuildingStore size={27} />,
      to: "/store",
    },
    {
      title: "Menu Management",
      icon: <FaRegRectangleList size={27} />,
      to: "/menu",
    },
    {
      title: "Orders & Kitchen",
      icon: <GrRestaurant size={27} />,
      to: "/orders",
    },
    {
      title: "Wallet & Rewards",
      icon: <Wallet size={27} />,
      to: "/wallet_rewards",
    },
    {
      title: "Offers Management",
      icon: (
        <div className="relative w-6 h-6">
          <Clipboard className="absolute" />
          <DollarSign className="absolute left-1.5 top-2 w-3 h-3" />
        </div>
      ),
      to: "/offers",
    },
    {
      title: "Nearby Attractions",
      icon: <FaStackOverflow size={27} />,
      to: "/nearby",
    },
    {
      title: "Reports",
      icon: <TbReportAnalytics size={27} />,
      to: "/report",
    },
    {
      title: "Settings",
      icon: <Settings size={27} />,
      to: "/settings/user",
      nested: [
        {
          title: "Members",
          icon: <RiUserAddLine size={23} />,
          to: "/settings/user",
        },
        {
          title: "Roles",
          icon: <GrGroup size={23} />,
          to: "/settings/roles",
        },
      ],
    },
  ];

  const isMenuActive = (menu) => {
    if (location.pathname.startsWith(menu.to)) return true;
    if (menu.nested) {
      return menu.nested.some((item) => location.pathname.startsWith(item.to));
    }
    return false;
  };

  const activeNestedMenu = Menus.find((menu) =>
    menu.nested?.some((item) => location.pathname.startsWith(item.to))
  );

  return (
    <div className="font-roboto-flex w-full h-screen">
      <Navbar />
      <div className="flex  bg-background h-11/12">
        <div className=" pb-2  px-6 pt-2 bg-background overflow-auto no-scrollbar drop-shadow-sm">
          <ul className="flex flex-col items-center justify-center">
            {Menus.map((menu, index) => (
              <NavLink key={index} to={menu.to}>
                <li
                  className={`w-[100px] mb-3 h-20 text-sm font-light flex flex-col justify-center items-center text-center rounded-xl transition-all duration-300 ${
                    isMenuActive(menu)
                      ? "text-white bg-layout-text"
                      : "text-layout-text border border-sidebar-outine hover:bg-layout-text hover:opacity-90 hover:text-white"
                  }`}
                >
                  <span>{menu.icon}</span>
                  <p>{menu.title}</p>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>

        {activeNestedMenu && (
          <div className="w-60 bg-white shadow-md px-3 py-6">
            <h2 className="text-lg font-semibold mb-4 text-layout-text">
              {activeNestedMenu.title}
            </h2>
            <ul>
              {activeNestedMenu.nested.map((item, idx) => (
                <li key={idx} className="mb-2">
                  <NavLink to={item.to}>
                    <div
                      className={`flex items-center gap-2 p-4 rounded-md cursor-pointer transition-all duration-200 ${
                        location.pathname.startsWith(item.to)
                          ? "bg-background text-layout-text font-medium drop-shadow-sm"
                          : "text-dark-brown hover:bg-gray-100"
                      }`}
                    >
                      <span>{item.icon}</span>
                      <p>{item.title}</p>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="w-full p-5 bg-background overflow-auto no-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layouts;
