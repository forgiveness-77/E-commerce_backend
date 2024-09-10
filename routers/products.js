const {Product} = require('../models/product' )
const {Category} = require('../models/category')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const protect = require('./../helpers/protected')
const { getAllProducts, getProductById, addProduct, deleteProductById, getNumberOfProducts, featuredProducts, changeProductById } = require('../controllers/products.controller')

router.get('/', getAllProducts)

router.get('/:id', getProductById )

router.post('/',protect, addProduct)

router.put('/:id',protect, changeProductById)

router.delete('/:id',protect, deleteProductById)

router.get('/get/count', getNumberOfProducts)

router.get('/get/featured/:count', featuredProducts)

module.exports = router