import { Router } from 'express'
import { ProductController } from '../controllers/product.controller';


const controller =  new ProductController();
const productRoutes = Router();

productRoutes.post("/",controller.create);
productRoutes.get("/:product_id",controller.getById);
productRoutes.patch("/",controller.edit);
productRoutes.delete("/",controller.delete);
productRoutes.get("/",controller.getAll);

export {productRoutes} ;

