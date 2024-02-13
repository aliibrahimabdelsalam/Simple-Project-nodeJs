const Category = require('../models/Category');

let getCategorys = async (req, res, next) => {
    try {
        const categorys = await Category.find({});
        res.status(200).json({
            status: "success",
            data:categorys
            })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
let getCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id).populate('products');
         res.status(200).json({
                status: "success",
                data: category
            })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
let postCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({
            status: "success",
            data: category
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

let deleteCategory = async (req, res, next) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: "Category Delete"
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
let updateCategory = async (req, res, next) => {
    try {
    let category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
        res.status(200).json({
            status: "success",
            data: category
        })
    } catch (err) {
            res.status(500).json({ message: err.message });
    }
}


module.exports = {
    getCategorys,getCategory,postCategory,updateCategory,deleteCategory
}