const { Product } = require('../models/product')
const mongoose = require('mongoose')

const getAllProducts =  async (req,res) =>{
    let filter = {}
    if(req.query.categories)
    {
        filter = {category : req.query.categories.split(',')}
    }

    const productList = await Product.find(filter).populate('category')
    //.select('name image -_id') for specifying needed properties

    if(!productList){
        res.status(500).json({success: false});
    }
    res.send(productList);
}

const getProductById = async (req,res) =>{
    const product = await Product.findById(req.params.id).populate('category');

    if(!product){
        res.status(500).json({success: false});
    }
    res.send(product);
}

const changeProductById =  async (req,res)=> {
    if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
        return res.status(400).send('Invalid category ID');
      }
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid product ID');
      }  

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price : req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        {new: true}
    )

    
    if(!product)
    return res.status(500).send('the product connot be updated!')

    res.send(product);
}

const addProduct =  async (req,res) =>{
    if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
        return res.status(400).send('Invalid ID');
      }

    const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price : req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
    })
    // const category = await Category.findById(req.body.category);
    // if(!category) return res.status(400).send('Invalid Category')    
    
    let products = await product.save();

    if(!products)
    return res.statuts(500).send('The product cannot be created!')

    res.send(products)
}

const deleteProductById =  (req,res)=>{
    Product.findOneAndDelete(req.params.id).then(product=>{
        if(product){
            return res.status(200).json({sucess : true, message: 'the product is deleted!'})
        } else {
            return res.status(404).json({success: false, message: "product not found!"})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
}

const getNumberOfProducts =  async (req,res) =>{
    const productCount = await Product.countDocuments();

    if (!productCount) {
      return res.status(500).json({ success: false });
    }

    res.send({
      productCount: productCount,
    });
}

const featuredProducts =  async (req,res) =>{
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(count);

    if (!products) {
      return res.status(500).json({ success: false });
    }

    res.send(products);
}

module.exports = {
    getAllProducts,
    getProductById,
    changeProductById,
    addProduct,
    deleteProductById,
    getNumberOfProducts,
    featuredProducts
}


