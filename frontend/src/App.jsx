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

function App() {
  useGetCity() 
  useGetCurrentUser()
  const {userData} = useSelector((state) => state.user)
  console.log("userData",userData);


  
  return (
    <div>
    <Routes>
      <Route path='/signup' element={ !userData ? <SignUp /> : <Navigate to={'/'}/>} />
      <Route path='/signin' element={ !userData ? <SignIn /> : <Navigate to={'/'} /> } />
      <Route path='/forget-password' element={ !userData ? <ForgetPassword /> : <Navigate  to={'/signin'}/>} />
      <Route path='/' element={ userData ? <Home /> : <Navigate to={'/signin'} />} />
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App