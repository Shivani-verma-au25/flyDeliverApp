import { createSlice } from "@reduxjs/toolkit";

const useSlice = createSlice({
    name : "user",

    initialState :{
        userData :null,
        loading : false,
        currentCity : null,
        currentState : null,
        currentAddress : null,
    },

    reducers : {
        setLoading : (state , action)=>{
            state.loading = action.payload;
        },
        setCurrentCity : (state,action) =>{
            state.currentCity = action.payload;
        },
        setCurrentState : (state ,action)=>{
            state.currentState = action.payload;
        },
        setCurrentAddress : (state,action)=>{
            state.currentAddress = action.payload;
        },

        setUserData : (state ,action) => {
            state.userData = action.payload;
        }
    }

})


export const {setLoading ,setUserData ,setCurrentState , setCurrentCity,setCurrentAddress} = useSlice.actions;
export default useSlice.reducer;