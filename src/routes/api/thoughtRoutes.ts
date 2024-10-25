import { Router } from 'express';
const router = Router();

import { createThought, getAllThought } from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/')
.post(createThought)
.get(getAllThought);

// /api/thoughts/:userId

export default router;