import  { Request, Response } from 'express';
import { ProductService } from '../services/product.service';


export class ProductController{ 
  public async create(request:Request,response:Response){
    return await ProductService.create(request,response);
  }

  public async getById (request:Request,response:Response){
    return await ProductService.getById(request,response)
  }

  public async edit(request:Request,response:Response){
    return await ProductService.edit(request,response);
  }
  
  public async delete(request:Request,response:Response){
    return await ProductService.delete(request,response);
  }
  
  
}

