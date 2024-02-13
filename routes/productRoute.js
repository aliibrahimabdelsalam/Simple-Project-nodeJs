const router = require('express').Router();
const upload = require('../middleware/malter');

const { getProducts, getProduct, postProduct, updateProduct, deleteProduct } = require('../controllers/productController')
router.route('/').get(getProducts).post(upload.single('image'),postProduct);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);
module.exports = router;