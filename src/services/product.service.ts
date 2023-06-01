import {Request,Response} from 'express';
import { ProductRepository } from "../repositories/product.repository";
import { ProductCategoryRepository } from "../repositories/productCategory.repository";
import { CategoryRepository } from "../repositories/category.repository";
import { z } from 'zod';


   const create =  async (req:Request,res:Response):Promise<Response> =>{
    const createProductSchema = z.object({
      name: z.string(),
      description: z.string(),
      price:z.number(),
      active: z.boolean().optional(),
      category_id:z.string()
    });

    const product = createProductSchema.safeParse(req.body)
    
    if(!product.success){
      return res.status(400).json({
        success:false,
        message: "Error creating product",
        product:null
      })
    }
    const existingCategory = await CategoryRepository.getById(product.data.category_id);
    if(!existingCategory){
      return res.status(500).json({
        message:"No category found with this id",
        success:false,
        product:null
      });
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


    const linkProductCategory = await ProductCategoryRepository.linkProductCategory({product_id:productCreated.id , category_id: product.data.category_id})

    return res.status(201).json({
      success:true,
      message: linkProductCategory ? "Product created successfully":"Product created successfully, but it was not possible to link with the indicated category",
      product: productCreated
    });
  }
  const getById = async (req:Request,res:Response):Promise<Response> =>{
    const { product_id } = req.params;
    if(!product_id){
      return res.status(400).json({
        message: "Id not specified",
        success:false,
        product:null
      })
    }

    const product = await ProductRepository.getById(product_id);
    return res.status(200).json({
      message:"Product found successfully",
      success:true,
      product
    });
  }
  const edit = async (req:Request,res:Response):Promise<Response>=>{
    const updateProductSchema  = z.object({
      id: z.string(),
      price: z.number().optional(),
      name: z.string().optional(),
      description: z.string().optional(),
      active: z.boolean().optional()
    }); 

    const result = await updateProductSchema.safeParseAsync(req.body);
    if(!result.success){
      return res.status(404).json({
          message:"Product body is not valid",
          success:false,
          product:null
      });
    }

    const existingProduct = await ProductRepository.getById(req.body.id)
    if(!existingProduct){
      return res.status(400).json({
        message:"Product not found",  
        success:false,
        product:null
      });
    }

    const updatedProduct = await ProductRepository.edit(req.body);
    return res.status(200).json({
      message:"Product updated successfully",
      success:true,
      product:updatedProduct
    });
  }

  const deleteProd = async (req:Request,res:Response):Promise<Response> =>{
    const {id} = req.body;
    if(!id){
      return res.status(400).json({
        message:"Bad Request",
        success:false
      })
    }
    const existingProduct = await ProductRepository.getById(id);
    if(!existingProduct){
      return res.status(404).json({
        message:"Product not found",
        success:false
      })
    }
    const result = await ProductRepository.delete(id);
    if(!result){
      return res.status(500).json({
        message:"Internal Server error",
        success:false
      });
    }
    
    return res.status(200).json({
      message:"Product deleted successfully",
      success:true
    })
  }



  export const ProductService ={
    create,
    getById,
    edit,
    delete:deleteProd
  }