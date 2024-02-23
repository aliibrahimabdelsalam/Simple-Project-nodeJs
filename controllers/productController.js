const Product = require('../models/Product');
const Category = require('../models/Category');
const uploadMedia=require('../utils/uploadMedia')
const ApiFeatures = require("../utils/apiFeatures");
const util = require('util');
const client = require('../utils/redisConfig');
// client.set = util.promisify(client.set);
let getProducts = async (req, res, next) => {
    try {
            const features = new ApiFeatures(Product.find(), req.query).filter().sort().limitFields().paginate();
            const products = await features.query;
            await client.set('products', JSON.stringify(products));
            await client.disconnect();
                return res.status(200).json({
                status: "success",
                result: products.length,
                data: products
            })
        // }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
let getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
            await client.set(`product-${req.params.id}`, JSON.stringify(product));
            await client.disconnect();

         res.status(200).json({
             status: "success",
             result:product.length,
                data: product
            })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
let getProductByCategory = async (req, res, next) => {
    try {
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
        // console.log(req.file.path, "dsdhsgds");
        
        let uploadRes = await uploadMedia(req.file.path)
        console.log(req.body.category,"1")
        const { title, price, quantity, description, category } = req.body;
        
        const values = { title, price, quantity, description, category, uploadRes };
        
    await client.connect();
        
         await client.del('products');
        // console.log("response ", response);
            await client.disconnect();
        
        console.log("5")
        
        if (uploadRes) {
        console.log("6")

                const product = await Product.create({ title, price,description, quantity,media: uploadRes.secure_url, category });  
                res.status(201).json({
                    status: "success",
                    data: product
                })
            }
        
    } catch (err) {
        next(err)
        res.status(500).json({ message: err.message });
        
    }
}

let deleteProduct = async (req, res, next) => {
    try {

        await Product.findByIdAndDelete(req.params.id);
        await client.connect();
        
         await client.del([`product-${req.params.id}`,'products']);
            await client.disconnect();
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
        await client.connect();
        
         await client.del([`product-${req.params.id}`,'products']);
            await client.disconnect();
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