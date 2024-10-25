import { Router } from 'express';
const router = Router();

import { getUsers, getSingleUser, createUser, deleteUser, updateUser } from '../../controllers/userController.js';

// /api/users
router.route('/')
.get(getUsers)
.post(createUser)



// /api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.delete(deleteUser)
.put(updateUser);

export default router;

