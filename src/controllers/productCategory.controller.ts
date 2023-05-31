import {Request, Response } from 'express';
import { ProductCategoryService } from '../services/productCategory.service';

export class ProductCategoryController{
  public async create(request:Request,response:Response){
    return await ProductCategoryService.create(request,response);
  }
}


