import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import products  from './data/products.js'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'




const port = process.env.PORT || 5000
 
connectDB()
const app = express()

 

// app.use(cors())

app.use(cors({
    origin: 'http://localhost:5173',  // Replace with your React app's URL
    credentials: true                // Allow cookies to be sent
  }));


app.use(express.json()) 
app.use(express.urlencoded({
    extended : true
}))
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.send("ssfgdgads")
})

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders', orderRoutes);
app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>console.log(`server running on port ${port}`))