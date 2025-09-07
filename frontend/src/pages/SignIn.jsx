import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import signinpic from '@/assets/signinpic.jpg'
import { data, Link } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { AxiosInstance } from '@/utils/axios'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUserData } from '@/redux/userSlice'

function SignIn() {
  const dispatch = useDispatch()
  const {loading} = useSelector((state) => state.user);
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
          dispatch(setLoading(true))
            const resp = await AxiosInstance.post('/v1/auth/signin',fomrData)
            if(resp.data?.success){
                toast.success(resp.data?.message)
                dispatch(setUserData(resp.data))
            }
            setFormData({
                email: '',
                password : ''
            })
            
            dispatch(setLoading(false))
        } catch (error) {
          dispatch(setLoading(false))
            console.log("Error in sigin page",error.message);
            toast.error(error.response?.data?.message || "Something went wrong");  
        }
    }

    // google signin
  const googleAuthHanlder = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const resp = await signInWithPopup(auth, provider);
    const user = resp.user;

  
    const { data } = await AxiosInstance.post("/v1/auth/google-auth", {
      email: user.email,
    });

    toast.success(data.message);
    dispatch(setUserData(data))
  } catch (error) {
    console.log("Error in googleAuthHandler", error);
    toast.error(error.response?.data?.message || "Google sign-in failed!");
  }
};



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
              <Button 
              onClick={googleAuthHanlder}
              variant={'ghost'} className='cursor-pointer text-sm w-full border flex items-center'>
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
                  required
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
                  required
                />
                <Button type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-5 right-0 text-gray-400 cursor-pointer' variant={'ghost'}>{ showPassword ? <Eye/> :  <EyeOff />}</Button>
              </div>
              <Link to={'/forget-password'} className='text-right w-full text-xs text-blue-500 font-semibold'>Forget password</Link>
              <Button type='submit' className='w-full mt-4 cursor-pointer'> {loading ? <><Loader2 className="size-5 animate-spin transition-all duration-200 " />Loading...</> : 'Sign In' }</Button>
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