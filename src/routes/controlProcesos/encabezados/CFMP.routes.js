import { Router } from "express";
import {  postCFMP, putCFMP } from "../../../../controllers/controlProcesos/encabezado/CFMP.controllers.js";



const router = Router();


router.post('/CFMP', postCFMP);
router.put('/CFMP', putCFMP);
export default router;
