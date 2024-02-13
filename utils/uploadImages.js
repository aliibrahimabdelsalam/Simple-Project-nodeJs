const cloudinary=require('../utils/cloudinary');
const fs = require('fs')
let uploadImage = async(imagePath) => {
    if (imagePath) {
            let uploadRes = await cloudinary.uploader.upload(imagePath, {
                folder: "samples",
                use_filename: true,
            });
            if (uploadRes) {
                fs.unlinkSync(imagePath)
                return uploadRes;
        }        
    }
    return false;
}
module.exports=uploadImage