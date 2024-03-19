const mongoose=require ('mongoose')
const clientscema=mongoose.Schema({
    // לקוח: אימייל - ייחודי, סיסמה
    email:{
    type:String,
    unique:true
    } ,
    password:String,
})
module.exports=mongoose.model('Client',clientscema)

