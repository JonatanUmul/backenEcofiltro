import { Router } from "express";
import {  postCTH, putCTH, getCTH } from "../../../../controllers/controlProcesos/encabezado/CTH.controllers.js";



const router = Router();


router.post('/CTH', postCTH);
router.put('/CTH', putCTH);
router.get('/CTH/:fecha_creacion_inicio/:fecha_creacion_fin', getCTH);

export default router;
