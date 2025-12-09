import React from "react";
import Report from "../../pages/report/Report";
import { Route } from "react-router";

const Report_Route = () => {
  return (
    <>
      <Route path="/report" element={<Report />} />
    </>
  );
};

export default Report_Route;
