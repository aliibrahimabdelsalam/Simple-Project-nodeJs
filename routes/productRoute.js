const router = require('express').Router();
const upload = require('../middleware/malter');
const cache = require('../middleware/cache');
const { getProducts, getProduct, postProduct, updateProduct, deleteProduct ,getProductByCategory} = require('../controllers/productController')
router.route('/').get(cache,getProducts).post(upload.single('media'),postProduct);
router.route('/:id').get(cache,getProduct).put(updateProduct).delete(deleteProduct);
router.route('/category/:categoryName').get(getProductByCategory);
module.exports = router;