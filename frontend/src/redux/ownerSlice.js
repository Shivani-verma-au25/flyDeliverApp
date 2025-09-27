import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
    name : "owner",
    initialState :{
        myShopData :null,
        loading : false,
    },

    reducers : {
        setLoading : (state , action)=>{
            state.loading = action.payload;
        },
        setMyShopData : (state , action) => {
            state.myShopData = action.payload;
        }
    }

})


export const {setLoading,setMyShopData} = ownerSlice.actions;
export default ownerSlice.reducer;