import { setFoodItems } from '@/redux/userSlice';
import { AxiosInstance } from '@/utils/axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function useGetFoodItemsByCity() {
    const {currentCity} = useSelector(state => state.user)
    
    const dispatch = useDispatch();
    useEffect(() => {
        if (!currentCity) return; // don't call api if city is null
        const getFoodIems = async () => {
            try {
    
                const response = await AxiosInstance.get(`/v1/product/get-food-by-city/${currentCity}`);
                dispatch(setFoodItems(response.data))
                console.log("getfood by my city " , response.data);
                
            } catch (error) {
                console.log("error in fecthing current user",error);
                
            }
        }

        getFoodIems()
    } , [currentCity]) // cun only when the city change
}

export default useGetFoodItemsByCity;