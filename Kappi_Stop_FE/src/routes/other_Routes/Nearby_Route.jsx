import React from "react";
import { Route } from "react-router-dom";
import Nearby_Attractions from "../../pages/nearby_attractions/Nearby_Attractions";

const Nearby_Route = () => {
  return (
    <>
      <Route path="/nearby" element={<Nearby_Attractions />} />
    </>
  );
};

export default Nearby_Route;
