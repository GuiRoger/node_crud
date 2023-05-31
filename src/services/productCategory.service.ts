import {Request,Response} from 'express'
import {ProductCategoryRepository} from './../repositories/productCategory.repository'
import {ProductRepository} from './../repositories/product.repository'
import {CategoryRepository} from './../repositories/category.repository'


const create = async(req:Request,res:Response): Promise<Response>=>{
  const {product_id,category_id} = req.body;

  const existingProduct = await ProductRepository.getById(product_id);
  if(!existingProduct){
    return res.status(404).json({
      message: 'Product not found with id ' + product_id,
      success:false
    })
  }
  const existingCategory = await CategoryRepository.getById(category_id);
  if(!existingCategory){
    return res.status(404).json({
      message: 'Category not found with id ' + category_id,
      success:false
    })
  }

  const linkedSuccessfully =  await ProductCategoryRepository.linkProductCategory({product_id,category_id})

  if(!linkedSuccessfully){
    return  res.status(500).json({
      message:"Error linked to product category",
      success:false
    })
  }

  return  res.status(201).json({
    message:"Linked successfully product and category",
    success:false
  })
}



export const ProductCategoryService = {
  create
}