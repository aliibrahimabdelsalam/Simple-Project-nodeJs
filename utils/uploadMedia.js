const cloudinary=require('./cloudinary');
const fs = require('fs');

let uploadMedia = async(mediaPath) => {
    // if()
    if (mediaPath) {
      
      // if (isImageFile || isVideoFile) {              
      const uploadRes = await cloudinary.uploader.upload(mediaPath, {
        folder: 'samples',
        use_filename: true,
        resource_type: 'raw'
      });

      if (uploadRes) {
        fs.unlinkSync(mediaPath);

        return uploadRes;
        
        
      }
    console.log("isVissddsfdeoFile");
      
  }
    return false;
}
module.exports=uploadMedia