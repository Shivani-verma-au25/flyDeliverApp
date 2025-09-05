import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import signuppic from '@/assets/signuppic.jpg'
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { AxiosInstance } from '@/utils/axios';
import { toast } from 'sonner';


function SignUp() {
    const naviaget = useNavigate()
    const roles = ['user', "owner", "deliveryPerson"]
    const [loading,setLoading] = useState(false)
    const [showPassword ,setShowPassword] = useState(false)
    const [formData ,setFormData] = useState({
        fullname : '',
        email : '',
        password : '',
        mobile : '',
        role : '',
    })


    const onChangeHanlder = (e) => {
        const { name , value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name] : value,
        }))
    };

    const submitHnadler = async(e) =>{
        e.preventDefault()
        try {
            const resp = await AxiosInstance.post('/v1/auth/signup',formData)
            console.log(resp.data);
            if(resp.data?.success){
                toast.success(resp.data?.message)
                naviaget('/signin')
                // todo : set data into store 
            }

            setFormData({
                fullname : '',
                email : '',
                password : '',
                mobile : '',
                role : ''
            })

        } catch (error) {
            console.log("Error in signup", error.message);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
        
    }
    
    
    return (
    <>
      {/* Main container with responsive padding and centering */}
      <div className='min-h-screen bg-gray-300  flex items-center justify-center font-sans '>
        {/* Card-like container with responsive flex direction and shadow */}
        <div className='max-w-6xl bg-white rounded-xl shadow-lg border flex flex-col md:flex-row'>
          
          {/* Left part: image container, visible on medium screens and up */}
          <div className='hidden md:block md:w-1/2 bg-yellow-50 rounded-l-xl overflow-hidden'>
            {/* Image with object-cover to maintain aspect ratio and fill the container */}
            <img 
              src={signuppic} 
              alt="Person smiling on a couch" 
              className='w-full h-full object-cover'
            />
          </div>

          {/* Right part: form container, takes full width on mobile, half on desktop */}
          <div className='w-full md:w-1/2 flex justify-center flex-col items-center sm:p-8 md:p-10'>
            
            <h1 className='text-xl sm:text-2xl font-bold text-center'>Create an Account</h1>
            <p className='text-xs font-semibold text-yellow-700 py-4 text-center'>
              Signup for exclusive things and fast delivery
            </p>

            <form 
            onSubmit={submitHnadler}
              action="" 
              className='w-full max-w-sm flex flex-col items-center gap-4 py-4 px-4 sm:px-6 shadow shadow-gray-300 rounded-lg'
            >
              {/* Input fields group with consistent vertical spacing */}
              <div className='w-full space-y-4'>
                <div className='space-y-2'>
                  <Label className='block text-sm font-medium'>Full Name</Label>
                  <Input
                    type="text"
                    name='fullname'
                    value={formData.fullname}
                    placeholder="Full Name"
                    className='w-full'
                    onChange={onChangeHanlder}
                  />
                </div>
                <div className='space-y-2'>
                  <Label className='block text-sm font-medium'>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    name='email'
                    placeholder="youraccount@gmail.com"
                    className='w-full'
                    onChange={onChangeHanlder}
                  />
                </div>
                <div className='w-full space-y-2 relative'>
                    <Label className='block'>Password</Label>
                    <Input
                    type={showPassword ? 'text' : 'password'} 
                    value={formData.password}
                    name='password'
                    placeholder="********" 
                    className='text-sm w-full'
                    onChange={onChangeHanlder}
                    />
                    <Button type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-5 right-0 text-gray-400 cursor-pointer' variant={'ghost'}>{ showPassword ? <Eye/> :  <EyeOff />}</Button>
                </div>
                <div className='space-y-2'>
                  <Label className='block text-sm font-medium'>Mobile</Label>
                  <Input
                    type="tel"
                    value={formData.mobile}
                    name='mobile'
                    placeholder="+91 1234567891"
                    className='w-full'
                    onChange={onChangeHanlder}
                  />
                </div>
              </div>

              {/* Role selection buttons */}
              <div className='w-full flex justify-between items-center py-2'>
                <Label className='text-sm font-medium'>I am a:</Label>
                <div className='flex items-center gap-2'>
                  {roles.map((r, idx) => (
                    <Button
                      type="button"
                      name='role'
                      variant={'ghost'}
                      className={`cursor-pointer text-sm font-semibold border ${formData.role === r ? 'bg-yellow-100 text-yellow-800 border-yellow-800' : ''}`}
                      key={idx}
                      onClick={() => setFormData(prev => ({ ...prev, role: r }))}
                    >
                      {r}
                    </Button>
                  ))}
                </div>
              </div>

              <Button type='submit' className='w-full mt-4'>{loading ? 'Loading...' : 'Sign Up'}</Button>
              
              <div className='flex justify-center items-center gap-1 mt-2 text-center'>
                <p className='text-xs'>Already have an account?</p>
                <Link 
                  className='text-xs underline text-blue-600 font-semibold' 
                  to={'/signin'}
                >
                  Signin
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp