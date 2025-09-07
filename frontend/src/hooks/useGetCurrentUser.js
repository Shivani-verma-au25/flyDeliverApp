import { setUserData } from '@/redux/userSlice';
import { AxiosInstance } from '@/utils/axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetCurrentUser() {
    const dispatch = useDispatch();
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const response = await AxiosInstance.get('/v1/user/getcurrent-user');
                dispatch(setUserData(response.data))
                
            } catch (error) {
                console.log("error in fecthing current user",error);
                
            }
        }

        getCurrentUser()
    } , [])
}

export default useGetCurrentUser