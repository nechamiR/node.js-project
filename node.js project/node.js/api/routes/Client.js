const express = require('express')

const {
    login,
    register
} = require('../controllers/Client')

const router = express.Router()

router.post('/register', register)
router.get('/login/:email/:password', login)

module.exports = router