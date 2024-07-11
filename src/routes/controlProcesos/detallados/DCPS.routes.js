import { Router } from "express";
import {  postDCPS, getDCPS, getDCPSS} from "../../../../controllers/controlProcesos/detalle/DCPS.controllers.js";



const router = Router();


router.post('/DCPS', postDCPS);
router.get('/DCPS/:id', getDCPS);
router.get('/DCPS/:fecha_creacion_inicio/:fecha_creacion_fin/:ufmodelo/:id_prensador/:turnoProd', getDCPSS);

export default router;
