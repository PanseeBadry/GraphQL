import { GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString  } from "graphql";

import {  productModel } from "../db/models/product.model.js";
const categoryType = new GraphQLObjectType({
    name:"categoryType",
    fields:{
        id:{type:GraphQLID},
        name:{type:GraphQLString}
    }
})

const productType = new GraphQLObjectType({
    name:"productType",
    fields:{
        _id:{type:GraphQLID},
        title:{type:GraphQLString},
        slug:{type:GraphQLString},
        discription:{type:GraphQLString},
        price:{type:GraphQLFloat},
        priceAfterDiscount:{type:GraphQLFloat},
        category:{
            type:categoryType,
            resolve:(parent)=>{
                return categories.find((item)=>item.id = parent.category)    
            }
        },
        subCategory:{type:GraphQLID},
        brand:{type:GraphQLID},
        imageCover:{type:GraphQLString},
        images:{type: new GraphQLList(GraphQLString)},
       }
})


const rootQuery = new GraphQLObjectType ({
    name:'rootQuery',
    fields:{
        products:{
            type:new GraphQLList(productType),
            resolve:async (parent,args)=>{
                let products = await productModel.find()
                return products
            }
        }

    }
})

const rootMutation = new GraphQLObjectType({
    name:'rootMutation',
    fields:{
        addProduct:{
            type:GraphQLString,
            args:{title:{type:new GraphQLNonNull(GraphQLString)}},
            resolve:async(parent,args)=>{
                await productModel.insertMany(args)
                return "success"
            }
        }
    }
})

export const schema = new GraphQLSchema({
    query:rootQuery,
    mutation:rootMutation

})