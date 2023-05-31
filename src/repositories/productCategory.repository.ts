import {prismaClient} from './../database/prismaClient'

  const linkProductCategory = async({product_id,category_id}): Promise<boolean>=>{
    try{
        var link =  await prismaClient.productCategory.create({
          data:{
            category_id,
            product_id
          }
    
        })        
      console.log(link);

      return true;

    }catch(err){
      return false;
    }    
  } 


  export const ProductCategoryRepository ={
    linkProductCategory
  }