import Idea from '../models/Idea.js'
const createIdea = async (req, res) => { 
    const { title, description, inspiration_source, category, creator_id, problem_to_solve } = req.body;

    try {
        const newIdea = new Idea({
            title,
            description,
            inspiration_source,
            category,
            problem_to_solve,
            creator_id,
        })
        const createdIdea = await newIdea.save()
        res.status(201).json({ message: 'Idea created successfully', createdIdea })
    } catch (err) { 
        res.status(500).json({ message: 'Error occurred when trying to create idea', error: err.message })
    }

}

const deleteIdea = async (req, res) => { 
    const { id } = req.params;
    const { creator_id } = req.body;

    try {
        const ideaToBeDeleted = await Idea.findOne({ creator_id, _id: id })
        if (!ideaToBeDeleted) res.status(401).json({ message: "Sorry, looks like this idea doesn't exist" })
        
        await Idea.findByIdAndDelete(id)
        res.status(200).json({ message: 'Your idea has been successfully deleted' })        
    } catch (err) {
        res.status(500).json({message:'Error occurred when trying to delete the idea '})
    }
}
const getIdeas = async (req, res) => { 
    const { creator_id } = req.params;
    try {
        const ideas = await Idea.find({ creator_id }).sort({updated_at: -1})
        if(!ideas) return res.status(404).json({ message: "Oops, this user doesn't have an idea" })
        res.status(200).json({ message: 'Ideas fetched successfully', ideas })
    } catch (err) {
        
    }
}
const getSingleIdea = async (req, res) => { 
    const { creator_id } = req.body;
    const { id } = req.params;
    try {
        const idea = await Idea.findOne({ creator_id, _id: id })
        if (!idea) return res.status(401).json({ message: 'This idea does not exist' })
        res.status(200).json({ message: 'Idea fetched successfully', idea })

    } catch (err) {
        res.status(500).send({ message: 'Error occurred when trying to fetch idea', error: err.message })
    }
}
const updateIdea = async (req, res) => { 
    const { title, description, inspiration_source, category, creator_id, problem_to_solve } = req.body;

    const { id } = req.params;
    const ideaToBeUpdated = await Idea.findOne({ creator_id, _id: id })
    if (!ideaToBeUpdated) return res.status(404).json({ message: 'This idea does not exist' })
    try {
        const updatedIdea = await Idea.findByIdAndUpdate(id, {
            title,
            description,
            inspiration_source,
            category,
            creator_id,
            problem_to_solve,
            updated_at: Date.now()  // Update the updated_at field  
        }, { new: true })
        res.status(200).json({ message: 'Idea updated successfully', updatedIdea })
    } catch (err) {
        res.status(500).json({ message: 'Error occurred when trying to update idea', error: err.message })
    }
}

export { createIdea, deleteIdea, getIdeas, getSingleIdea, updateIdea }