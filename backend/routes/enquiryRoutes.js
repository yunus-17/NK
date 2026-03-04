import express from 'express';
import { getEnquiries, createEnquiry, updateEnquiryStatus, deleteEnquiry, getEnquiryStats, sendReply } from '../controllers/enquiryController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public route for contact form
router.post('/', createEnquiry);

// Protected admin routes
router.get('/', auth, getEnquiries);
router.patch('/:id', auth, updateEnquiryStatus);
router.delete('/:id', auth, deleteEnquiry);
router.get('/stats', auth, getEnquiryStats);
router.post('/:id/reply', auth, sendReply);

export default router;
