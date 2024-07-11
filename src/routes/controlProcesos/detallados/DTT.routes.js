import { Router } from "express";
import {  postDTT, getDTT, getDTTT } from "../../../../controllers/controlProcesos/detalle/DTT.controllers.js";



const router = Router();


router.post('/DTT', postDTT);
router.get('/DTT/:id', getDTT);
router.get('/DTT/:id/:ufmodelo/:turnoProd/:tunelNum/:fecha_creacion_inicio/:fecha_creacion_fin', getDTTT);

export default router;
