const client = require('../utils/redisConfig');
let cache = async (req, res, next)=>{
    await client.connect();
    let data;
    if (req.params.id) {
         data = await client.get(`product-${req.params.id}`)
    } else {
         data = await client.get(`products`)
    }
        if (data) {
            await client.disconnect();
            const products = JSON.parse(data);
             res.status(200).json({
                status: "success",
                result: products.length || 1,
                data: products
            }) 
        } else {
            console.log("next to controller")
            next()
        }
}
module.exports = cache;