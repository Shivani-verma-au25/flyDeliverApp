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
        cartItems : []
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
        },
        addToCart : (state ,action) =>{
            const cartItem = action.payload;
            console.log("cartIem from useslice" ,cartItem);
            
            // find existing item
            const exitingItem = state.cartItems.find((item) => item.id === cartItem.id);
            if (exitingItem) {
                exitingItem.quantity += cartItem.quantity; // updating product quantity
            }else{
                state.cartItems.push(cartItem)
            }

        }
    }

})


export const {setLoading ,setUserData ,setCurrentState , setCurrentCity,setCurrentAddress, setshopsInMyCity ,setFoodItems ,addToCart} = useSlice.actions;
export default useSlice.reducer;