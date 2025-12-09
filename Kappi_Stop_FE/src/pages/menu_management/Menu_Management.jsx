import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { RiDashboardFill } from "react-icons/ri";
import Edit_Product from "./Edit_Product";
import Add_Category from "./Add_Category"
import Add_Product from "./Add_Product";
import axios from "axios";
import { API, formatDate1 } from "../../Host";
import { TbCategoryPlus } from "react-icons/tb";

const Menu_Management = () => {
  const [menuData, setMenuData] = useState([]);

  const menuColumns = [
    { key: "productId", label: "Product ID" },
    { key: "product_name", label: "Product Name" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "last_updated", label: "Last Updated" },
    { key: "status", label: "Status" },
  ];

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${API}/menu/getallmenu`);
      const transformedData = response.data.data.map((item) => ({
        productId: item.productId,
        product_name: item.product_name,
        category: item.category,
        type:item.type,
        price: item.price,
        last_updated: formatDate1(item.last_updated),
        status: item.status,
      }));

      setMenuData(transformedData.reverse());
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);
  return (
    <>
      <Table
        title="Menu Management"
        add_icon={<RiDashboardFill size={18} />}
        add_button="Add Product"
        columns={menuColumns}
        data={menuData}
        AddCategoryModal={Add_Category}
        category_icon={<TbCategoryPlus size={18}/>}
        category_button="Add Category"
        ViewRoute="/menu/view_product"
        EditModal={Edit_Product}
        AddModal={Add_Product}
        itemsPerPage={9}
      />
    </>
  );
};

export default Menu_Management;
