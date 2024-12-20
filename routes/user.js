import express from 'express'
import {
    register, login,validUser,logout, searchUser, getUserById, updateInfo
} from '../controllers/userController.js'
import {Auth} from '../middleware/user.js'

const router= express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/valid', Auth, validUser);
router.get('/auth/logout', Auth, logout);
router.get('/api/user?', Auth, searchUser);
router.get('/api/users/:id', Auth, getUserById);
router.patch('/api/users/update/:id', Auth, updateInfo);

export default router;