const express = require('express')
const { checkAuth } = require('../middlewares')
const {
  getAll,
  create  
} = require('../controllers/City')


const router = express.Router()

router.get('/', getAll)
router.post('/:idAdvertuiser',checkAuth,create)
module.exports = router