const mongoose =require('mongoose');
const { type } = require('os');

const productSchema = new mongoose.Schema({

    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        typr:Number
    },
    image:{
      type:String
    },
    countInstock:{
        type:String
    }

});

module.exports = mongoose.model('Product',productSchema);