import React, { useState } from 'react'
import { Card } from './ui/card'
import { Drumstick, LeafyGreen, Minus, Plus, ShoppingCartIcon } from 'lucide-react'
import { FaStairs, FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { data } from 'react-router-dom';
import { Button } from './ui/button';



function FoodCard({food}) {
  const [quantity ,setQuantity] = useState(0)
    const renderRatingStars = (rating) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push( i <= rating ? <FaStairs className='text-yellow-500 text-lg' /> : <CiStar className='text-yellow-500 text-lg'  />) 
      }

      return stars; 
    }

    const handleIncrease = () => {
      const newQanty = quantity + 1;
      setQuantity(newQanty);
    }

    const handleDcrease = () => {
      if (quantity > 0 ) {
        const newQanty = quantity - 1;
        setQuantity(newQanty);
      }
    }
  return (
    <Card className='w-64 rounded-2xl border-2 border-pink-600 bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col'>
        <div className='relative w-full h-44 flex justify-center items-center bg-white'>
            <div className='absolute z-50 top-1  right-1 p-1 rounded-full shadow'>{food.foodType === 'Veg' ? <LeafyGreen className='bg-green-600 rounded-full  text-black p-0.5' /> : <Drumstick className='bg-red-600 rounded-full text-black p-0.5' />}</div>
            <img 
            className='w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer'
            src={food.productImage} alt="product Image" />
        
        </div>
        {/* details for food */}
        <div className='flex-1 flex flex-col px-4'>
            <h2 className='font-semibold text-gray-900 text-base truncate'>{food.name}</h2>
            {/* rendering stars */}
            <div className='flex items-center gap-1 mt-1'>
              {renderRatingStars(data.rating?.average || 0)}
              <span className='text-gray-500 text-xs'>{data.rating?.count || 0}</span>
            </div>
            {/* product details */}
            <div className='flex items-center justify-between mt-auto pt-3 '>
              <span className='font-bold text-gray-900 text-lg'>{food.price}</span>

                <div className='flex items-center border rounded-xl overflow-hidden shadow-sm p-1'>
                <Button
                onClick={handleDcrease} 
                disabled={quantity === 0}
                variant={'ghost'} className={`cursor-pointer ${quantity === 0 ? 'cursor-none bg-gray-200' : 'cursor-pointer' }  `} ><Minus /></Button>
                <span className='px-2' >{quantity}</span>
                <Button
                onClick={handleIncrease} 
                variant={'ghost'} className='cursor-pointer '  ><Plus /></Button>
                <Button><ShoppingCartIcon size={16} /></Button>
              </div>
            </div>

            

        </div>
    </Card>
  )
}

export default FoodCard