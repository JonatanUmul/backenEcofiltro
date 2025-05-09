import { Router } from "express";
import {  postDTH, getDTH, getSDTH, getSDTHSOLANTEC } from "../../../../controllers/controlProcesos/detalle/DTH.controllers.js";



const router = Router();


router.post('/DTH', postDTH);
router.get('/DTH/:id', getDTH);
router.get('/DTHSOLANTEC/:fecha_creacion_inicio/:fecha_creacion_fin/:modeloUF/:turn/:horno/:tiempo', getSDTHSOLANTEC);
router.get('/DTH/:fecha_creacion_inicio/:fecha_creacion_fin/:modeloUF/:turn/:horno/:tiempo', getSDTH)

export default router;
