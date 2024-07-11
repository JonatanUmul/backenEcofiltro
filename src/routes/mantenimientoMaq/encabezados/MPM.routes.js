import { Router } from "express";
import {  postMPM,putMPM } from "../../../../controllers/mantenimientoMaq/encabezado/MPM.controllers.js";



const router = Router();


router.post('/MPM', postMPM);
router.put('/MPM', putMPM);
export default router;
