import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendOtpMail } from "../utils/mail.js";

// signup controller

export const signupUser = asyncHandler(async (req, res) => {
  try {
    const { fullname, email, password, mobile, role } = req.body;

    //check if user is already exists
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(400).json({
        success: false,
        message: "User is already exists ",
      });
    }

    if (
      [fullname, email, password, mobile, role].some(
        (field) => field.trim() === ""
      )
    ) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
        // error : error.message
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long !",
        // error : error.message
      });
    }

    // creating user
    const user = await User.create({
      fullname,
      email,
      password,
      mobile,
      role,
    });
    // checking user is created or not
    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
      return res.status(404).json({
        success: false,
        message: "User not not created!",
      });
    }

    // create tokens
    const flyToken = await user.generateJwtToken();
    console.log(flyToken, "generated token");

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
    };

    // if user created successully send response
    return res.status(200).cookie("flyToken", flyToken, options).json({
      success: true,
      message: "User created successfully!",
      createdUser,
    });
  } catch (error) {
    console.log("Error in signup controller ", error);
    res.status(500).json({
      success: false,
      message: "Failed to signup user",
      error: error.message,
    });
  }
});

//signin controller

export const signinUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if ([email, password].some((field) => field.trim() === "")) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check if user is exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found , Invalid login/signiin ",
      });
    }

    // compare password
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials , password does not match!",
      });
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
    };

    //create token
    const flyToken = await user.generateJwtToken();

    return res
      .status(201)
      .cookie("flyToken", flyToken, options)
      .json({
        success: true,
        message: `${user.fullname} signed in successfully!`,
        user,
      });
  } catch (error) {
    console.log("Error in signin crontroller", error);
    res.status(500).json({
      success: false,
      message: "Failed to signin user!",
      error: error.message,
    });
  }
});

// logout controller

export const signOutUser = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("flyToken");
    return res.status(200).json({
      success: true,
      message: "User logged out successfully!",
    });
  } catch (error) {
    console.log("Error in logout controller", error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout user!",
      error: error.message,
    });
  }
});

// opt send controller

export const sendOpt = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found with this email!",
      });
    }

    // genrate opt
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    console.log(otp, "otp genreated");
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // opt valid for minuts
    user.isOtpVerified = false;
    await user.save();
    sendOtpMail(user.email, otp, "Reset Your Password");
    return res.status(200).json({
      success: true,
      message: "OTP sent to your email ,it is valid for 5 minutes only;",
    });
  } catch (error) {
    console.log("Error in send otp controller", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send otp!",
    });
  }
});

// verfy otp controller
export const verifyOtp = asyncHandler(async (req, res) => {
  try {
    const { email, resetOtp } = req.body;
    console.log(email, resetOtp);

    const user = await User.findOne({ email }).select("-password");

    if (!user || user.resetOtp !== resetOtp || user.otpExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP or it has expired!",
      });
    }

    user.isOtpVerified = true;
    // user.resetOtp = null; // optional: clear OTP after verification
    user.otpExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully, you can reset your password now!",
    });
  } catch (error) {
    console.log("Error in verify otp controller", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP!",
    });
  }
});

// reset password controller
export const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body; // ✅ use consistent "password"

    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({
        success: false,
        message: "User not found or OTP not verified!",
      });
    }

    user.password = password; // bcrypt will hash it in pre-save hook
    user.isOtpVerified = false;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully, you can sign in now!",
    });
  } catch (error) {
    console.log("Error in reset password controller", error);
    return res.status(500).json({
      success: false,
      message: "Failed to reset password!",
    });
  }
});

// google auth controller
export const googleAuth = asyncHandler(async (req, res) => {
  try {
    const { fullname, email, mobile } = req.body;
    console.log(req.body);

    // if (
    //   [ email].some(
    //     (field) => !field || String(field).trim() === ""
    //   )
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All required fields must be provided",
    //   });
    // }

    // check if user is already exists
    let user = await User.findOne({ email });
    if (!user) {
      //create new user
      user = await User.create({
        fullname,
        email,
        mobile,
        role: "user",
      });
    }

    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
      return res.status(400).json({
        success: false,
        message: "User not created !",
      });
    }

    // genrate token
    const flyToken = await user.generateJwtToken();
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
    };

    return res.status(201).cookie("flyToken", flyToken, options).json({
      success: true,
      message: `${createdUser.fullname} signed in successfully with google account!`,
      createdUser
    });
  } catch (error) {
    console.log("error in google auth controller", error);
    return res.status(500).json({
      success: false,
      message: "Failed to sigin with google!",
    });
  }
});
