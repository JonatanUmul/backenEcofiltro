import { Router } from "express";
import {  postOTFM, putOTFM, GET_OTFM, putOtfm_estado_para_produccion } from "../../../../controllers/ordenesDeTrabajo/encabezados/OTFM.controllers.js";



const router = Router();


router.post('/OTFM', postOTFM);
router.put('/OTFM', putOTFM);
router.put('/otfm_estado_para_produccion', putOtfm_estado_para_produccion);
router.get('/OTFM', GET_OTFM);

export default router;
