import React from "react";
import { Clock } from "lucide-react";

const Summary = () => {
  const orders = [
    { id: "#12354", status: "placed", time: "11:00 AM" },
    { id: "#12353", status: "completed", time: "10:55 AM" },
    { id: "#12352", status: "in progress", time: "10:50 AM" },
    { id: "#12351", status: "placed", time: "10:45 AM" },
    { id: "#12350", status: "completed", time: "10:40 AM" },
  ];

  const summary = [
    { label: "Total Orders", value: 100 },
    { label: "Pending", value: 25 },
    { label: "Total Revenue", value: "$2,500" },
    { label: "In Progress", value: 35 },
    { label: "Completed", value: 40 },
  ];

  return (
    <div className=" ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative border-gray-300  space-y-4">
          <h2 className="font-semibold text-lg ">
            Real-Time Order Feed
          </h2>
          <div className=" bg-white drop-shadow-sm rounded-md p-4 space-y-3">
            {orders.map((order, index) => (
              <div key={index} className="relative  flex items-start gap-3">
                {index !== orders.length - 1 && (
                  <span className="absolute left-3 top-6 h-full w-px bg-gray-300"></span>
                )}
                <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full z-10">
                  {order.completed ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Order {order.id}{" "}
                    <span
                      className={`${
                        order.status === "completed"
                          ? "text-green-600"
                          : order.status === "in progress"
                          ? "text-yellow-600"
                          : "text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">{order.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" bg-light-yellow rounded-sm  ">
          <h2 className="font-semibold text-lg mb-4">Live Order Summary</h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
            {summary.map((item, idx) => (
              <div key={idx} className="bg-white drop-shadow-sm rounded-lg  p-6">
                <p className="text-sm font-medium text-gray-700">
                  {item.label}
                </p>
                <p className="text-lg font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
