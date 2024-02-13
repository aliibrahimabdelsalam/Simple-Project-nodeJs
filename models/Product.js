const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    media: {
        type: String,
        required:true
    },category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select:false
    },
    
},
    {
        toJSON: { virtuals:true},
        toObject: { virtuals: true }
    }
);
// productSchema.pre("save", function (next) {
// }

// productSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'category',
//         select:'title'
//     })
//     next();
// })
const Product = mongoose.model('Product', productSchema);

module.exports=Product
