import { setLoading, setMyShopData } from "@/redux/ownerSlice";
import { AxiosInstance } from "@/utils/axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetShop() {
  const {loading} = useSelector((state) => state.owner)
  const  dispatch = useDispatch()
  useEffect(() => {
    const getShop = async () => {
      dispatch(setLoading(true))
      try {
        const res = await AxiosInstance.get('/v1/shop/get-shop')
        if (res.data?.success) {
          console.log("res shop",res.data);
          dispatch(setMyShopData(res.data.shop))
        }
        dispatch(setLoading(false))
      } catch (error) {
        console.log("error while string in redux",error);
        dispatch(setLoading(false))
      }
    }
    getShop()
  },[])

}

export default useGetShop;
