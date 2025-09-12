import { Router } from "express";
import { createShopAndEditShop, getShop } from "../controllers/shop.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();


router.route('/create-edit').post(isAuth , upload.single('shopImage') ,createShopAndEditShop);
router.route('/get-shop').get(isAuth,getShop);


export default router;