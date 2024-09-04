// import asyncHandler from '../middleware/asyncHandler.js'
// import Product from '../models/productModel.js'

// const getProducts = asyncHandler(async (req, res) => {
//     const products = await Product.find({})
//     res.json(products)
// })


// const getProductsById = asyncHandler(async (req, res) => {
//     //    const product = products.find((p)=>p._id === req.params.id)
//     const product = await Product.findById(req.params.id)
//     if (product) {
//         res.json(product)
//     }
//     res.status(404)
//     throw new Error("Product not found")

// })

// export  {getProducts,getProductsById}

var compose = function(functions) {

    
    // console.log(typeof(functions))
    return function(x) {
        
        for(let i = functions.length-1; i >= 0 ; i--){
          
           let newVal = (functions[i](x))
           x = newVal
          
        }

        return x
    }
};


 const fn = compose([x => x + 1, x => x * x, x => 2 * x])
 console.log(fn(4)) // 9

