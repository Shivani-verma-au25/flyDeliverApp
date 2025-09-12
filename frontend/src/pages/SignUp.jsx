import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import signuppic from "@/assets/signuppic.jpg";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader, Loader2 } from "lucide-react";
import { AxiosInstance } from "@/utils/axios";
import { toast } from "sonner";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth } from "@/utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUserData,setLoading } from "@/redux/userSlice";

function SignUp() {
  const naviaget = useNavigate();
  const {loading} = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const roles = ["user", "owner", "deliveryPerson"];
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    mobile: "",
    role: "",
  });

  const onChangeHanlder = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHnadler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const resp = await AxiosInstance.post("/v1/auth/signup", formData);
      console.log(resp.data);
      if (resp.data?.success) {
        console.log("data signup",resp);
        
        toast.success(resp.data?.message);
        dispatch(setUserData(resp.data))
        naviaget("/signin");
      }
      setFormData({
        fullname: "",
        email: "",
        password: "",
        mobile: "",
        role: "",
      });
    } catch (error) {
      dispatch(setLoading(true))
      console.log("Error in signup", error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // google signup
const googleAuthHanlder = async () => {
  if (!formData.mobile) {
    toast.error("Mobile number is required!");
    return;
  }

  const provider = new GoogleAuthProvider();

  try {
    const resp = await signInWithPopup(auth, provider);
    const user = resp.user;

    const { data } = await AxiosInstance.post("/v1/auth/google-auth", {
      ...formData,
      fullname: user.displayName,
      email: user.email,
      mobile: formData.mobile,
      role: formData.role,
    });

    console.log("data", data);
    toast.success(data.message);
    dispatch(setUserData(data))
    naviaget('/signin')
  } catch (error) {
    console.log("Error in googleAuthHandler", error);
    toast.error(error.response?.data?.message || "Google sign-in failed!");
  }
};


  return (
    <>
      {/* Main container with responsive padding and centering */}
      <div className="min-h-screen bg-gray-300 flex items-center justify-center font-sans px-2 sm:px-4">
        {/* Card container */}
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg border flex flex-col md:flex-row">
          {/* Left image - hidden on small */}
          <div className="hidden md:block md:w-1/2 bg-yellow-50 rounded-l-xl overflow-hidden">
            <img
              src={signuppic}
              alt="Person smiling on a couch"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right form section */}
          <div className="w-full md:w-1/2 flex justify-center flex-col items-center p-4 sm:p-6 md:p-10">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center">
              Create an Account
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-yellow-700 py-3 sm:py-4 text-center">
              Signup for exclusive things and fast delivery
            </p>

            <form
              onSubmit={submitHnadler}
              className="w-full max-w-sm flex flex-col items-center gap-3 sm:gap-4 py-3 px-3 sm:px-6 shadow-md sm:shadow-lg shadow-gray-200 rounded-lg"
            >
              {/* Google button */}
              <Button
                onClick={googleAuthHanlder}
                variant="ghost"
                className="cursor-pointer text-xs sm:text-sm w-full border flex items-center justify-center gap-2"
              >
                <FcGoogle />
                Sign in with Google
              </Button>

              {/* Inputs */}
              <div className="w-full space-y-3 sm:space-y-4">
                <div className="space-y-1 sm:space-y-2">
                  <Label className="block text-xs sm:text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    placeholder="Full Name"
                    className="w-full text-sm"
                    onChange={onChangeHanlder}
                    required
                  />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label className="block text-xs sm:text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={formData.email}
                    name="email"
                    placeholder="youraccount@gmail.com"
                    className="w-full text-sm"
                    onChange={onChangeHanlder}
                    required
                  />
                </div>

                <div className="w-full space-y-1 sm:space-y-2 relative">
                  <Label className="block text-xs sm:text-sm">Password</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    name="password"
                    placeholder="********"
                    className="text-sm w-full"
                    onChange={onChangeHanlder}
                  />
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-5 right-0 text-gray-400 cursor-pointer"
                    variant="ghost"
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </Button>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label className="block text-xs sm:text-sm font-medium">
                    Mobile
                  </Label>
                  <Input
                    type="tel"
                    value={formData.mobile}
                    name="mobile"
                    placeholder="+91 1234567891"
                    className="w-full text-sm"
                    onChange={onChangeHanlder}
                    required
                  />
                </div>
              </div>

              {/* Role selection */}
              <div className="w-full flex flex-wrap justify-between items-center py-2 gap-2">
                <Label className="text-xs sm:text-xs font-medium">
                  I am a:
                </Label>
                <div className="flex flex-wrap items-center gap-1">
                  {roles.map((r, idx) => (
                    <Button
                      type="button"
                      name="role"
                      variant="ghost"
                      className={`cursor-pointer text-xs sm:text-sm font-semibold border ${
                        formData.role === r
                          ? "bg-yellow-100 text-yellow-800 border-yellow-800"
                          : ""
                      }`}
                      key={idx}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, role: r }))
                      }
                    >
                      {r}
                    </Button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full mt-3 sm:mt-4 text-sm">
                {loading ? <><Loader2 className="size-5 animate-spin transition-all duration-200 " />Loading...</> : "Sign Up"}
              </Button>

              <div className="flex justify-center items-center gap-1 mt-2 text-center">
                <p className="text-xs">Already have an account?</p>
                <Link
                  className="text-xs underline text-blue-600 font-semibold"
                  to={"/signin"}
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

export default SignUp;
