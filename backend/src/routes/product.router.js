import {Router} from 'express';
import { addProducts, editProduct } from '../controllers/product.controller';
import {isAuth} from '../middlewares/isAuth.js'
import {upload } from '../middlewares/multer.middleware.js'

const router = Router();


router.route('/add-product').post(isAuth ,upload.single('productImage') ,addProducts)
router.route('/edit-product/:productId').post(isAuth ,upload.single('productImage') ,editProduct)

export default router;