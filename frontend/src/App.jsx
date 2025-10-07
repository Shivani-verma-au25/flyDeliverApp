import React from 'react'
import { Button } from './components/ui/button'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { Toaster } from './components/ui/sonner'
import ForgetPassword from './pages/ForgetPassword'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import useGetCity from './hooks/useGetCity'
import CreateEditShop from './pages/CreateEditShop'
import AddItems from './pages/AddItems'
import EditItem from './pages/EditItem'

function App() {
  useGetCity() 
  useGetCurrentUser()

  const {userData} = useSelector((state) => state.user)


  
  return (
    <div>
    <Routes>
      <Route path='/signup' element={ !userData ? <SignUp /> : <Navigate to={'/'}/>} />
      <Route path='/signin' element={ !userData ? <SignIn /> : <Navigate to={'/'} /> } />
      <Route path='/forget-password' element={ !userData ? <ForgetPassword /> : <Navigate  to={'/signin'}/>} />
      <Route path='/' element={ userData ? <Home /> : <Navigate to={'/signin'} />} />
      <Route path='/create-edit-shop' element={ userData ? <CreateEditShop /> : <Navigate to={'/signin'} />} />
      <Route path='/add-item' element={ userData ? <AddItems /> : <Navigate to={'/signin'} />} />
      <Route path='/edit-product/:productId' element={ userData ? <EditItem /> : <Navigate to={'/signin'} />} />
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App