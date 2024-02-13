const Product = require('../models/Product');
const uploadImage=require('../utils/uploadImages')
const ApiFeatures = require("../utils/apiFeatures");
let getProducts = async (req, res, next) => {
    try {
        const features = new ApiFeatures(Product.find(), req.query).filter().sort().limitFields().paginate();
       
        const products = await features.query;
        res.status(200).json({
            status: "success",
            result:products.length,
            data:products
            })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
let getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
         res.status(200).json({
                status: "success",
                data: product
            })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
let postProduct = async (req, res, next) => {
    try {
        let uploadRes = await uploadImage(req.file.path)
        const { title, price, category } = req.body;
        if (uploadRes) {
                const product = await Product.create({ title, price, image: uploadRes.url, category });  
                res.status(201).json({
                    status: "success",
                    data: product
                })
            }
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

let deleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: "Product Delete"
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
let updateProduct = async (req, res, next) => {
    try {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
        res.status(200).json({
            status: "success",
            data: product
        })
    } catch (err) {
            res.status(500).json({ message: err.message });
    }
}


module.exports = {
    getProducts,getProduct,postProduct,updateProduct,deleteProduct
}