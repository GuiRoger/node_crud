
import {Request} from 'express';
import { prismaClient } from './../database/prismaClient'
import { Product } from '@prisma/client';



  const  create = async(req:Request):Promise<Product> =>{
    const {description,name,price} = req.body;

    const product = await prismaClient.product.create({
      data:{
        description,
        name, 
        price
      }
    })    

    return product;
  }

  const getByName = async(name:string):Promise<Product> =>{
   
    const product = await prismaClient.product.findUnique({
      where:{
        name
      }
    });   

    return product;
  }

  const getById = async(id:string):Promise<Product> =>{
      return await prismaClient.product.findUnique({
        where:{
          id
        }
      });
  }

  const edit = async({id,name,description,price,active}):Promise<Product> =>{
    return await prismaClient.product.update({
      where:{
        id
      },
      data:{
        name,
        description,
        price,
        active
      }
    });
  }
  const deleteProduct = async(id:string):Promise<boolean> =>{
    try{
       await prismaClient.product.delete({
        where:{
          id
        }
      });
      
        return true;  
    } catch(err){
      return false;
    }
    
  }

  export const ProductRepository ={
    create,
    getByName,
    getById,
    edit,
    delete: deleteProduct
  }
