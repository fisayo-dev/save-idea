import mongoose, { Mongoose } from "mongoose";

const UserSchema = new mongoose.Schema({
    first_name: {type: String,required:true},
    last_name: {type: String,required:true},
    email: {type: String,required:true},
    password: { type: String, required: true },
    profile_image: {type: String, required:false},
    all_ideas: [{
        type: mongoose.Schema.Types.ObjectId, ref:
        'Idea'
    }],
    all_stars: [{
        type: mongoose.Schema.Types.ObjectId, ref:
        'Star'
    }],
    all_bins: [{
        type: mongoose.Schema.Types.ObjectId, ref:
        'Bin'
    }],
})

const userModel = mongoose.model('User', UserSchema)
export default userModel