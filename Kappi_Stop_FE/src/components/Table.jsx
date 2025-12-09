import React, { useState, useMemo, useEffect } from "react";
import { TbFileExport } from "react-icons/tb";
import { BiFilterAlt } from "react-icons/bi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Pencil } from "lucide-react";
import { LuEye } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Table = ({
  title,
  setting_title = false,
  add_icon,
  add_button,
  category_icon,
  category_button,
  columns = [],
  data = [],
  Export_Filter = true,
  showActions = true,
  ViewRoute = false,
  EditRoute = false,
  EditModal = null,
  AddModal = null,
  AddCategoryModal = null,
  AddRole=false,
  navigate_route="",
  itemsPerPage = 9,
}) => {
  const navigate = useNavigate();

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // ⭐ Loading State
  const [loading, setLoading] = useState(true);

  // ⭐ Show loading for a short time whenever "data" updates
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [data]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key] ?? "";
      const bValue = b[sortConfig.key] ?? "";
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    if (endPage - startPage + 1 < maxPagesToShow)
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  };

  return (
    <>
      {/* Header */}
      <div className="flex sm:justify-between space-y-2 sm:items-center mb-4 flex-col sm:flex-row">
        {title && (
          <div className="text-layout-text">
            <p className="font-roboto-flex text-sm">{title}</p>
            <p className="text-2xl font-semibold font-roboto-flex">{title}</p>
          </div>
        )}

        {setting_title && (
          <div className="font-roboto-flex flex flex-col">
            <p>
              <span> Settings</span>
              <span>/ {setting_title}</span>
            </p>
            <p className="text-xl font-semibold">{setting_title}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center space-x-2">
          {AddCategoryModal && (
            <Button
              button_icon={category_icon}
              button_name={category_button}
              bgColor="bg-layout-text"
              textColor="text-white"
              paddingX="px-4"
              onClick={() => setShowAddCategory(true)}
            />
          )}

          {AddModal && (
            <Button
              button_icon={add_icon}
              button_name={add_button}
              bgColor="bg-layout-text"
              textColor="text-white"
              paddingX="px-4"
              onClick={() => setShowAdd(true)}
            />
          )}
{AddRole && (
            <Button
              button_icon={add_icon}
              button_name={add_button}
              bgColor="bg-layout-text"
              textColor="text-white"
              paddingX="px-4"
              onClick={() => navigate(navigate_route)}
            />
          )}
          {Export_Filter && (
            <>
              <Button
                button_icon={<TbFileExport size={22} />}
                button_name="Export"
                bgColor="bg-white"
                textColor="text-layout-text"
                paddingX="px-4"
              />
              <Button
                button_icon={<BiFilterAlt size={22} />}
                button_name="Filter"
                bgColor="bg-white"
                textColor="text-layout-text"
                paddingX="px-4"
              />
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto no-scrollbar h-fit">
        <table className="w-full whitespace-nowrap border-collapse">
          <thead>
            <tr className="font-semibold text-sm bg-white border-b-4 border-background h-14 drop-shadow-sm">
              <th className="p-3.5 rounded-l-lg">S.no</th>

              {columns.map((col, index) => {
                const isLast = index === columns.length - 1;
                const addRightRadius = isLast && !showActions;

                return (
                  <th
                    key={col.key}
                    className={`p-3.5 cursor-pointer ${
                      addRightRadius ? "rounded-r-lg" : ""
                    }`}
                    onClick={() => handleSort(col.key)}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {col.label}
                      <HiArrowsUpDown
                        size={18}
                        className={`transition-transform ${
                          sortConfig.key === col.key &&
                          sortConfig.direction === "asc"
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>
                  </th>
                );
              })}

              {showActions && (
                <th className="pr-2 text-center rounded-r-lg">Action</th>
              )}
            </tr>
          </thead>

          {/* ⭐ TABLE BODY WITH LOADING */}
          <tbody className="bg-white text-sm font-light drop-shadow-sm">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (showActions ? 2 : 1)}
                  className="py-10"
                >
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-layout-text"></div>
                  </div>
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr
                  key={index}
                  className="border-b-[3px] text-gray-500 border-background text-center"
                >
                  <td className="p-3.5 rounded-l-lg">
                    {indexOfFirstItem + index + 1}
                  </td>

                  {columns.map((col, ci) => {
                    const value = item[col.key] ?? "-";
                    const isStatus = col.key.toLowerCase() === "status";

                    return (
                      <td key={ci} className="p-3.5">
                        {isStatus ? (
                          <span
                            className={
                              value === "Active" ||
                              value === "Available" ||
                              value === "Completed"
                                ? "text-green-600 font-bold"
                                : "text-red-600 font-bold"
                            }
                          >
                            {value}
                          </span>
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}

                  {showActions && (
                    <td className="p-2 rounded-r-lg">
                      <div className="flex items-center justify-center gap-2">
                        {(EditModal || EditRoute) && (
                          <button
                            onClick={() => {
                              setSelectedItem(item);
                              if (EditModal) setShowEdit(true);
                              else if (EditRoute)
                                navigate(EditRoute, { state: { item } });
                            }}
                            className="cursor-pointer bg-[#C9E0FF] p-1.5 rounded"
                          >
                            <Pencil size={14} className="text-blue-500" />
                          </button>
                        )}

                        {ViewRoute && (
                          <button
                            onClick={() =>
                              navigate(ViewRoute, { state: { item } })
                            }
                            className="cursor-pointer bg-[#BAFFBA] p-1.5 rounded"
                          >
                            <LuEye size={14} className="text-green-700" />
                          </button>
                        )}

                        <button className="cursor-pointer bg-red-100 p-1.5 rounded">
                          <RiDeleteBinLine size={16} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="text-center py-6"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center px-3 mt-3">
        <div className="text-sm text-black">
          Showing results for {currentPage} out of {totalPages}
        </div>

        <div className="flex items-center gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(1)}
            className={currentPage === 1 ? "opacity-50" : ""}
          >
            <GoArrowLeft />
          </button>

          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className={currentPage === 1 ? "opacity-50" : ""}
          >
            Previous
          </button>

          <div className="flex items-center gap-3">
            {generatePageNumbers().map((page, i) => (
              <button
                key={i}
                onClick={() => paginate(page)}
                className={`px-2.5 py-1 text-sm rounded-md ${
                  currentPage === page
                    ? "bg-layout-text text-white"
                    : "text-layout-text"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className={currentPage === totalPages ? "opacity-50" : ""}
          >
            Next
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(totalPages)}
            className={currentPage === totalPages ? "opacity-50" : ""}
          >
            <GoArrowRight />
          </button>
        </div>
      </div>

      {/* Modals */}
      {EditModal && showEdit && (
        <EditModal onClose={() => setShowEdit(false)} item={selectedItem} />
      )}
      {AddModal && showAdd && (
        <AddModal onClose={() => setShowAdd(false)} />
      )}
      {AddCategoryModal && showAddCategory && (
        <AddCategoryModal onClose={() => setShowAddCategory(false)} />
      )}
    </>
  );
};

export default Table;
