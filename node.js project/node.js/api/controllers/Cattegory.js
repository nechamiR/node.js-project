const Category = require("../models/Category")
const Advertiser = require("../models/Advertiser")
const dotenv = require('dotenv')
const jwt = require("jsonwebtoken")

dotenv.config()
module.exports = {
    getAll: (req, res) => {
        Category.find()
            .then((list) => {
                res.status(200).send({ category: list })
            })
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    },
    create: async (req, res) => {
        try {

            // בדיקה האם המפרסם קיים במסד הנתונים
            const advertiser = Advertiser.findById(adverId)



            // שמירת הדירה במסד הנתונים
            const savedApartment = await apartment.save()



            // יצירת טוקן ושליחת תשובה ללקוח
            const token = jwt.sign({ name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId }, process.env.SECRET)
            res.status(200).send({ message: `Apartment ${savedApartment._id} created successfully!` })
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    },

    // הוספת אובייקט חדש
    create: (req, res) => {
        try {
            const { apartments, nameCategory } = req.body
            const advertiserId = req.params.advertiserId
            // בדיקה האם המפרסם קיים במסד הנתונים
            const advertiser = Advertiser.findById(advertiserId)
            if (!advertiser) {
                return res.status(404).send("You are not a valid advertiser")
            }
            console.log(nameCategory);

            const category = new Category({
                nameCategory,
                apartments
            })
            console.log(category);

            category.save()
            // בהצלחה מתקבל האובייקט החדש שנוצר (עם הקוד שלו)
            const token = jwt.sign({ apartments, nameCategory }, process.env.SECRET)
            res.status(200).send({ message: `create category ${category._id} succeed!` })
        }
        catch (error) {
            res.status(500).send({ error: error.message })

        }
    },
}