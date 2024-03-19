const City = require("../models/City")
const dotenv = require('dotenv')
const Advertiser = require("../models/Advertiser")
dotenv.config()
module.exports = {
    getAll: (req, res) => {
        City.find()
            .then((list) => {
                res.status(200).send({ city: list })
            })
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    },
   

    // הוספת אובייקט חדש
    create: (req, res) => {
        const { cityName,apartments  } = req.body  
        console.log(req.body);
        const city = new City({
                cityName,
                apartments
            })
            console.log(city);
       
            return city.save()
                // בהצלחה מתקבל האובייקט החדש שנוצר (עם הקוד שלו)
                .then((city) => {
                    res.status(200).send({ message: `create city ${city._id} succeed!` })
                })
                .catch((err) => {
                    res.status(404).send({ error: err.message })
                })

    },
    

   
    getAllWeathersById: (req, res) => {
        User.findById(req.params.id)
            .populate({ path: 'weathers', select: 'city weather description temp temp_min temp_max' })
            .then((user) => {
                res.status(200).send(user.weathers)
            })
            .catch((error) => {
                res.status(400).send(error.message)
            })
    }
}