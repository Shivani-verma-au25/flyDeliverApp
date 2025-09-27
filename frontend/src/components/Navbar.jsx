import {
  Minus,
  Navigation,
  Plus,
  Receipt,
  SearchIcon,
  ShoppingCart,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { AxiosInstance } from "@/utils/axios";
import { setUserData } from "@/redux/userSlice";
import { toast } from "sonner";

function Navbar() {
  const dispatch = useDispatch();
  const { userData, currentCity } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  // console.log("user data", myShopData);

  const handleSignOut = async () => {
    try {
      const res = await AxiosInstance.post("/v1/auth/signout");
      toast.success(res.data?.message);
      dispatch(setUserData(null));
    } catch (error) {
      console.log("error logging out", error);
    }
  };

  return (
    <div className="w-full h-20 flex items-center justify-between md:justify-center gap-2 px-3 top-0 fixed  z-50 bg-pink-50 overflow-visible ">
      <h1 className="text-3xl font-bold mb-2 text-pink-500">Fly</h1>
      {/*  for desktop */}
      {userData?.user?.role === "user" && (
        <div className="md:w-3/5 lg:w-[40%] h-[70%] bg-white shadow-xl rounded-lg items-center gap-2 md:flex hidden ">
          {/* currentCity */}
          <div className="flex items-center w-[30%] overflow-hidden gap-2 px-2 border-r-2 border-gray-400 ">
            <Navigation className="size-5 text-pink-600" />
            <div className="w-[80%] truncate text-gray-600 ">{currentCity}</div>
          </div>
          <div className="w-4/5 flex justify-between items-center gap-2 px-2">
            <SearchIcon className="size-5 text-pink-600" />
            <Input
              className="px-5 text-gray-700 outline-none w-full"
              type="text"
              placeholder="Search Food"
            />
          </div>
        </div>
      )}

      {/* cart */}
      <div className="flex justify-center items-center gap-2">
        {userData?.user?.role === "user" && (
          <Popover>
            <PopoverTrigger>
              <SearchIcon className="size-5 text-pink-600 md:hidden" />
            </PopoverTrigger>
            <PopoverContent className="p-0 border-none shadow-none bg-transparent">
              <div className="w-full h-[70px] fixed top-[50px] -left-[5%] bg-white shadow-xl rounded-lg flex items-center px-1">
                {/* currentCity */}
                <div className="flex items-center w-[25%] overflow-hidden gap-2 px-1 border-r-2 border-gray-400">
                  <Navigation className="size-5 text-pink-600" />
                  <div className="w-[80%] truncate text-gray-600 text-xs">
                    {currentCity}
                  </div>
                </div>

                {/* search input */}
                <div className="flex-1 flex items-center gap-2 px-2">
                  <SearchIcon className="size-5 text-pink-600" />
                  <Input
                    className="px-2 text-gray-700 outline-none w-full text-xs"
                    type="text"
                    placeholder="Search Food"
                  />
                </div>

                {/* close button */}
                <PopoverClose asChild>
                  <button className="rounded-full hover:bg-gray-100">
                    <X className="size-4 text-pink-600" />
                  </button>
                </PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
        )}

        {userData?.user?.role === "user" && (
          <div className="relative cursor-pointer">
            <ShoppingCart className="size-7 text-pink-600" />{" "}
            <span className="absolute right-0 -top-3 text-pink-600">0</span>
          </div>
        )}

        {/*  add food */}

        {userData.user?.role === "owner" ? (
          <>
            {myShopData && (
              <>
                <div className="hidden md:flex justify-baseline md:justify-center items-center">
                  <Button
                    variant={"ghost"}
                    className="cursor-pointer border border-pink-400 text-pink-600 hover:text-pink-7 text-xs md:text-sm hover:bg-pink-600/10"
                  >
                    <Plus size={10} />
                    Add Food Products
                  </Button>
                </div>
                <div className="flex md:hidden justify-baseline md:justify-center items-center gap-1">
                  <Button
                    variant={"ghost"}
                    className="cursor-pointer border border-pink-400 text-pink-600 hover:text-pink-7 text-xs md:text-sm hover:bg-pink-600/10"
                  >
                    <Plus size={10} />
                  </Button>
                </div>
              </>
            )}
            <div className="hidden md:flex justify-center items-center gap-2 cursor-pointer relative px-3 py-1 text-pink-600 font-medium text-xs md:text-sm rounded-md hover:bg-pink-500/10 border border-pink-400">
              <Receipt className="text-pink-600" />
              <span>Pending Orders</span>
              <span className="absolute -top-3 -right-2 bg-pink-500 w-4 h-4 text-white rounded-full flex justify-center items-center">
                0 
              </span>
            </div>

            <div className="flex md:hidden justify-center items-center cursor-pointer relative px-2  py-1 text-pink-600 font-medium text-xs md:text-sm rounded-md hover:bg-pink-500/10 border border-pink-400">
              <Receipt className="text-pink-600" />
              <span></span>
              <span className="absolute -top-3 -right-2 bg-pink-500 w-4 h-4 text-white rounded-full flex justify-center items-center">
                0
              </span>
            </div>
          </>
        ) 
        : (
          <>
            <Button
              variant={"outline"}
              className="hidden md:block px-5 py-1 rounded-lg text-gray-400 cursor-pointer hover:bg-pink-600/10 hover:text-pink-600 text-sm font-medium"
            >
              My Orders
            </Button>
          </>
        )}

        {/* proile */}
        <Popover>
          <PopoverTrigger className="">
            <div className="w-10 h-10  rounded-full flex justify-center items-center bg-pink-600 text-white text-sm shadow-xl font-semibold cursor-pointer ml-1 ">
              {userData?.user.fullname.slice(0, 1)}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-44 mt-5 ">
            <p className="font-semibold text-sm  py-1">
              {userData?.user.fullname}
            </p>
            <p className="font-semibold text-sm md:hidden py-1 text-pink-600">
              My orders
            </p>
            <div
              onClick={handleSignOut}
              className="text-pink-600 font-semibold text-sm cursor-pointer"
            >
              Log Out
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default Navbar;
