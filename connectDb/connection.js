const mongoose = require('mongoose');

let connect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/projectAnglar')
        .then(() => console.log('Connected!')).catch(err => console.log("error"));
}
  module.exports=connect