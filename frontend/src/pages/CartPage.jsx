import CartIemsCart from "@/components/CartIemsCart";
import { Button } from "@/components/ui/button";
import { CornerDownLeft } from "lucide-react";
import React from "react";
import { FaRupeeSign } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CartPage() {
    const navigate = useNavigate()
    const {cartItems ,totalAmount} = useSelector((state) => state.user)
  return (
    <div className="min-h-screen bg-pink-100/10 flex justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* return button */}
        <div className="flex justify-between items-center ">
          <div className="absolute top-7 left-2.5 cursor-pointer z-50"
            onClick={() => navigate("/")}
          >
            <CornerDownLeft className="size-5" />
          </div>
          <h1 className="text-2xl font-bold text-start">Cart</h1>
        </div>

        {/* if there is no item shows this  */}
        {cartItems?.length === 0 ? (
            <div className="text-gray-600 text-lg text-center uppercase">Your card is empty</div> 
        ) : (
          //  rendering cart items "food item"
          <>
            <div>
            {cartItems?.map((item,index) => (
                <CartIemsCart item={item} key={index} />
            ))}
          </div>

          {/* total amount button */}
          <div className="mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center border" >
            <h1 className="text-lg font-semibold">Total Amount </h1>
            <span className="text-xl font-bold text-pink-600 flex justify-center items-center gap-0.5"> <FaRupeeSign/>.{totalAmount}</span>
          </div>

          {/* checkout button */}
          <div className="flex justify-end mt-5 ">
            <Button onClick={() => navigate('/checkout')} className='cursor-pointer'>Procced to Check Out</Button>
          </div>
          </>
        
        ) }
      </div>
    </div>
  );
}

export default CartPage;
