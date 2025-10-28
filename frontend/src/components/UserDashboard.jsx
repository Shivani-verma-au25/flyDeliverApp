import React, {useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { categories } from "@/categories";
import CategoryCard from "./CategoryCard";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";

function UserDashboard() {
  const {currentCity} = useSelector((state) => state.user)
   const cateScrollRef = useRef()
   const [showLeftCateButton ,setShowLeftCateButton] = useState(false)
   const [showRightCateButton ,setShowRightCateButton] = useState(false)
  
  const updateButton = (ref , setShowLeftCateButton , setShowRightCateButton)=>{
    const element = ref.current;
    if(element){
      // console.log(element.scrollLeft)
      
      setShowLeftCateButton(element.scrollLeft > 0)
      setShowRightCateButton((element.scrollLeft + element.clientWidth) < element.scrollWidth)

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
    if (cateScrollRef.current) {
        updateButton(cateScrollRef , setShowLeftCateButton ,setShowRightCateButton)
      cateScrollRef.current.addEventListener('scroll', () =>{
        updateButton(cateScrollRef , setShowLeftCateButton ,setShowRightCateButton)
      })
    }

    return ()=> cateScrollRef.current.removeEventListener('scroll',() =>{
        updateButton(cateScrollRef , setShowLeftCateButton ,setShowRightCateButton)
      })
  },[categories])

  return (
    <div className=" w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
     <Navbar/>
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
            <CategoryCard cat={cat} key={index} />
          ))}
          </div>
        </div>
      </div>

       {/* for shop */}

        <div className="w-full max-w-4xl flex flex-col gap-5 items-start mt-20 p-2.5 ">
            <h1 className="tex-gray-800 text-2xl sm:text-3xl">Best shop in {currentCity}</h1>

        </div>

      
    </div>
  );
}

export default UserDashboard;
