import { AxiosInstance } from "@/utils/axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetShop() {
    const dispatch = useDispatch()
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await AxiosInstance.get("/v1/shop/get-shop");
        console.log("get shop", res.data);
      } catch (error) {
        console.log("error in useGetShop", error);
      }
    };

    fetchShop();
  }, []);
}

export default useGetShop;
