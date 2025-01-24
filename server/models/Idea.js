import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema({
    title: { type: 'String', required: true },
    descritption: { type: 'String', required: true },
    problem_to_solve: { type: 'String', required: true },
    inspiration_source: { type: 'String', required: true },
    category: { type: 'String', required: true },
    creator_id: { type: mongoose.Schema.Types.ObjectId ,ref : 'User' },
    created_at: { type: 'Date', default: Date.now },
    updated_at: { type: 'Date', default: Date.now }
})

const ideaModel = mongoose.model('Idea', ideaSchema)
export default ideaModel;