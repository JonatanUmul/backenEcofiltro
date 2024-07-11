import { Router } from "express";
import {  postCPCD, putCPCD } from "../../../../controllers/controlProcesos/encabezado/CPCD.controllers.js";



const router = Router();


router.post('/CPCD', postCPCD);
router.put('/CPCD', putCPCD);

export default router;
