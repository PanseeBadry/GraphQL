
import mongoose from "mongoose";



const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:[3,"title is too short"],
        trim:true,
        unique:true
    },
    slug:{
        type:String,
        // required:true,
        lowercase:true
    },
    discription:{
        type:String,
        minLength:[3,'description is too short'],
        maxLength:[300,'description is too long'],
    },
    price:{
        type:Number,
        min:0,
        // required:true,
    },
    priceAfterDiscount:{
        type:Number,
        min:0,
        // required:true,
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    },
    subCategory:{
        type:mongoose.Types.ObjectId,
        ref:'subCategory'
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:'brand'
    },
    imageCover:String,
    images:[String],
    sold:{
        type:Number,
        required:true,
        default:0
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    rateCount:Number,
    rateAvg:{
        type:Number,
        min:0,
        max:5,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }

},{timestamps:true})



export const productModel = mongoose.model('product',productSchema)