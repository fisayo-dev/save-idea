import express from "express";

const router = express.Router()

// Use routes
router.post('/signup', signupUser)
router.post('/login', loginUser)
router.delete('/delete', deleteUser)
router.delete('/:id', getUserDetails)

export default router