import { Router } from "express";
import { postCreacionissues, getCreacionissues,getConsultaIssues } from "../../../controllers/Creacionissues/Creacionissues.controllers.js";



const router = Router();


router.post('/Creacionissues', postCreacionissues);
router.get('/Creacionissues/:id', getCreacionissues);
router.get('/Creacionissues/:ayer', getConsultaIssues)


export default router;
