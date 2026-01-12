import React, { useEffect, useState } from "react";
import { Clipboard, DollarSign, Plus } from "lucide-react";
import Table from "../../components/Table";
import Create_Offer from "./Create_Offer";
import axios from "axios";
import { API, formatDate } from "../../Host";
import Delete_Offer from "./Delete_Offer";

const Offer_Management = () => {
  const [offers, setoffers] = useState([]);

  const offerColumns = [
    { key: "offerId", label: "Offer ID" },
    { key: "title", label: "Title" },
    { key: "offer_type", label: "Offer Type" },
    { key: "discount", label: "Discount %" },
    { key: "validity", label: "Validity (From - To)" },
    { key: "status", label: "Status" },
  ];

  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${API}/offer/getalloffers`);
      const transformedData = res.data.data.map((offer) => ({
        ...offer,
        validity: `${formatDate(offer.valid_from)} - ${formatDate(
          offer.valid_to
        )}`,
        applicable_store: Array.isArray(offer.applicable_store)
          ? offer.applicable_store.join(", ")
          : "-",
        status: new Date(offer.valid_to) >= new Date() ? "Active" : "Inactive",
      }));
      setoffers(transformedData);      
    } catch (err) {
      console.error("Error fetching offers:", err);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

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
        data={offers}
        ViewRoute="/offers/view_offer"
        EditModal={false}
        AddModal={Create_Offer}
        itemsPerPage={8}
        DeleteModal={Delete_Offer}
      />
    </>
  );
};

export default Offer_Management;
