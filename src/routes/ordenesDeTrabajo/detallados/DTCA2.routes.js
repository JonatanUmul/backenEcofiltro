import { Router } from "express";
import {  postDTCA2, getDTCA2, getDTCAA2} from "../../../../controllers/ordenesDeTrabajo/detallles/DTCA2.controllers.js";



const router = Router();


router.post('/DTCA2', postDTCA2);
router.get('/DTCA2/:id', getDTCA2);
router.get('/DTCA2/:fecha_creacion_inicio/:fecha_creacion_fin/:id_aserradero', getDTCAA2);

export default router;
