import { Router } from "express";
import {  postMPH2, putMPH2 } from "../../../../controllers/mantenimientoMaq/encabezado/MPH2.controllers.js";



const router = Router();


router.post('/MPH2', postMPH2);
router.put('/MPH2', putMPH2);
export default router;
