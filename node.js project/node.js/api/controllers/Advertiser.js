const Advertiser = require("../models/Advertiser")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
dotenv.config()

module.exports = {

    register: (req, res) => {
        console.log("fghhjj");
        const { email, password, phone, additionalPhone, apartments } = req.body
        bcrypt.hash(password, 12, (error, hash) => {
            if (error) {
                console.log("asdfghjk");
                return res.status(500).send({ error: error.message })
            }
            console.log("ghjk");
            const advertiser = new Advertiser({
                email,
                password: hash,
                phone,
                additionalPhone,
                apartments
            })
            console.log(advertiser);
            return advertiser.save()

        })
        Advertiser.find({ email: { $eq: email } })
            .then((advertisers) => {
                if (advertisers && advertisers.length > 0) {
                    res.status(404).send({ message: `email has been exists already!` })
                }

            })
            .then(() => {
                return res.status(200).send({ message: `welcome to our application!` })
            })
            .catch((err) => {
                return res.status(500).send({ error: err.message })
            })
    },


    login: (req, res, next) => {
        const email = req.params.email
        const password = req.params.password
        Advertiser.find({ email: { $eq: email } })
            .then((advertisers) => {
                if (advertisers.length == 0) {
                    return res.status(409).send({ message: 'Email and password are not matches!' })
                }
                const [advertiser] = advertisers
                const token = jwt.sign({ email, password: advertiser.password }, process.env.SECRET, {

                    expiresIn: '1hr'
                })
                console.log("dfghnjm");
                return res.status(200).send({ message: `login successfuly!`, advertiser, token })
            }
            )
            .catch((err) => {
                return res.status(404).send({ error: err.message })
            })
    }

}