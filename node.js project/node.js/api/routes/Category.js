const express = require('express')
const { checkAuth } = require('../middlewares')
const {
  getAll,
  create  
} = require('../controllers/Cattegory')

const router = express.Router()

router.get('/', getAll)
router.post('/create/:advertiserId',checkAuth,create)
module.exports = router


