import React from 'react'
import { FaRupeeSign } from 'react-icons/fa6'
import { Button } from './ui/button'
import { Minus, Plus, Trash2Icon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { removeCartItem, updateQantity } from '@/redux/userSlice'

function CartIemsCart({item}) {
  const dispatch = useDispatch()

  // increasing the quantity of cart items
  const handleIncrease = (id , currentQuantity) => {
      dispatch(updateQantity({id , quantity : currentQuantity + 1}))
  }

  // increasing the quantity of cart items
  const handleDcrease = (id , currentQuantity) => {
    // check if there item length is grater than 0 only that time this works 
    if (currentQuantity > 0) {
        dispatch(updateQantity({id , quantity : currentQuantity - 1}))
    }
  }
  return (
    <div className='flex items-center justify-between bg-white p-4 rounded-xl shadow border mt-10'>
        {/* left */}
        <div className='flex items-center gap-4'>
            <img
            className='w-20 h-20 object-cover rounded-lg border ' 
            src={item.image} alt="" />
            <div>
                <h1 className='font-medium text-gray-900 capitalize'>{item.name}</h1>
                <p className='text-sm text-gray-500 flex justify-start gap-0.5 items-center' ><FaRupeeSign className='text-xs' />. {item.price} x {item.quantity} </p>
                <p className='text-sm font-bold text-gray-900 flex justify-start gap-0.5 items-center'><FaRupeeSign className='text-xs' />.{item.price*item.quantity}</p>
            </div>
        </div>
        {/* right */}
        <div className='flex items-center gap-2'>
            <Button 
            disabled={item.quantity === 1}
            onClick ={() => handleDcrease(item.id , item.quantity)}
            className='cursor-pointer'><Minus /></Button>
            <span className='px-0.5 text-lg'>{item.quantity}</span>
            <Button 
            onClick ={() => handleIncrease(item.id , item.quantity)}
            className='cursor-pointer'><Plus /></Button>
            <span 
            onClick={() => dispatch(removeCartItem(item.id))}
            className='bg-red-100 p-2 rounded-lg cursor-pointer '><Trash2Icon className='text-red-700 text-sm' /></span>
        </div>
    </div>
  )
}

export default CartIemsCart