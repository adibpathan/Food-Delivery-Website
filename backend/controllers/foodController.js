import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food
const addFood = async(req, res)=>{
    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save()
        res.status(201).json({
            success: true,
            message: "Food Added"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.stack
        })
    }
}


//list of all foods
const listFood = async(req, res)=>{
    try {
        const foods = await foodModel.find()
        res.status(200).json({
            success: true,
            data: foods
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.stack
        })
    }
}


//remove foods 
const removeFood = async(req, res)=>{
    try {

        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id)
        
        res.status(200).json({
            success: true,
            message: "food Deleted"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.stack
        })
    }
}

export {addFood, listFood, removeFood}