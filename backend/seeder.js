import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors'
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await Order.deleteMany()
        await Product.deleteMany()

        const createdUser = await User.insertMany(users)
        const adminUser = createdUser[0]._id

        const sampleProducts = products.map((product) => {
            return { ...product, user:adminUser }
        })

        await Product.insertMany(sampleProducts)

        console.log('data impoerted'.green.inverse)

        process.exit()

    } catch (error) {
        console.log(error.message.red.inverse)
    }


}

const destroyData = async () => {

    try {
        await User.deleteMany()
        await Order.deleteMany()
        await Product.deleteMany()

        console.log('data destroyed'.red.inverse)
        process.exit()
    } catch (error) {
        console.log(error.message.red.inverse)
    }

}

if (process.argv[2] == '-d') {
    destroyData()
} else {
    importData()
}