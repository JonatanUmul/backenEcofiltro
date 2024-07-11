import { Router } from "express";
import {  postCTT, putCTT, getCTT } from "../../../../controllers/controlProcesos/encabezado/CTT.controllers.js";



const router = Router();


router.post('/CTT', postCTT);
router.get('/CTT/:fecha_creacion_inicio/:fecha_creacion_fin', getCTT);
router.put('/CTT', putCTT);

export default router;
