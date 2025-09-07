import { Map, MapPin, Navigation, SearchIcon, ShoppingBasket } from 'lucide-react'
import React from 'react'
import { Input } from './ui/input'

function UserDashboard() {
  return (
    <div className='w-full h-20 flex items-center justify-between md:justify-center gap-2 px-3 top-0 fixed  z-50 bg-pink-50 overflow-visible '>
        <h1 className='text-3xl font-bold mb-2 text-pink-500'>Fly</h1>
        <div className='md:w-3/5 lg:w-[40%] h-[70%] bg-white shadow-xl rounded-lg flex items-center gap-2'>
            {/* city */}
            <div className='flex items-center w-[30%] overflow-hidden gap-2 px-2 border-r-2 border-gray-400 '>
                <Navigation className='size-5 text-pink-600' />
                <div className='w-[80%] truncate text-gray-600 '>Lucknow</div>
            </div>
            <div className='w-4/5 flex justify-between items-center gap-2 px-2'>
                <SearchIcon className='size-5 text-pink-600' />
                <Input  className='px-5 text-gray-700 outline-none w-full' type='text' placeholder="Search Food" />
            </div>
        </div>
            {/* cart */}

            <div>
                <ShoppingBasket/>
            </div>
    </div>
  )
}

export default UserDashboard