const { log, error } = require("console")
const Category = require("../models/Category")
const Apartment = require("../models/Apartment")
const City = require("../models/City")
const Advertiser= require("../models/Advertiser")
const Client = require("../models/Client")
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    //שליפה של הכל
    getAll: (req, res) => {
        Apartment.find()
            .then((apartments) => {
                
                res.status(200).send({ apartments })
            })
            .catch((err) => {
                res.status(404).send({ error: err.massage })
            })
    },
    // שליפה לפי קוד 
    getById: (req, res) => {
        Apartment.findById(req.params.id)
            .populate({ path: 'categoryId cityId advertiserId', select: 'nameCategory cityName email phone additionalPhone' })
            .then((apartments) => {
                const { name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId } = req.body
                const token = jwt.sign({ name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId }, process.env.SECRET)

                res.status(200).send({ apartments,token })
            })
            .catch((error) => {
                res.status(404).send({ error: error.massage })
            })

    },

    //שליפה לפי קוד קטגוריה
    getByCategoryId: (req, res) => {
        const { name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId } = req.body

        const token = jwt.sign({ name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId }, process.env.SECRET)
        const _id = req.params.id
        Category.findById(_id).populate('apartments')

            .then((apartmenpt) => {
                res.status(200).send({ apartmenpt, token })
            })
            .catch((err) => {
                res.status(404).send({ message: `apartmenpt not found!` })
            })
    },
    //שליפה לפי קוד עיר
    getByCityId: (req, res) => {

        const { name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId } = req.body
        const token = jwt.sign({ name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId }, process.env.SECRET)
        const _id = req.params.id

        City.findById(_id).populate('apartments')

            .then((apartmenpt) => {
                res.status(200).send({ apartmenpt, token })
            })
            .catch((err) => {
                res.status(404).send({ message: `apartmenpt not found!` })
            })
    },
    //שליפת דירות לפי כמות מיטות
    getByNumBedsBigFrom: (req, res) => {
        const num = req.params.numberOfBeds

        Apartment.find()
            .where("numberOfBeds").gt(num)
            .then((x) => {
                const { name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId } = req.body
                const token = jwt.sign({ name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId }, process.env.SECRET)
                res.status(200).send({ x })
            })
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    },
    getByNumBedsSmallFrom: (req, res) => {
        const num = req.params.numberOfBeds

        Apartment.find()
            .where("numberOfBeds").lt(num)
            .then((x) => {
                const { name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId } = req.body
                const token = jwt.sign({ name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId }, process.env.SECRET)
                res.status(200).send({ x })
            })
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    },
    getByNumBedsEqual: (req, res) => {

        const num = req.params.numberOfBeds
        Apartment.find()
            .where("numberOfBeds").eq(num)
            .then((x) => {
                const { name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId } = req.body
                const token = jwt.sign({ name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId }, process.env.SECRET)
                res.status(200).send({ x })
            })
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    },
    //שליפת דירות לפי מחיר
    getByPriceBigFrom: (req, res) => {
        const price = req.params.num
        Apartment.find()
            .where("price").gt(price)
            .then((x) => {
                const { name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId } = req.body
                const token = jwt.sign({ name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId }, process.env.SECRET)
                res.status(200).send({ x })
            })
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    },
    getByPriceSmallFrom: (req, res) => {
        const price = req.params.num

        Apartment.find()

            .where("price").lt(price)
            .then((x) => {
                const { name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId } = req.body
                const token = jwt.sign({ name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId }, process.env.SECRET)
                res.status(200).send({ x })
            })
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    },
    //שליפת דירות ע"י קוד מפרסם

    getByAdvertiserId: (req, res) => {
        Advertiser.findById({ _id: req.params.id }).populate({ path: 'apartments', select: 'name description image categoryId cityId adress numberOfBeds additive price' })
            .then(advertiser => {
                if (!advertiser) {
                    return res.status(404).json({ message: `Advertiser not found!` })
                }
                const { name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId } = advertiser;

               const token = jwt.sign({ name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId }, process.env.SECRET);

               res.status(200).json({ apartments: advertiser.apartments, token });
            })
            .catch(() => {
               return res.status(404).json({ message: `error!` })
            })
    },
    create: async (req, res) => {
        try {
            const { path: image } = req.file
            const { name, description, categoryId, cityId, adress, numberOfBeds, additives, price,advertiserId} = req.body
            const adverId = req.params.advertiserId
            
            // בדיקה האם המפרסם קיים במסד הנתונים
            const advertiser =  Advertiser.findById(adverId)
            if (!advertiser) {
                return res.status(404).send("You are not a valid advertiser")
            }
    
            // יצירת הדירה
            const apartment = new Apartment({
                name,
                description,
                image: image.replace('\\', '/'),
                categoryId,
                cityId,
                adress,
                numberOfBeds,
                additives,
                price,
                advertiserId: adverId
            })
    
            // שמירת הדירה במסד הנתונים
            const savedApartment = await apartment.save()
    
            // הוספת הדירה למערך הדירות בקטגוריה, העיר והמפרסם
            await Category.findByIdAndUpdate(categoryId, { $push: { apartments: savedApartment._id } })
            await City.findByIdAndUpdate(cityId, { $push: { apartments: savedApartment._id } })
            await Advertiser.findByIdAndUpdate(adverId, { $push: { apartments: savedApartment._id } })
    
            // יצירת טוקן ושליחת תשובה ללקוח
            const token = jwt.sign({ name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId }, process.env.SECRET)
            res.status(200).send({ message: `Apartment ${savedApartment._id} created successfully!` })
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    },
    

    update: (req, res) => {
        const _id = req.params.id
        Apartment.findById(_id)
            .then((apartment) => {
                const { categoryId, advertiserId, cityId } = req.body
                const { name, description, adress, numberOfBeds, additives, price } = req.body
                const token = jwt.sign({ name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId }, process.env.SECRET)
                return Apartment.findByIdAndUpdate(_id, req.body, { new: true })
                    .then((apartment) => {
                        return res.status(200).send(apartment)
                    })
                    .catch((error) => {
                        return res.status(500).send({ error: error.message })
                    })
            })
            .catch((error) => {
                return res.status(500).send({ error: error.message })
            })

    },

    // מחיקה לפי קוד
    remove: (req, res) => {
        Apartment.findByIdAndDelete({ _id: req.params.id })
            .then((apartment) => {
                const { name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId } = req.body
                const token = jwt.sign({ name, description, categoryId, cityId, adress, numberOfBeds, additives, price, advertiserId }, process.env.SECRET)
                res.status(200).send({ message: `delete apartment ${apartment._id} succeed!` ,token})
            })
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    },
}