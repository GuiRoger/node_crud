import { Router } from 'express'
import { ProductController } from '../controllers/product.controller';


const controller =  new ProductController();
const productRoutes = Router();

productRoutes.post("/",controller.create);

export {productRoutes} ;

