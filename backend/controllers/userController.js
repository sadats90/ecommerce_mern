import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    console.log('User found:', user); // Log user info for debugging

    if (user && (await user.matchPassword(password))) {
        const token = generateToken(res, user._id); // Generate and get the token

        console.log('Token set in cookie:', token); // Log the token in the controller as well

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email: email })
    if (userExists) {
        res.status(400)
        throw new Error('user exists')
    }
    const user =await User.create({
        name,
        email,
        password,
    })
    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
    else {
        res.status(400)
        throw new Error('user exists')
    }

})


const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) })

    res.status(200).json({ message: 'Logged Out Successfully' })
})


const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id) // getting user._id from the middleware 
    if(user)
    {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
    else {
        res.status(400)
        throw new Error('user not found')
    }

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


const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id) 
    if(user)
    {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.password)
        {
            user.password = req.body.password
        }

        const updateUser = await user.save()

        res.status(200).json({
            _id : updateUser._id,
            name : updateUser.name,
            email : updateUser.email,
            isAdmin : updateUser.isAdmin,
        })


    }

    else {
        res.status(400)
        throw new Error('user not found')
    }
})


export {
    authUser, registerUser, logoutUser, getUserProfile, deleteUsers, getUsers, getUsersbyId, updateUserProfile
}

