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

}
const getIdeas = async (req, res) => { 
    const { creator_id } = req.body;
    try {
        const ideas = await Idea.find({ creator_id })
        if(!ideas) return res.status(404).json({ message: 'Oops, thisuser doen;t have an idea' })
        res.status(200).json({ message: 'Ideas fetched successfully', ideas })
    } catch (err) {
        
    }
}
const getSingleIdea = async (req, res) => { 

}
const updateIdea = async (req, res) => { 

}

export { createIdea, deleteIdea, getIdeas, getSingleIdea, updateIdea }