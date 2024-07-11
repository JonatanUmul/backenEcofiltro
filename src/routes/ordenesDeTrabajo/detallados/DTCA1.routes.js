import { Router } from "express";
import {  postDTCA1, getDTCA1, getDTCAA1 } from "../../../../controllers/ordenesDeTrabajo/detallles/DTCA1.controllers.js";



const router = Router();


router.post('/DTCA1', postDTCA1);
router.get('/DTCA1/:id', getDTCA1);
router.get('/DTCA1/:fecha_creacion_inicio/:fecha_creacion_fin/:id_aserradero', getDTCAA1);
export default router;
