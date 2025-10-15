import {Router} from 'express';
import { addProducts, deleteProduct, editProduct, getItemById } from '../controllers/product.controller.js';
import {isAuth} from '../middlewares/isAuth.js'
import {upload } from '../middlewares/multer.middleware.js'

const router = Router();

router.route('/add-product').post(isAuth ,upload.single('productImage') ,addProducts)
router.route('/get-product/:getId').get(isAuth  ,getItemById)
router.route('/edit-product/:getId').put(isAuth ,upload.single('productImage') ,editProduct)
router.route('/delete-product/:productId').delete(isAuth , deleteProduct)

export default router;