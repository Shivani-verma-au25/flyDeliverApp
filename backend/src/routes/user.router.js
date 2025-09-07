import {Router} from 'express'
import { getCurrentUser } from '../controllers/user.controller.js'
import { isAuth } from '../middlewares/isAuth.js'

const router = Router()


router.route('/getcurrent-user').get(isAuth,getCurrentUser)


export default router