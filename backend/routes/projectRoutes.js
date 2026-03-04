import express from 'express';
import { getProjects, getProjectById, createProject, updateProject, deleteProject, getStats } from '../controllers/projectController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Protected admin routes
router.post('/', auth, createProject);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);
router.get('/stats', auth, getStats);

export default router;
