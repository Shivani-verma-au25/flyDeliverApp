import {Router} from 'express'
import { googleAuth, resetPassword, sendOpt, signinUser, signOutUser, signupUser, verifyOtp } from '../controllers/auth.controller.js'

const router = Router()


// Define auth routers here

router.route('/signup').post(signupUser)
router.route('/signin').post(signinUser)
router.route('/signout').post(signOutUser)
router.route('/send-otp').post(sendOpt)
router.route('/verify-otp').post(verifyOtp)
router.route('/reset-password').post(resetPassword)
router.route('/google-auth').post(googleAuth)


router.route("/check").get((req,res) => {
    return res.status(200).json({
        success : true,
        message : "Authe route is working"
    })
})


export default router