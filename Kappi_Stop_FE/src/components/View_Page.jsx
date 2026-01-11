import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../Host"; 
import { TiArrowBack } from "react-icons/ti";

const View_Page = ({
  icon_name,
  status_name,
  title,
  button_color,
  button_text_color,
  columns = [],
  data = {},
  StatusModal,
}) => {
  const navigate = useNavigate();
  const [newStatus, setNewStatus] = useState(null);

  const getStatusColor = (value) => {
    const status = String(value || "");
    if (["Active", "Complete", "Available"].includes(status))
      return "text-green-500";
    if (["Inactive", "Blocked", "Unavailable"].includes(status))
      return "text-red-500";
    return "text-gray-500";
  };

  const handleStatusClick = async () => {
    if (data.status === "Active") {
      setNewStatus("Inactive");
      return;
    }

    try {
      const payload = {
        ...data,
        status: "Active",
      };

      await axios.put(`${API}/store/updatestore/${data.storeId}`, payload);

      toast.success("Store enabled successfully ");
      navigate(-1); 
    } catch (error) {
      toast.error("Failed to enable store ");
      console.error("Enable store error:", error);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div className="flex sm:justify-between space-y-2 mb-2 sm:items-center flex-col sm:flex-row">
        <div className="text-layout-text">
          <p className="font-roboto-flex text-sm flex">
            <span className="pr-1">{title}</span>
            <span>/ View {title}</span>
          </p>
          <p className="text-2xl font-semibold font-roboto-flex">{title}</p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            button_icon={icon_name}
            button_name={status_name}
            bgColor={button_color}
            textColor={button_text_color}
            paddingX="px-4"
            onClick={handleStatusClick}
          />
        </div>
      </div>

      <div className="bg-white w-full rounded-lg">
        <p className="text-center py-3 text-black text-2xl font-bold">
          {title}
        </p>

        <div className="grid grid-cols-7 p-4 gap-y-1 text-sm">
          {columns.map((col, index) => {
            const value = data?.[col.key] ?? "—";
            const isStatus = col.label === "Status";
            const textColor = isStatus ? getStatusColor(value) : "text-gray-500";

            return (
              <React.Fragment key={index}>
                <p className="col-span-2 text-layout-text font-semibold">
                  {col.label}
                </p>
                <p className={`col-span-5 ${textColor}`}>{value}</p>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-2 right-0">
        <Button
          button_icon={<TiArrowBack size={22} />}
          button_name="Back"
          bgColor="bg-layout-text"
          textColor="text-white"
          paddingX="px-4"
          onClick={() => navigate(-1)}
        />
      </div>

      {/* OPEN DISABLE MODAL ONLY WHEN ACTIVE */}
      {newStatus && StatusModal && (
        <StatusModal
          onClose={() => setNewStatus(null)}
          item={data}
          newStatus={newStatus}
        />
      )}
    </div>
  );
};

export default View_Page;
