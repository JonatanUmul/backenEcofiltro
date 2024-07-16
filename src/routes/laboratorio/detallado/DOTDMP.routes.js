import { Router } from "express";
import {  postDOTDMP, getDOTDMP  } from "../../../../controllers/laboratorio/detalle/DOTDMP.controllers.js";



const router = Router();


router.post('/DOTDMP', postDOTDMP);
router.get('/DOTDMP/:id', getDOTDMP);

export default router;
