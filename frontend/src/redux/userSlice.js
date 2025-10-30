import { createSlice } from "@reduxjs/toolkit";

const useSlice = createSlice({
    name : "user",

    initialState :{
        userData :null,
        loading : false,
        currentCity : null,
        currentState : null,
        currentAddress : null,
        shopsInMyCity : null,
        foodItemsMyCity : null,
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
        },

        setshopsInMyCity :(state ,action) =>{
            state.shopsInMyCity = action.payload
        },
        setFoodItems : (state ,action) => {
            state.foodItemsMyCity = action.payload;
        }
    }

})


export const {setLoading ,setUserData ,setCurrentState , setCurrentCity,setCurrentAddress, setshopsInMyCity ,setFoodItems} = useSlice.actions;
export default useSlice.reducer;