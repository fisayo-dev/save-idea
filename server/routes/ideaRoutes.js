import express from 'express'

const router = express.Router();

import { getIdeas, getSingleIdea, createIdea, updateIdea, deleteIdea, getStarredIdeas, createStar, deleteToBin } from '../controllers/ideaControllers.js'   // Import the functions from the ideasController.js file
import authMiddleware from '../middlewares/authMiddleware.js';

router.get('/:creator_id', authMiddleware, getIdeas);  // GET request to fetch all ideas
router.get('/:creator_id/starred', authMiddleware, getStarredIdeas);  // GET request to fetch all starred ideas
router.post('/create_star/:id', authMiddleware, createStar);  // GET request to fetch all starred ideas
router.get('/:id/creator/:creator_id', authMiddleware, getSingleIdea);  // GET request to fetch a single idea
router.post('/', authMiddleware, createIdea);  // POST request to create a new idea
router.put('/:id', authMiddleware, updateIdea);  // PUT request to update an idea
router.put('/:id/creator/:creator_id', deleteToBin) // Send idea to bin
router.delete('/:id', authMiddleware, deleteIdea);  // DELETE request to delete an idea


export default router;