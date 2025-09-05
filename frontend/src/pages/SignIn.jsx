import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import signinpic from '@/assets/signinpic.jpg'
import { data, Link } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { AxiosInstance } from '@/utils/axios'

function SignIn() {
    const [showPassword ,setShowPassword] = useState(false)
    const [fomrData ,setFormData] = useState({
        email:"",
        password : ""
    })

    const onChangeHanlder = (e) => {
        const {name , value} = e.target;
        setFormData((prev) =>({
            ...prev,
            [name] : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const resp = await AxiosInstance.post('/v1/auth/signin',fomrData)
            if(resp.data?.success){
                toast.success(resp.data?.message)
                // todo set data in stroge
            }
            
            setFormData({
                email: '',
                password : ''
            })
            
            
        } catch (error) {
            console.log("Error in sigin page",error.message);
            toast.error(error.response?.data?.message || "Something went wrong");  
        }
    }

  return (
    <div className='min-h-screen bg-gray-200 py-4 sm:py-20 flex items-center justify-center font-sans'>
        <div className='max-w-6xl bg-white rounded-xl shadow-lg border mx-4 flex flex-col md:flex-row'>
          
          {/* Left part: image container, hidden on mobile */}
          <div className='hidden md:block md:w-1/2 rounded-l-xl overflow-hidden'>
            <img 
              src={signinpic} 
              alt="A person enjoying food" 
              className='w-full h-full object-cover'
            />
          </div>
          
          {/* Right part: form container */}
          <div className='w-full md:w-1/2 flex justify-center flex-col items-center p-6 sm:p-8 md:p-10'>
            <h1 className='text-xl sm:text-2xl font-bold text-center'>Sign in</h1>

            <form 
            onSubmit={handleSubmit}
              action="" 
              className='w-full max-w-sm flex flex-col items-center gap-4 py-4 px-4 sm:px-6 shadow shadow-gray-300 rounded-lg'
            >
              <Button variant={'ghost'} className='cursor-pointer text-sm w-full border flex items-center'>
                <FcGoogle/>
                 Sign in with Google 
              </Button>
              <div className='w-full space-y-2'>
                <Label className='block'>Email</Label>
                <Input
                  type="email" 
                  name="email"
                  placeholder="youraccount@gmail.com" 
                  className='text-sm w-full'
                  onChange={onChangeHanlder}
                />
              </div>
              <div className='w-full space-y-2 relative'>
                <Label className='block'>Password</Label>
                <Input
                  type={showPassword ? 'text' : 'password'} 
                  name="password"
                  placeholder="********" 
                  className='text-sm w-full'
                  onChange={onChangeHanlder}
                />
                <Button type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-5 right-0 text-gray-400 cursor-pointer' variant={'ghost'}>{ showPassword ? <Eye/> :  <EyeOff />}</Button>
              </div>
              <Link to={'/forget-password'} className='text-right w-full text-xs text-blue-500 font-semibold'>Forget password</Link>
              <Button type='submit' className='w-full mt-4 cursor-pointer'>Sign In</Button>
              <div className='flex justify-center items-center gap-1 mt-2'>
                <p className='text-xs'>Don't have an account?</p>
                <Link className='text-xs underline text-blue-600 font-semibold' to={'/signup'}>Signup</Link> 
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default SignIn