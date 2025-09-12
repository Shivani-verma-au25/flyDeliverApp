import { Router } from "express";
import { createShopAndEditShop } from "../controllers/shop.controller";
import { isAuth } from "../middlewares/isAuth";
import { upload } from "../middlewares/multer.middleware";
const router = Router();


router.route('/create-edit').post(isAuth , upload.single('shopImage') ,createShopAndEditShop);


export default router;