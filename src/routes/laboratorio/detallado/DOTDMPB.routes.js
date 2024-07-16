import { Router } from "express";
import {  postDOTDMPB, getDOTDMPB  } from "../../../../controllers/laboratorio/detalle/DOTDMPB.controllers.js";



const router = Router();


router.post('/DOTDMPB', postDOTDMPB);
router.get('/DOTDMPB/:id', getDOTDMPB);

export default router;
