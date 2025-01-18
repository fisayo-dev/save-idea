import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'
import jwt from "jsonwebtoken";

dotenv.config()

const SECRET_KEY = process.SECRET_KEY

const signupUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    
    // Check if user exist in database
    const userExist = User.findOne({ email })
    if (userExist) return res.status(401).json({ message: 'The user email alreadye exist' })
    
    // Create user in database
    try {
        // Hash the password and create the user
        const hashedPassword = await bcrypt.hash(password, 12);

        // Initiate User object
        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            profile_image: '',
            all_ideas: [],
            all_bins: [],
            all_stars: []
        })

        // Save user data
        const createdUser = await newUser.save() 
        
        // Generate user token
        const userToken = jwt.sign({ id: createdUser._id }, SECRET_KEY, { expiresIn: "48h" })

        // Send user token as response for succesful signup
        res.status(201).json({ token: userToken, message: "Successfully cerated an account" })
        
    } catch (err) {
        // Send error if user signup fails
        res.status(500).json({message: 'Error occurred when trying to create user', error: err.message})
    }
}
const loginUser = async (req, res) => {
    
}
const getUserDetails = async (req, res) => {
    
}
const deleteUser = async (req, res) => {
    
}
const editUser = async (req, res) => {

}

export { loginUser, getUserDetails, deleteUser, editUser, signupUser }
