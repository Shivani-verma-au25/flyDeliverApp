import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { Utensils } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import useGetShop from "@/hooks/useGetShop";

function OwnerDashboard() {
  useGetShop();
  const { myShopData } = useSelector((state) => state.owner);
  console.log(myShopData);
  
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex flex-col ">
      <Navbar />
      {!myShopData && (
        <div className="h-screen w-screen  flex justify-center items-center p-4 sm:p-6">
          <div className="w-full max-w-md mx-auto  bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            {/* <div className="flex flex-col items-center text-center">
                <Utensils className="text-pink-600 w-16 h-16 sm:w-20 sm:h-20 mb-4 font-extrabold" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  Add your shop
                </h2>
                <p className="text-gray-600 mb-4  text-sm sm:text-base">
                  Join our food delivery App for fast & deliciour food.
                </p>
                <Button
                  className="cursor-pointer"
                  onClick={() => navigate("/create-edit-shop")}
                >
                  Get Started{" "}
                </Button>
              </div> */}


            {myShopData ? (
              <div className="flex flex-col items-center text-center">
                <Utensils className="text-pink-600 w-16 h-16 sm:w-20 sm:h-20 mb-4 font-extrabold" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  Add your shop
                </h2>
                <p className="text-gray-600 mb-4  text-sm sm:text-base">
                  Join our food delivery App for fast & deliciour food.
                </p>
                <Button
                  className="cursor-pointer"
                  onClick={() => navigate("/create-edit-shop")}
                >
                  Get Started{" "}
                </Button>
              </div>
            ) : (
              <div className="bg-red-600">
                <p>{myShopData?.name}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;
