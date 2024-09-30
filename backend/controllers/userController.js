import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'

const authUser = asyncHandler(async (req, res) => {
    res.send('authuser')
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

