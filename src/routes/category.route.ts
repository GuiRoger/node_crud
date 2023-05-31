import { Router } from 'express'
import { CategoryController } from '../controllers/category.controller';


const controller =  new CategoryController();
const categoryRoutes = Router();

categoryRoutes.post("/",controller.create);
categoryRoutes.get("/:category_id",controller.getById);
categoryRoutes.get("/",controller.getAll);
categoryRoutes.patch("/",controller.edit)
categoryRoutes.delete("/:category_id",controller.delete)


export { categoryRoutes } ;

