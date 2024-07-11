import { Router } from "express";
import {  postMPHM, putMPHM } from "../../../../controllers/mantenimientoMaq/encabezado/MPHM.controllers.js";



const router = Router();


router.post('/MPHM', postMPHM);
router.put('/MPHM', putMPHM);

export default router;
