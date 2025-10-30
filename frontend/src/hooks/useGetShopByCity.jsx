import { setshopsInMyCity } from '@/redux/userSlice';
import { AxiosInstance } from '@/utils/axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function useGetShopByCity() {
    const {currentCity} = useSelector(state => state.user)
    
    const dispatch = useDispatch();
    useEffect(() => {
        if (!currentCity) return; // don't call api if city is null
        const getShop = async () => {
            try {
    
                const response = await AxiosInstance.get(`/v1/shop/get-by-city/${currentCity}`);
                dispatch(setshopsInMyCity(response.data))
                console.log("get city " , response.data);
                
            } catch (error) {
                console.log("error in fecthing current user",error);
                
            }
        }

        getShop()
    } , [currentCity]) // cun only when the city change
}

export default useGetShopByCity;