import { setCity } from "@/redux/userSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetCity() {
    const dispatch = useDispatch()
    const {userData} = useSelector((state) => state.user)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      try {
        const resp = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEO_API_KEY}`
        );
        dispatch(setCity(resp.data?.results[0].city))
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    });
  }, [userData]);
}

export default useGetCity;
