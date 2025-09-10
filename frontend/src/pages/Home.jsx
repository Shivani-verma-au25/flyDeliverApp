import DeliverPerson from '@/components/DeliverPerson'
import Navbar from '@/components/Navbar'
import OwnerDashboard from '@/components/OwnerDashboard'
import UserDashboard from '@/components/UserDashboard'
import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
    const {userData} = useSelector((state) => state.user)
    console.log(userData.user.role);
    
  return (
    <div className='max-w-7xl min-h-screen '>
        {
            userData.user.role == 'user' && <UserDashboard />
        }
        {
            userData.user.role == 'owner' && <OwnerDashboard />
        }
        {
            userData.user.role == 'deliverPerson' && <DeliverPerson />
        }
    </div>
  )
}

export default Home