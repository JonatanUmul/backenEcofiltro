import { Router } from "express";
import {  postDMPHM, getDMPHM   } from "../../../../controllers/mantenimientoMaq/detalle/DMPHM.controllers.js";



const router = Router();


router.post('/DMPHM', postDMPHM);
router.get('/DMPHM/:id', getDMPHM);

export default router;
