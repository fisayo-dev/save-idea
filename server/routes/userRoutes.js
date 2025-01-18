import express from "express";
import { editUser,signupUser,loginUser,deleteUser,getUserDetails } from "../controllers/userControllers.js";

const router = express.Router()

// Use routes
router.post('/signup', signupUser)
router.post('/login', loginUser)
router.delete('/:id', deleteUser)
router.get('/:id', getUserDetails)
router.put('/:id', editUser)

export default router