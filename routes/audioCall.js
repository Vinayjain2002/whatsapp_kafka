import { allAudioCalls, particularAudioCall, createAudioCall, deleteAudioCall } from "../controllers/audioController.js";
import express from 'express'
import {Auth} from '../middleware/user.js'
const router= express.Router();

router.get('/all',Auth ,allAudioCalls)
router.get('/:userId', Auth, particularAudioCall)
router.post("/newCall", createAudioCall)
router.delete('/:audioId', deleteAudioCall)

export default router;