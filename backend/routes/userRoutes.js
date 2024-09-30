import express from "express";

const router = express.Router();

import { authUser,registerUser,logoutUser,getUserProfile,deleteUsers,getUsers,getUsersbyId,updateUsers } from '../controllers/userController.js'


