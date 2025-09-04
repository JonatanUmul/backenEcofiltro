import { Router } from "express";
import {  postDCPCD, getDCPCD, getDCPCDDiario } from "../../../../controllers/controlProcesos//detalle/DCPCD.controllers.js";



const router = Router();


router.post('/DCPCD', postDCPCD);
router.get('/DCPCD/:id', getDCPCD);
router.get('/DCPCD/:fecha_creacion_inicio/:fecha_creacion_fin/:ufmodelo/:turnoProd', getDCPCDDiario);

export default router;
