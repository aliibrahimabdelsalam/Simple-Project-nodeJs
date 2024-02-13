const router = require('express').Router();
const upload = require('../middleware/malter');

const { getProducts, getProduct, postProduct, updateProduct, deleteProduct ,getProductByCategory} = require('../controllers/productController')
router.route('/').get(getProducts).post(upload.single('media'),postProduct);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);
router.route('/category/:categoryName').get(getProductByCategory);
module.exports = router;