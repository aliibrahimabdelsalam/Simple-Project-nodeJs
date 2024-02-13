const cloudinary=require('./cloudinary');
const fs = require('fs')
let uploadMedia = async(mediaPath) => {
    if (mediaPath) {
            let uploadRes = await cloudinary.uploader.upload(mediaPath, {
                folder: "samples",
                use_filename: true,
                resource_type: "auto" 
            });
            if (uploadRes) {
                fs.unlinkSync(imagePath)
                return uploadRes;
        }        
    }
    return false;
}
module.exports=uploadMedia