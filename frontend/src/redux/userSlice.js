import { createSlice } from "@reduxjs/toolkit";

const useSlice = createSlice({
    name : "user",

    initialState :{
        userData :null,
        loading : false,
        city : null
    },

    reducers : {
        setLoading : (state , action)=>{
            state.loading = action.payload;
        },
        setCity : (state,action) =>{
            state.city = action.payload;
        },

        setUserData : (state ,action) => {
            state.userData = action.payload;
        }
    }

})


export const {setLoading ,setUserData ,setCity} = useSlice.actions;
export default useSlice.reducer;