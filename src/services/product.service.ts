import {Request,Response} from 'express';
import { ProductRepository } from "../repositories/product.repository";



   const create =  async (req:Request,res:Response):Promise<Response> =>{

    const productCreated = await ProductRepository.create(req);

    return res.json(productCreated);
  }



  export const ProductService ={
    create: create
  }