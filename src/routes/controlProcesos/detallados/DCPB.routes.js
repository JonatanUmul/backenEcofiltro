import { Router } from "express";
import {  postDCPB, getDCPB, getDCPBB } from "../../../../controllers/controlProcesos/detalle/DCPB.controllers.js";



const router = Router();


router.post('/DCPB', postDCPB);
router.get('/DCPB/:id', getDCPB);  
router.get('/DCPB/:fecha_creacion_inicio/:fecha_creacion_fin/:ufmodelo/:id_pulidor', getDCPBB)
export default router;
