import React from "react";
import { Route } from "react-router-dom";
import Wallet_Rewards from "../../pages/wallet_rewards/Wallet_Rewards";

const Wallet_Route = () => {
  return (
    <>
      <Route path="/wallet_rewards" element={<Wallet_Rewards />} />
    </>
  );
};

export default Wallet_Route;
