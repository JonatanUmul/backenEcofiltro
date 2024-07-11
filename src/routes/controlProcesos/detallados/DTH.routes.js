import { Router } from "express";
import {  postDTH, getDTH, getSDTH } from "../../../../controllers/controlProcesos/detalle/DTH.controllers.js";



const router = Router();


router.post('/DTH', postDTH);
router.get('/DTH/:id', getDTH);
router.get('/DTH/:fecha_creacion_inicio/:fecha_creacion_fin/:modeloUF/:turn/:horno', getSDTH);

export default router;
