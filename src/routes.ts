import { Router } from "express";

import { productRoutes } from "./routes/product.route";
import { categoryRoutes } from "./routes/category.route";

const router = Router();


router.use("/product",productRoutes);

router.use("/category",categoryRoutes);
router.use("/terms",(req,res)=>{
  return res.json({
    message:"Terms and Conditions"
  });
})

export { router };
