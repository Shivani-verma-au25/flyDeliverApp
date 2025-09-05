import React from 'react'
import { Button } from './components/ui/button'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { Toaster } from './components/ui/sonner'
import ForgetPassword from './pages/ForgetPassword'

function App() {
  return (
    <div>
    <Routes>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/forget-password' element={<ForgetPassword />} />
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App