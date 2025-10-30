import React from 'react'
import { Card } from './ui/card'
import { Drumstick, LeafyGreen } from 'lucide-react'

function FoodCard({food}) {
    const renderRatingStars = () => {}
  return (
    <Card className='w-64 rounded-2xl border-2 border-pink-600 bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col'>
        <div className='relative w-full h-44 flex justify-center items-center bg-white'>
            <div className='absolute z-50 top-1  right-1 p-1 bg-white rounded-full shadow'>{food.foodType == 'Veg' ? <LeafyGreen className='text-green-600' /> : <Drumstick className='text-red-600' />}</div>
            <img 
            className='w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer'
            src={food.productImage} alt="product Image" />
        
        </div>
        {/* details for food */}
        <div className='flex-1 flex flex-col p-4'>
            <h2 className='font-semibold text-gray-900 text-base truncate'>{food.name}</h2>

        </div>
    </Card>
  )
}

export default FoodCard