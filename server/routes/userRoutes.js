import express from "express";
import { editUser,signupUser,loginUser,deleteUser,getUserDetails } from "../controllers/userControllers";

const router = express.Router()

// Use routes
router.post('/signup', signupUser)
router.post('/login', loginUser)
router.delete('/delete', deleteUser)
router.delete('/:id', getUserDetails)
router.put('/:id', editUser)

export default router