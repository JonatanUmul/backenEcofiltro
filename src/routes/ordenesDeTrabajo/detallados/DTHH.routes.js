import { Router } from "express";
import {  postDTHH, getDTHH, getSSDTH, putDTHH } from "../../../../controllers/ordenesDeTrabajo/detallles/DTHH.controllers.js";



const router = Router();

router.post('/DTHH', postDTHH);
router.get('/DTHH/:id', getDTHH);
router.get('/DTHH/:fecha_creacion_inicio/:fecha_creacion_fin/:modeloUF/:turn/:horno/:id_est', getSSDTH);
router.put('/DTHH', putDTHH)
export default router;
