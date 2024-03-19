
const express = require('express')
const { getAll, create, getById, getByCategoryId, getByCityId ,update,remove,getByNumBedsBigFrom,getByNumBedsSmallFrom,getByNumBedsEqual,getByPriceBigFrom,getByPriceSmallFrom,getByAdvertiserId} = require('../controllers/Apartment')
const { checkAuth, upload } = require('../middlewares')

const router = express.Router()
router.get('/getAll', getAll)
router.get('/:id', getById)
router.get('/categoryId/:categoryId', getByCategoryId)
router.get('/cityId/:cityid', getByCityId)
router.post('/create/:advertiserId', upload.single('image'),checkAuth, create)
router.put('/update/:id',checkAuth,update)
router.delete('/:id',checkAuth,remove)
router.get('/getByNumBedsBigFrom/:numberOfBeds',getByNumBedsBigFrom)
router.get('/getByNumBedsSmallFrom/:numberOfBeds',getByNumBedsSmallFrom)
router.get('/getByNumBedsEqual/:numberOfBeds',getByNumBedsEqual)
router.get('/getByAdvertiserId/:id',checkAuth,getByAdvertiserId)
router.get('/getByPriceSmallFrom/:num',getByPriceSmallFrom)
router.get('/getByPriceBigFrom/:num',getByPriceBigFrom)

module.exports = router