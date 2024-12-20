import express from 'express'
import {Auth} from '../middleware/user.js'
const router= express.Router();

import { accessChat, fetchAllChats, createGroup, addToGroup, removeFromGroup,renameGroup} from '../controllers/chatController.js';


router.post('/', Auth, accessChat);
router.get('/', Auth, fetchAllChats);
router.post('/group', Auth, createGroup);
router.patch('/group/rename', Auth, renameGroup);
router.patch('/groupAdd', Auth, addToGroup);
router.patch('/groupRemove', Auth, removeFromGroup);
router.delete('/removeuser', Auth);

export default router;