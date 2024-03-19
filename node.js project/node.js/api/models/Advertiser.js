const mongoose = require('mongoose')
const Apartment = require('./Apartment')

const advertiserSchema = mongoose.Schema({
  name:{
    type:String,
    require:false
     },
    
    // מפרסם:  אימייל - ייחודי, סיסמה, טלפון, טלפון נוסף – לא חובה, מערך דירות
   email:{
    type:String,
   },
   password:String,
   phone:String,
   additionalPhone:{
    type:String,
    require:false
     },
   apartments:[{
    type: mongoose.Types.ObjectId,
    ref: 'Apartment'
}]
})

module.exports = mongoose.model('Advertiser', advertiserSchema)