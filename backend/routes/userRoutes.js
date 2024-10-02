import express from "express";

const router = express.Router();

import { authUser,registerUser,logoutUser,getUserProfile,deleteUsers,getUsers,getUsersbyId,updateUsers } from '../controllers/userController.js'


router.route('/').post(registerUser).get(getUsers);
router.post('/logout',logoutUser);
router.post('/login',authUser);
router.route('/profile').get(getUserProfile).put(updateUsers);
router.route(':/id').get(getUsersbyId).delete(deleteUsers).put(updateUsers)


export default router


