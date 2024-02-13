const multer = require('multer')
const fs = require("fs"); 

if (!fs.existsSync("./images")) { 
    fs.mkdirSync("./images"); 
} 
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
        cb(null, "./images"); 
    }, 
    filename: function (req, file, cb) { 
        cb(null, new Date().toISOString().replace(/:/g,".")+file.originalname); 
    }, 
}); 
var upload = multer({ storage: storage }); 
module.exports = upload;