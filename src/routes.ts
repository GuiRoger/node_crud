import { Router } from "express";

import { productRoutes } from "./routes/product.route";
import { categoryRoutes } from "./routes/category.route";
import { prodCategoryRoutes } from "./routes/productCategory.route";

const router = Router();


router.use("/product",productRoutes);

router.use("/category",categoryRoutes);

router.use("/productCategory",prodCategoryRoutes);

export { router };
