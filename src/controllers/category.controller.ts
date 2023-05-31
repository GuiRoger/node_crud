import  { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';
import { CategoryService } from '../services/category.service';



export class CategoryController{
  public async create(request:Request, response:Response){      
      return await CategoryService.create(request,response);
  }
  public async edit(request:Request, response:Response){
    return await CategoryService.edit(request,response);
  }
  public async delete(request:Request, response:Response){
    return await CategoryService.deleteCategory(request,response);
  }

  public async getById(request:Request, response:Response){
    return await CategoryService.getById(request,response);
  }

  public async getAll(request:Request, response:Response){
    return await CategoryService.getAll(response);
  }


}