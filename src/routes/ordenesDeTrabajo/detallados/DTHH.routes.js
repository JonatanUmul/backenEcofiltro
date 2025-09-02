import { Router } from "express";
import {  postDTHH, getDTHH, getSSDTH, putDTHH, DTHH_CodigosParaHornos, Ultimo_id_DTHH } from "../../../../controllers/ordenesDeTrabajo/detallles/DTHH.controllers.js";



const router = Router();

router.post('/DTHH', postDTHH);
router.get('/DTHH/:id', getDTHH);
router.get('/Ultimo_id_DTHH', Ultimo_id_DTHH);
router.get('/DTHH/:fecha_creacion_inicio/:fecha_creacion_fin/:modeloUF/:turn/:horno/:id_est/:fecha_CC', getSSDTH);
router.put('/DTHH', putDTHH)
router.get('/DTHH_CodigosParaHornos', DTHH_CodigosParaHornos);
export default router;
