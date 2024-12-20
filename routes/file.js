import { getFiles, getParticulaFile, createFile, deleteFile, updateFile, allSharedFiles, allStarFiles, starFile, unstarFile, updateSharedFiles } from "../controllers/filesController.js";
import express from 'express'

const router = express.Router();
router.get('/all', getFiles);
router.get('/:fileId', getParticulaFile)
router.post('/create', createFile)
router.delete('/:fileId', deleteFile)

router.put('/update/:fileId', updateFile)
router.get('/all/shared', allSharedFiles);
router.get('/all/star', allStarFiles);
router.put('/star/:fileId', starFile);

router.put('/unstar/:fileId', unstarFile);
router.put('/update/shared/:fileId', updateSharedFiles);

export default router;