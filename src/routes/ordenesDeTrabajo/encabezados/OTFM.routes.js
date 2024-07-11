import { Router } from "express";
import {  postOTFM, putOTFM } from "../../../../controllers/ordenesDeTrabajo/encabezados/OTFM.controllers.js";



const router = Router();


router.post('/OTFM', postOTFM);
router.put('/OTFM', putOTFM);

export default router;
