import {Request,Response} from 'express';
import { CategoryRepository } from "../repositories/category.repository";



   const create =  async (req:Request,res:Response):Promise<Response> =>{


    const categoryCreated = await CategoryRepository.create(req);

    return res.json(categoryCreated);
  }

  const getById = async (req:Request,res:Response):Promise<Response> => {
    const {category_id} = req.params

    if(!category_id){
      res.status(400)
      res.json({
        message:"Invalid id category."
      });
      return res;
    } 
    var category = await CategoryRepository.getById(category_id);
    if(!category){
      res.status(404);
      res.json({
        message:"No category found with this id.",
        success:false,
        category
      });

      return res;
    }

    return res.json({
      message:"Category successfully found.",
      success:true,
      category
    });    
  }

  const getAll = async(res:Response):Promise<Response>=>{
    const categories  = await CategoryRepository.getAll();

    res.status(200);
    return res.json({
      message:"All categories successfully",
      success:true,
      categories
    });
  }

  const edit = async(req:Request,res:Response):Promise<Response>=>{
    const { id,description} = req.body
    const category  = await CategoryRepository.getById(id);

    if(!category){
      
      return res.status(404).json({ 
        message: "Category not found",
        success:false,
        category
      });
    }

    const updatedCategory = await CategoryRepository.edit({id,description});



    return res.json({
      message:"Category updated",
      success:true,
      category:updatedCategory
    });
  }

  const deleteCategory = async(req:Request,res:Response):Promise<Response>=>{

    const { category_id} = req.params
    const category = await CategoryRepository.getById(category_id);
    if(!category){
      return res.status(404).json({
        message:"Category not found",
        success:false
      });
    }
    
    const success  = await CategoryRepository.deleteCategory(category_id);
    if(!success){
      return res.status(500).json({
        message:"Error deleting category",
        success,
      });
    }


    return res.json({
      message:"Category deleted",
      success,
    });
  }


  export const CategoryService ={
    create,
    getById,
    getAll,
    edit,
    deleteCategory
  }