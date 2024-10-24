import { Router } from 'express';
const router = Router();

import { getUsers, createUser } from '../../controllers/userController.js';

// /api/users
router.route('/')
.get(getUsers)
.post(createUser);


// /api/comments/:commentId
//router.route('/:commentId').get(getSingleComment);

export default router;

