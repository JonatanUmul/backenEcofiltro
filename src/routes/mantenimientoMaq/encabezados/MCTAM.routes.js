import { Router } from "express";
import {  postMTAM, putMTAM } from "../../../../controllers/mantenimientoMaq/encabezado/MCTAM.controllers.js"



const router = Router();


router.post('/MTAM', postMTAM);
router.put('/MTAM', putMTAM);

export default router;
