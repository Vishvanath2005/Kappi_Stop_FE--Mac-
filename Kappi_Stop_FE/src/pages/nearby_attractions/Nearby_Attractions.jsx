import React from "react";
import Table from "../../components/Table";
import Add_Attraction from "./Add_Attraction";
import { FaStackOverflow } from "react-icons/fa";

const Nearby_Attractions = () => {
  const nearbyColumns = [
    { key: "attraction_Id", label: "Attraction ID" },
    { key: "title", label: "Title" },
    { key: "city", label: "City/Location" },
    { key: "linked_Store", label: "Linked Store" },
    { key: "added_On", label: "Added On" },
    { key: "status", label: "Status" },
  ];

  const nearbyData = [
    {
      attraction_Id: "#12345",
      title: "Central Park",
      city: "New York",
      linked_Store: "Store A",
      added_On: "28.08.2025",
      status: "Active",
    },{
      attraction_Id: "#12345",
      title: "Central Park",
      city: "New York",
      linked_Store: "Store A",
      added_On: "28.08.2025",
      status: "Inative",
    },{
      attraction_Id: "#12345",
      title: "Central Park",
      city: "New York",
      linked_Store: "Store A",
      added_On: "28.08.2025",
      status: "Inative",
    },{
      attraction_Id: "#12345",
      title: "Central Park",
      city: "New York",
      linked_Store: "Store A",
      added_On: "28.08.2025",
      status: "Inative",
    },{
      attraction_Id: "#12345",
      title: "Central Park",
      city: "New York",
      linked_Store: "Store A",
      added_On: "28.08.2025",
      status: "Inative",
    },{
      attraction_Id: "#12345",
      title: "Central Park",
      city: "New York",
      linked_Store: "Store A",
      added_On: "28.08.2025",
      status: "Active",
    },{
      attraction_Id: "#12345",
      title: "Central Park",
      city: "New York",
      linked_Store: "Store A",
      added_On: "28.08.2025",
      status: "Active",
    },{
      attraction_Id: "#12345",
      title: "Central Park",
      city: "New York",
      linked_Store: "Store A",
      added_On: "28.08.2025",
      status: "Active",
    },{
      attraction_Id: "#12345",
      title: "Central Park",
      city: "New York",
      linked_Store: "Store A",
      added_On: "28.08.2025",
      status: "Active",
    },{
      attraction_Id: "#12345",
      title: "Central Park",
      city: "New York",
      linked_Store: "Store A",
      added_On: "28.08.2025",
      status: "Active",
    },{
      attraction_Id: "#12345",
      title: "Central Park",
      city: "New York",
      linked_Store: "Store A",
      added_On: "28.08.2025",
      status: "Active",
    },{
      attraction_Id: "#12345",
      title: "Central Park",
      city: "New York",
      linked_Store: "Store A",
      added_On: "28.08.2025",
      status: "Inactive",
    },{
      attraction_Id: "#12345",
      title: "Central Park",
      city: "New York",
      linked_Store: "Store A",
      added_On: "28.08.2025",
      status: "Active",
    },
  ];

  return (
    <div>
      <Table
        title="Nearby Attractions"
        add_icon={<FaStackOverflow size={18} />}
        add_button="Add Attractions"
        columns={nearbyColumns}
        data={nearbyData}
        ViewRoute={true}
        EditModal={true}
        AddModal={Add_Attraction}
        itemsPerPage={9}
      />
    </div>
  );
};

export default Nearby_Attractions;
