import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})


const getProductsById = asyncHandler(async (req, res) => {
    //    const product = products.find((p)=>p._id === req.params.id)
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    }
    res.status(404)
    throw new Error("Product not found")

})

export  {getProducts,getProductsById}



