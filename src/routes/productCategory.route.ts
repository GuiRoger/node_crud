import { Router } from 'express'
import { ProductCategoryController } from '../controllers/productCategory.controller';


const controller =  new ProductCategoryController();
const prodCategoryRoutes = Router();

prodCategoryRoutes.post("/",controller.create);


export { prodCategoryRoutes } ;

