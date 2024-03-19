const mongoose = require('mongoose')
const Apartment = require('./Apartment')

const categorySchema = mongoose.Schema({
    // קטגוריה: שם קטגוריה (צימר, יחידת אירוח, דירה להשכרה...), מערך דירות
 nameCategory:{type:String},
apartments:[{
    type: mongoose.Types.ObjectId,
    ref: 'Apartment'
}]
})

module.exports = mongoose.model('Category', categorySchema)