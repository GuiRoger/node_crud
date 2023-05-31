import {Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class ProductCategoryController{
  public async create(request:Request,response:Response){
    const {product_id,category_id} = request.body;

    const link =  prismaClient.productCategory.create({
      data:{
        product_id,
        category_id
      }
    });

    return response.json(link);
  }
}


