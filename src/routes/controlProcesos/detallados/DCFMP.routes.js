import { Router } from "express";
import {  postDCFMP, getDCFMP, getDCFMPP } from "../../../../controllers/controlProcesos/detalle/DCFMP.controllers.js";



const router = Router();


router.post('/DCPFM', postDCFMP);
router.get('/DCPFM/:id', getDCFMP);  
router.get('/DCPFM/:fecha_creacion_inicio/:fecha_creacion_fin/:modeloUF/:pulidor', getDCFMPP)
export default router;
