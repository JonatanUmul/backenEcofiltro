import { Router } from "express";
import {  postOT_mezclado_aserrin, putOT_mezclado_aserrin,Get_OT_mezclado_aserrin,Get_DT_mezclado_aserrin, postDT_mezclado_aserrin } from "../../../../controllers/ordenesDeTrabajo/encabezados/OT_mezclado_aserrin.controllers.js";



const router = Router();


router.post('/OT_mezclado_aserrin', postOT_mezclado_aserrin);
router.post('/DT_mezclado_aserrin', postDT_mezclado_aserrin);
router.get('/Get_OT_mezclado_aserrin', Get_OT_mezclado_aserrin);
router.get('/Get_DT_mezclado_aserrin', Get_DT_mezclado_aserrin);
router.put('/OT_mezclado_aserrin', putOT_mezclado_aserrin);

export default router;
