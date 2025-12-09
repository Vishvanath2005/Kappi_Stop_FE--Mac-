import React from 'react'
import { Route } from 'react-router'
import Offers_Management from '../../pages/offers_management/Offers_Management'
import View_offer from '../../pages/offers_management/View_offer'

const Offers_Route = () => {
  return (
    <>
   <Route path="/Offers">
        <Route index element={<Offers_Management />} />
        <Route path="view_offer" element={<View_offer />} />
      </Route>
    </>
  )
}

export default Offers_Route