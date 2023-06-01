
import {Request} from 'express';
import { prismaClient } from './../database/prismaClient'
import { Category } from '@prisma/client';




  const create = async({description,active}):Promise<Category> =>{  

    const category = await prismaClient.category.create({
      data:{
        description,
        active
      }
    })    

    return category;
  }

  const getById = async(id : string):Promise<Category> =>{
    return await prismaClient.category.findUnique({
      where:{
        id
      },
      include:{
        ProductCategory:{
          select:{
            product_id:true
          }
        }
      } 
  });     
  }

  
  const getAll = async():Promise<Category[]> =>{
    return await prismaClient.category.findMany();
  }

  const edit = async({id,description}):Promise<Category> =>{    
    const updatedCategory  = await prismaClient.category.update({
      where:{
        id
      },
      data:{
        description
      }
    })

    return updatedCategory;
  }

  const deleteCategory = async(id:string):Promise<boolean> =>{
    try{
      const linkId = await prismaClient.productCategory.findFirst({
        where:{
         category_id:id 
        }
      });
      
      await prismaClient.productCategory.delete({
        where:{
          id:linkId.id
        }
      });     
      

      await prismaClient.category.delete({
          where:{
            id
          }
        });
        
        return true;  
    } catch(err){
      return false;
    }
  }


  export const CategoryRepository ={
     create,
     getById,
     getAll,
     edit,
     deleteCategory
  }
