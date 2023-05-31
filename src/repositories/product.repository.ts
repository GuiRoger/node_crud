
import {Request} from 'express';
import { prismaClient } from './../database/prismaClient'
import { Product } from '@prisma/client';



  const  create = async(req : Request):Promise<Product> =>{
    const {name,description,price} = req.body;

    const product = await prismaClient.product.create({
      data:{
        description,
        name, 
        price
      }
    })    

    return product;
  }


  export const ProductRepository ={
    create: create
  }
