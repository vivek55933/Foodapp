import FoodModel  from "../models/foodModel.js";
import fs from 'fs'


// add food item

const addFood = async (req,res) => {

    // Debug: Log what we're receiving
    console.log("Request file:", req.file);
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    // Check if file was uploaded
    if (!req.file) {
        return res.json({success:false,message:"No image file provided"})
    }

    let image_filename = `${req.file.filename}`;
    
    const food = new FoodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
    })
    try {
        await food.save();
        res.json({success:true,message:"FOOD ADDED"})

    } catch(error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addFood}