import { Router } from "express";

import { productRoutes } from "./routes/product.route";
import { categoryRoutes } from "./routes/category.route";

const router = Router();


router.use("/product",productRoutes);

router.use("/category",categoryRoutes);

export { router };
