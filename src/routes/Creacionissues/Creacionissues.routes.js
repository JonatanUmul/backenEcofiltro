import { Router } from "express";
import { postCreacionissues, getCreacionissues } from "../../../controllers/Creacionissues/Creacionissues.controllers.js";



const router = Router();


router.post('/Creacionissues', postCreacionissues);
router.get('/Creacionissues/:id', getCreacionissues)


export default router;
