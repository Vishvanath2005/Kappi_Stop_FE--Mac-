import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth_Route from "./other_Routes/Auth_Route";
import Layouts from "../layout/Layouts";
import Dashboard_Route from "./other_Routes/Dashboard_Route";
import User_Route from "./other_Routes/User_Route";
import Report_Route from "./other_Routes/Report_Route";
import Settings_Route from "./other_Routes/Settings_Route";
import Wallet_Route from "./other_Routes/Wallet_Route";
import Store_Route from "./other_Routes/Store_Route";
import Menu_Route from "./other_Routes/Menu_Route";
import Offers_Route from "./other_Routes/Offers_Route";
import Nearby_Route from "./other_Routes/Nearby_Route";
import Orders_Route from "./other_Routes/Orders_Route";
import Category_Route from "./other_Routes/Category_Route";

const Main_Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {Auth_Route()}
          <Route element={<Layouts />}>
            {Dashboard_Route()}
            {User_Route()}
            {Store_Route()}
            {Menu_Route()}
            {Category_Route()}
            {Orders_Route()}
            {Wallet_Route()}
            {Offers_Route()}
            {Nearby_Route()}
            {Report_Route()}
            {Settings_Route()}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Main_Router;
