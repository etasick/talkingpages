import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import StoreLocator from "../components/StoreLocator";
function StorelocatorPage() {
    const token = localStorage.getItem("token");

   

  return (
    
    <div className="container mx-auto p-6">
      <Helmet>
                <title> Store Locator: Find Stores near you</title>
                <meta name="description" content="Find Stores Near you"/>
            </Helmet>
      <h2 className="text-2xl font-bold mb-6">Find stores Near you</h2>
    
      <StoreLocator token={token}/>
    </div>
  );
}

export default StorelocatorPage;
