import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AxiosInstance } from "@/utils/axios";
import { toast } from "sonner";

function ForgetPassword() {
  const [step, setSetp] = useState(1);
  const [email ,setEmail] = useState('')
  const [otp ,setOtp] = useState('')
  const [newpassword ,setNewPassword] = useState('')
  const [confirmPass ,setConfirmPass] = useState('')
  const navigate = useNavigate();

  // handle set 1

  const sendOtpHandler =  async () =>{
    try {
      const resp = await AxiosInstance.post('/v1/auth/send-otp',{email});
      console.log(resp.data);
      toast.success(resp.data?.message)
      setSetp(2)
    } catch (error) {
      console.log("Error in send otp hanlder",error);
      toast.error(Response.data?.error?.message)      
    }
  }

  const verifyOtpHnadler = async()=>{
    try {
      const resp = await AxiosInstance.post('/v1/auth/verify-otp',{email, resetOtp: otp});
      console.log(resp.data);
      toast.success(resp.data?.message)
      setSetp(3)
    } catch (error) {
      console.log("Error in send otp hanlder",error);
      
    }
  }

   const resetPasswordHandler = async()=>{
    if (newpassword != confirmPass) return null
    try {
      const resp = await AxiosInstance.post('/v1/auth/reset-password',{email,password: newpassword, });
      console.log(resp.data);
      toast.success(resp.data?.message)
      navigate('/signin')
    } catch (error) {
      console.log("Error in send otp hanlder",error);
      
    }
  }

  return (
    <div className=" min-h-screen flex justify-center items-center px-3">
      <Card className="w-full max-w-sm">
        <Link to={'/signin'}><ArrowLeft className="size-4 ml-5" /></Link>
        <CardHeader>
          <CardTitle>Forget Password</CardTitle>
          {/* <CardDescription>Enter your email below</CardDescription> */}
          {/* <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction> */}
        </CardHeader>
        {step == 1 && (
          <>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      name='email'
                      value={email}
                      onChange={(e) =>setEmail(e.target.value)}
                    />
                  </div>

                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button 
              onClick={sendOtpHandler}
              type="submit" className="w-full">
                send OTP
              </Button>
            </CardFooter>
          </>
        )}

        {step == 2 && (
          <>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">OTP</Label>
                    <Input
                      id="otp"
                      type="number"
                      placeholder="Enter OTP"
                      required
                      name='resetOtp'
                      value={otp}
                      onChange={(e) =>setOtp(e.target.value)}
                    />
                  </div>

                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button 
              onClick={verifyOtpHnadler}
              type="submit" className="w-full">
                Verify OTP
              </Button>
            </CardFooter>
          </>
        )}

        {step == 3 && (
          <>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="new password">New Password</Label>
                    <Input
                      id="newpassword"
                      type="password"
                      placeholder="Enter new password"
                      required
                      name=''
                      value={newpassword}
                      onChange={(e) =>setNewPassword(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirm password">Comfirm Password</Label>
                    <Input
                      id="confirm password"
                      type="password"
                      placeholder="Enter confirm password"
                      required
                      name=''
                      value={confirmPass}
                      onChange={(e) =>setConfirmPass(e.target.value)}
                    />
                  </div>

                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button 
              onClick={resetPasswordHandler}
              type="submit" className="w-full">
                Reset Password
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}

export default ForgetPassword;
