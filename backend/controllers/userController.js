import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const authUser = asyncHandler(async (req, res) => {
    const {email,password} = req.body

    const user = await User.findOne({email : email})

    console.log(user)
    if(user && (await user.matchPassword(password))){

        const token = jwt.sign({userId : user._id},process.env.JWT_SECRET,{expiresIn: '30d'})

        //set jwt as http only coockie
        res.cookie('jwt',token,{
            httpOnly : true,
            secure : process.env.NODE_ENV !== 'development',
            samesite : 'strict',
            maxAge : 30*24*60*60*1000 
        })

        res.json({
            _id : user._id,
            name : user.name,
            email: user.email,
            isAdmin : user.isAdmin
        })
    }
    else{
        res.status(401)
        throw new Error('invalid credentials')
    }
   
})


const registerUser = asyncHandler(async (req, res) => {
    res.send('registerUser')
})


const logoutUser = asyncHandler(async (req, res) => {
    res.send('logoutUser')
})


const getUserProfile = asyncHandler(async (req, res) => {
    res.send('getUserProfile')
})

// @access Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('getUsers')
})

const getUsersbyId = asyncHandler(async (req, res) => {
    res.send('getUsersby id')
})


// @access Admin
const deleteUsers = asyncHandler(async (req, res) => {
    res.send('deleteUsers')
})


const updateUsers = asyncHandler(async (req, res) => {
    res.send('UpdateUsers')
})


export {
    authUser,registerUser,logoutUser,getUserProfile,deleteUsers,getUsers,getUsersbyId,updateUsers
}

