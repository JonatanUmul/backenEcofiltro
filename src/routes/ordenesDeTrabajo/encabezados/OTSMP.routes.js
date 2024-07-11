import { Router } from "express";
import {  postOTSA, putOTSA } from "../../../../controllers/ordenesDeTrabajo/encabezados/OTSM.controllers.js";



const router = Router();


router.post('/OTSA', postOTSA);
router.put('/OTSA', putOTSA);

export default router;
