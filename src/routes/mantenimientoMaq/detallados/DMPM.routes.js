import { Router } from "express";
import {  postDMPM, getDMPM   } from "../../../../controllers/mantenimientoMaq/detalle/DMPM.controllers.js";



const router = Router();


router.post('/DMPM', postDMPM);
router.get('/DMPM/:id', getDMPM);

export default router;
