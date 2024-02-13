const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    title: {
        require: true,
        type:String
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
categorySchema.virtual('products', {
    ref: 'Product',
    foreignField: 'category',
   localField:'_id'
})
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;