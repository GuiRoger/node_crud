import {Request,Response} from 'express';
import { ProductRepository } from "../repositories/product.repository";
import { z } from 'zod';


   const create =  async (req:Request,res:Response):Promise<Response> =>{
    const createProductSchema = z.object({
      name: z.string(),
      description: z.string(),
      price:z.number(),
      active: z.boolean().optional()
    });

    const product = createProductSchema.safeParse(req.body)
    console.log(product)
    if(!product.success){
      return res.status(400).json({
        success:false,
        message: "Error creating product",
        product:null
      })
    }
    const existingProduct = await ProductRepository.getByName(req.body.name);
    if(existingProduct){
      return res.status(500).json({
        message: "Product already exists",
        success:false,
        product:existingProduct
      });
    }
    const productCreated = await ProductRepository.create(req);

    return res.status(201).json({
      success:true,
      message:"Product created successfully",
      product: productCreated
    });
  }



  export const ProductService ={
    create: create
  }