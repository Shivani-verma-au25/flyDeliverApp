import { createSlice } from "@reduxjs/toolkit";

const useSlice = createSlice({
    name : "user",

    initialState :{
        userData :null,
        loading : false
    },

    reducers : {
        setLoading : (state , action)=>{
            state.loading = action.payload;
        },

        setUserData : (state ,action) => {
            state.userData = action.payload;
        }
    }

})


export const {setLoading ,setUserData} = useSlice.actions;
export default useSlice.reducer;