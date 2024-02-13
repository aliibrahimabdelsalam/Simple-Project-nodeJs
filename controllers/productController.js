const Product = require('../models/Product');
const Category = require('../models/Category');
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
let getProductByCategory = async (req, res, next) => {
    try {
        // console.log(req.params.categoryName + "sdsd");
        const categoryName = req.params.categoryName;
        console.log(categoryName)
        const category = await Category.findOne({ title: categoryName });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        console.log(category)
        const products = await Product.find({ category: category._id });
        res.status(200).json({
            status: 'success',
            result: products.length,
            data: products,
        });
    } catch(err) {
        res.status(500).json({ message: err.message });
        
    }
}
let postProduct = async (req, res, next) => {
    try {
        let uploadRes = await uploadImage(req.file.path)
        const { title, price, quantity, description, category } = req.body;
        const categoryObj = await Category.findOne({ title: category });
        if (uploadRes) {
                const product = await Product.create({ title, price,description, media: uploadRes.url, category:categoryObj.id });  
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
    getProducts,getProduct,postProduct,updateProduct,deleteProduct,getProductByCategory
}