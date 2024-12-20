import { allMettings, particularMetting, createMeeting, deleteMetting } from "../controllers/videoController.js";
import express from 'express'
const router= express.Router();

router.get('/all', allMettings);
router.get('/:mettingId', particularMetting);
router.post('/create',createMeeting)
router.delete('/delete/:meetingId', deleteMetting)

export default router;