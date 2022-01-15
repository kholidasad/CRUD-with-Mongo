const UserController = require('../controllers/UserControllers')
const AuthController = require('../controllers/AuthController')
const ProductController = require('../controllers/ProductController')
const TranscationController = require('../controllers/TransactionController')
const ImageController = require('../controllers/ImageController')
const express = require('express')
const router = express.Router()
const { verify } = require('../middleware/auth')

//login
router.post('/login', AuthController.login)
router.post('/register', AuthController.register)

router.get('/', verify, UserController.index)
router.get('/find', UserController.findOne)
router.post('/create', UserController.insert)
router.put('/update/:id', verify, UserController.update)
router.delete('/delete/:id', verify, UserController.delete)
router.get('/detail', UserController.userDetail)

//product
router.post('/product/create', verify, ProductController.create)
router.get('/product', ProductController.index)
router.get('/product/find', ProductController.findOne)
router.put('/product/update/:id', ProductController.update)
router.delete('/product/delete/:id', ProductController.delete)

//transaction
router.post('/transaction', verify, TranscationController.create)

//image
router.post('/image', ImageController.create)

module.exports = router