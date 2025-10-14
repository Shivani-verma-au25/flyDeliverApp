import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { Edit2, Utensils } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import useGetShop from "@/hooks/useGetShop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OwnerProductItemsCard from "./OwnerProductItemsCard";

function OwnerDashboard() {
  useGetShop();
  const { myShopData } = useSelector((state) => state.owner);
  
 
  

  const navigate = useNavigate();
  return (
    // <div className="w-full min-h-screen flex flex-col">
    <div className="min-w-screen min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex justify-center items-start p-4 sm:p-6">
        <div className="w-full max-w-3xl">
          {!myShopData ? (
            // Empty State (No Shop Added)
            <Card className="p-8 flex flex-col items-center text-center border-dashed border-2 border-pink-200 shadow-sm bg-white">
              <Utensils className="text-pink-600 w-16 h-16 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Add Your Shop
              </h2>
              <p className="text-gray-600 mb-6 max-w-sm">
                Start by adding your shop details to join our food delivery
                platform and reach more customers.
              </p>
              <Button
                className="cursor-pointer"
                onClick={() => navigate("/create-edit-shop")}
              >
                Get Started
              </Button>
            </Card>
          ) : (
            // Shop Already Exists
            <div className="flex flex-col gap-8">
              {/* Welcome Header */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center flex items-center justify-center gap-3">
                <Utensils className="size-10 text-pink-600" />
                Welcome to {myShopData.name}
              </h1>

              {/* Shop Details */}
              <Card className="overflow-hidden shadow-lg py-0 pb-5">
                {myShopData.shopImage && (
                  <img
                    src={myShopData.shopImage}
                    alt={myShopData.name}
                    className="w-full h-60 object-cover"
                  />
                )}
                <CardHeader className="flex justify-between items-center">
                  <CardTitle className="capitalize text-2xl font-bold">
                    {myShopData?.name}
                  </CardTitle>
                  <Edit2
                    className="cursor-pointer size-10 bg-pink-100 hover:bg-pink-200 transition-all p-2 rounded-lg text-pink-600"
                    onClick={() => navigate("/create-edit-shop")}
                  />
                </CardHeader>
                <CardContent className="text-gray-600 text-sm sm:text-base">
                  <p className="leading-relaxed">
                    {myShopData?.address}, {myShopData?.state}
                  </p>
                </CardContent>
              </Card>

              {/* Food Items Section */}
              {myShopData.items?.length ? (
                <div className="flex flex-col items-center gap-4 w-full max-w-3xl " >
                    {/* image */}
                    {myShopData?.items.map((item) => (
                      <OwnerProductItemsCard item={item} key={item._id} />
                    ))}
                </div>
              ) : (
                <Card className="p-8 flex flex-col items-center text-center shadow-sm">
                  <Utensils className="text-pink-600 w-14 h-14 mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Add Your Food Items
                  </h2>
                  <p className="text-gray-600 mb-6 max-w-sm">
                    Your shop looks great! Now, add your delicious food items so
                    customers can start ordering.
                  </p>
                  <Button
                    className="cursor-pointer"
                    onClick={() => navigate("/add-item")}
                  >
                    Add Food
                  </Button>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
}

export default OwnerDashboard;
