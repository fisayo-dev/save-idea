import express from "express";
import { editUser,signupUser,loginUser,deleteUser,getUserDetails } from "../controllers/userControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router()

// Use routes
router.post('/signup', signupUser)
router.post('/login',  loginUser)
router.delete('/:id', deleteUser)
router.get('/:id', authMiddleware, getUserDetails)
router.put('/:id', editUser)

export default router