import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'
import jwt from "jsonwebtoken";

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

const signupUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    
    // Check if user exist in database
    const userExist = await User.findOne({ email })
    if (userExist) return res.status(401).json({ message: 'The user email already exist' })
    
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
    const { email, password } = req.body;

    try {
        const actualUser = await User.findOne({ email })
        if (!actualUser) return res.status(400).json({ message: "Sorry, but you don't seem to have an account" });

        const isPasswordValid = await bcrypt.compare(password, actualUser.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Incorrect password" });

        const token = jwt.sign({ id: actualUser._id }, SECRET_KEY, { expiresIn: "48h" });
        res.status(200).json({ token });
    } catch (err) {
        console.error("Error logging in:", err.message);
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
};

const getUserDetails = async (req, res) => {
    const { id } = req.params;
    
    const user = await User.findById(id).select('-password')
    if (!user) return res.status(404).json({ message: 'The particular user does not exist' })
    
    res.status(200).json(user);
    
}
const deleteUser = async (req, res) => {
    
}
const editUser = async (req, res) => {

}

export { loginUser, getUserDetails, deleteUser, editUser, signupUser }
