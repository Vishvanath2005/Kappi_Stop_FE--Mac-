import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../Host";
import Table from "../../components/Table";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import Edit_Store from "./Edit_Store";
import Add_Store from "./Add_Store";
import Delete_Store from "./Delete_Store";

const Store_Management = () => {
  const [storeData, setStoreData] = useState([]);

  const storeColumns = [
    { key: "storeId", label: "Store ID" },
    { key: "store_name", label: "Store Name" },
    { key: "city", label: "City" },
    { key: "store_number", label: "Contact Number" },
    { key: "opening_hours", label: "Opening Hours" },
    { key: "status", label: "Status" },
  ];

  const fetchStores = async () => {
    try {
      const res = await axios.get(`${API}/store/getallstores`);
     const transform = res.data.data
      setStoreData(transform.reverse());
      console.log(storeData);
      
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <>
      <Table
        title="Store Management"
        add_icon={<HiOutlineBuildingStorefront size={18} />}
        add_button="Add Store"
        columns={storeColumns}
        data={storeData}
        ViewRoute="/store/view_store"
        EditModal={Edit_Store}
        AddModal={Add_Store}
        DeleteModal={Delete_Store}
        itemsPerPage={9}
      />
    </>
  );
};

export default Store_Management;
