
const mongoose = require('mongoose')
const Apartment = require('../models/Apartment')
const citySchema = mongoose.Schema({
    // עיר:  שם עיר, מערך דירות
   cityName:{
    type:String,
    require:true
},
   apartments:[{
    type: mongoose.Types.ObjectId,
    ref:'Apartment'
}]
})

module.exports = mongoose.model('City', citySchema)