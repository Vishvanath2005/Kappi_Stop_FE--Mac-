import React from "react";
import { Clipboard, DollarSign, Plus } from "lucide-react";
import Table from "../../components/Table";
import Create_Offer from "./Create_Offer";

const Offer_Management = () => {
  const offerColumns = [
    { key: "offerId", label: "Offer ID" },
    { key: "title", label: "Title" },
    { key: "offerType", label: "Offer Type" },
    { key: "discount", label: "Discount %" },
    { key: "validity", label: "Validity (From - To)" },
    { key: "applicableStores", label: "Applicable Stores" },
    { key: "status", label: "Status" },
  ];

  const offerData = [
    {
      offerId: "#12345",
      title: "Public",
      offerType: "Sophia Clark",
      discount: "20%",
      validity: "07/01/2024 - 07/31/2024",
      applicableStores: "All Stores",
      status: "Active",
    },
    {
      offerId: "#12346",
      title: "Public",
      offerType: "Sophia Clark",
      discount: "20%",
      validity: "07/01/2024 - 07/31/2024",
      applicableStores: "All Stores",
      status: "Inactive",
    },
    {
      offerId: "#12347",
      title: "Public",
      offerType: "Sophia Clark",
      discount: "20%",
      validity: "07/01/2024 - 07/31/2024",
      applicableStores: "All Stores",
      status: "Active",
    },
    {
      offerId: "#12348",
      title: "Public",
      offerType: "Sophia Clark",
      discount: "20%",
      validity: "07/01/2024 - 07/31/2024",
      applicableStores: "All Stores",
      status: "Inactive",
    },
    {
      offerId: "#12349",
      title: "Public",
      offerType: "Sophia Clark",
      discount: "20%",
      validity: "07/01/2024 - 07/31/2024",
      applicableStores: "All Stores",
      status: "Active",
    },
    {
      offerId: "#12350",
      title: "Public",
      offerType: "Sophia Clark",
      discount: "20%",
      validity: "07/01/2024 - 07/31/2024",
      applicableStores: "All Stores",
      status: "Active",
    },
  ];

  return (
    <>
      <Table
        title="Offer Management"
        add_icon={
          <div className="relative w-6 h-6">
            <Clipboard className="absolute" />
            <DollarSign className="absolute left-1.5 top-2 w-3 h-3" />
          </div>
        }
        add_button="Create Offer"
        columns={offerColumns}
        data={offerData}
        ViewRoute="/offers/view_offer"
        EditModal={false}
        AddModal={Create_Offer}
        itemsPerPage={8}
      />
    </>
  );
};

export default Offer_Management;
