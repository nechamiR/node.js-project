const mongoose = require('mongoose')

const  apartmentSchema = mongoose.Schema({
    // דירה:  שם – לא חובה, תיאור, תמונה, קוד קטגוריה, קוד עיר, כתובת, מס' מיטות, תוספים, מחיר, קוד מפרסם
    name: {
        type: String,     
        require: false,
    },
    description:String,
    image: String,
    categoryId:{
        type:mongoose.Types.ObjectId,
        ref:'Category'
    },
    cityId:{ type:mongoose.Types.ObjectId,
        ref:'City'
    },
    adress:String,
    numberOfBeds:Number,
    additives:String,
    price:Number,
    advertiserId:{ type:mongoose.Types.ObjectId,
        ref:'Advertiser'
    },
})

module.exports = mongoose.model('Apartment', apartmentSchema)