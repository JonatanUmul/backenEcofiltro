import { Router } from "express";
import {  postCPB, putCPB } from "../../../../controllers/controlProcesos/encabezado/CPB.controllers.js";



const router = Router();


router.post('/CPB', postCPB);
router.put('/CPB', putCPB);
export default router;
