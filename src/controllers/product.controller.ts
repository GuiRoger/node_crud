import  { Request, Response } from 'express';
import { ProductService } from '../services/product.service';


export class ProductController{ 
  public async create(request:Request,response:Response){
    return await ProductService.create(request,response);
  }

  public async getById (){

  }
}
