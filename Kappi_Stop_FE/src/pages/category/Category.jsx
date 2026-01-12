import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { RiDashboardFill } from "react-icons/ri";
import axios from "axios";
import { API } from "../../Host";
import { TbCategoryPlus } from "react-icons/tb";
import Add_Category from "./Add_Category";
import Delete_Category from "./Delete_Category";

const Category = () => {
  const [menuData, setMenuData] = useState([]);

  const menuColumns = [
    { key: "category_name", label: "Category Name" },
    { key: "total_type", label: "No of types" },
];

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${API}/category/getallcategory`);
      const transformedData = response.data.data.map((item) => ({
        id:item._id,
        category_name: item.category_name,
        total_type: item.type?.length,
        category_img: item.category_img,
        type:item.type
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
        title="Category Management"
        add_icon={<RiDashboardFill size={18} />}
        add_button="Add Product"
        columns={menuColumns}
        data={menuData}
        AddCategoryModal={Add_Category}
        category_icon={<TbCategoryPlus size={18} />}
        category_button="Add Category"
        ViewRoute="/category/view_category"
        itemsPerPage={9}
        DeleteModal={Delete_Category}
      />
    </>
  );
};

export default Category;
