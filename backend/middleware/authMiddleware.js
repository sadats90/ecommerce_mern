import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler'
import User from '../models/userModel'


//protect routes
export const protect = asyncHandler(async (req,res,next)=>{

    let token = req.cookie.jwt // cookie.jwt because we named the cookie jwt in the auth route // res.cookie(--->'jwt'<----,token,{}) //

    if(token)
    {
      try {
        const decoded =  jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password') // setting up the request object
        next()
      } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not authorized, token failed')
      }
    }
    else
    {
        res.status(401)
        throw new Error('Not authorized no token')
    }
      
})