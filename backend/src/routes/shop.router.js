import { Router } from "express";
import { createShopAndEditShop, getShop, getShopByCity } from "../controllers/shop.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();


router.route('/create-edit').post(isAuth ,upload.single('shopImage'),createShopAndEditShop);
router.route('/get-shop').get(isAuth,getShop);
router.route('/get-by-city/:city').get(isAuth,getShopByCity);


export default router;