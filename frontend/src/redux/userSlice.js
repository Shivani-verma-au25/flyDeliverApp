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
        cartItems : [],
        totalAmount : 0,
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
            // total amount

            state.totalAmount = state.cartItems.reduce((sum ,i) => sum + i.price * i.quantity , 0);


        },

        updateQantity : (state ,action) =>{
            const {id , quantity} = action.payload;
            const item = state.cartItems.find((i) => i.id === id);
            if(item){
                item.quantity = quantity;
            }
            // total amount updating 
            state.totalAmount = state.cartItems.reduce((sum ,i) => sum + i.price * i.quantity , 0);
        },

        removeCartItem : (state ,action) =>{
            const deletItemId = action.payload; // gives id of deleting prodcut

            // filtering the  payload  : if payloads id is not equal to cartitems id return all item accept matching  // ist when its match
            state.cartItems = state.cartItems.filter((i) => i.id !== deletItemId) 
            // total amount
            state.totalAmount = state.cartItems.reduce((sum ,i) => sum + i.price * i.quantity , 0);


        }
    }

})


export const {setLoading ,setUserData ,setCurrentState , setCurrentCity,setCurrentAddress, setshopsInMyCity ,setFoodItems ,addToCart ,updateQantity , removeCartItem} = useSlice.actions;
export default useSlice.reducer;