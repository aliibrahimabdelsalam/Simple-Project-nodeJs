const router = require('express').Router();
const {getCategorys,getCategory,postCategory,updateCategory,deleteCategory } = require('../controllers/categoryController');
router.route('/').get(getCategorys).post(postCategory);
router.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory)
module.exports = router;