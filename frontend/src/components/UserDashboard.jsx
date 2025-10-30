import React, {useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { categories } from "@/categories";
import CategoryCard from "./CategoryCard";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import useGetShopByCity from "@/hooks/useGetShopByCity";
import useGetFoodItemsByCity from "@/hooks/useGetFoodItemsByCity";
import FoodCard from "./FoodCArd";

function UserDashboard() {
  useGetShopByCity()
  useGetFoodItemsByCity()

  const {currentCity ,shopsInMyCity ,foodItemsMyCity} = useSelector((state) => state.user)
  console.log("shop" ,shopsInMyCity?.shops);
  console.log("food items" ,foodItemsMyCity?.items);
  
  
   const cateScrollRef = useRef()
   const shopsScrollRef = useRef()
   const [showLeftCateButton ,setShowLeftCateButton] = useState(false)
   const [showRightCateButton ,setShowRightCateButton] = useState(false)

    const [showLeftShopButton ,setShowLeftShopButton] = useState(false)
   const [showRightShopButton ,setShowRightShopButton] = useState(false)

  
  const updateButton = (ref , setleftButton , setrightButton)=>{
    const element = ref.current;
    if(element){
      // console.log(element.scrollLeft)
      
      // for categories
      setleftButton(element.scrollLeft > 0)
      setrightButton((element.scrollLeft + element.clientWidth) < element.scrollWidth)

      // console.log("client width", element.clientWidth);
      // console.log("scroll width", element.scrollWidth);
      // console.log("scroll left", element.scrollLeft);
      
    }
  }

  const scrollHandler = (ref , direction) =>{
    if (ref.current) {
        ref.current.scrollBy({
          left:direction == 'left' ? -200 :200,
          behavior :  'smooth'
        })
    }
  }


  useEffect(() => {
  const cateElement = cateScrollRef.current;
  const shopElement = shopsScrollRef.current;

  if (cateElement) {
    const handleCateScroll = () => updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
    cateElement.addEventListener('scroll', handleCateScroll);
    updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
    return () => cateElement.removeEventListener('scroll', handleCateScroll);
  }

  if (shopElement) {
    const handleShopScroll = () => updateButton(shopsScrollRef, setShowLeftShopButton, setShowRightShopButton);
    shopElement.addEventListener('scroll', handleShopScroll);
    updateButton(shopsScrollRef, setShowLeftShopButton, setShowRightShopButton);
    return () => shopElement.removeEventListener('scroll', handleShopScroll);
  }
}, []);


  return (
    <div className=" w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
     <Navbar/>
     {/* categary  */}
      <div className="w-full max-w-4xl flex flex-col gap-5 items-start mt-20 p-2.5 ">
        <h1 className="tex-gray-800 text-2xl sm:text-3xl">Inspration for you first order</h1>
        {/*category card */}
        <div className="w-full ">
          <div className="w-full flex justify-between p-2">
            {showLeftCateButton &&  <Button onClick={() => scrollHandler(cateScrollRef,'left')} variant={'ghost'} className='border cursor-pointer'><ChevronLeft /></Button>}
            {showRightCateButton && <Button onClick={() => scrollHandler(cateScrollRef,'right')} variant={'ghost'} className='border cursor-pointer' ><ChevronRight /></Button>
}
          </div>
          <div className="w-full flex overflow-y-auto gap-4 pb-2 scrollbar-none scroll-none" ref={cateScrollRef}>
            {categories.map((cat,index) => (
            <CategoryCard name={cat.category} image={cat.image} key={index} />
          ))}
          </div>
        </div>
      </div>

       {/* for shop */}

        <div className="w-full max-w-4xl flex flex-col gap-5 items-start mt-20 p-2.5 ">
            <h1 className="tex-gray-800 text-2xl sm:text-3xl">Best shop in {currentCity}</h1>
             <div className="w-full ">
          <div className="w-full flex justify-between p-2">
            {showLeftShopButton &&  <Button onClick={() => scrollHandler(shopsScrollRef,'left')} variant={'ghost'} className='border cursor-pointer'><ChevronLeft /></Button>}
            {showRightShopButton && <Button onClick={() => scrollHandler(shopsScrollRef,'right')} variant={'ghost'} className='border cursor-pointer' ><ChevronRight /></Button>}
          </div>
          <div className="w-full flex overflow-y-auto gap-4 pb-2 scrollbar-none scroll-none" ref={shopsScrollRef}>
            {shopsInMyCity?.shops?.map((shop,index) => (
            <CategoryCard name={shop.name} image={shop.shopImage} key={index} />
          ))}
          </div>
        </div>
        </div>


        {/* shop  */}
        <div className="w-full max-w-4xl flex flex-col gap-5 items-start mt-20 p-2.5 ">
            <h1 className="tex-gray-800 text-2xl sm:text-3xl">Suggested food items </h1>
          <div className="w-full h-auto flex flex-wrap gap-5 justify-center">
            {foodItemsMyCity?.items?.map((item ,index) => (
            <FoodCard food={item} key={index} />
          ))}
          </div>
        </div>

    </div>
  );
}

export default UserDashboard;
