import { Router } from "express";
import {  postOTCAS1, putOTCA1 } from "../../../../controllers/ordenesDeTrabajo/encabezados/OTCA1.controllers.js";



const router = Router();


router.post('/OTCA1', postOTCAS1);
router.put('/OTCA1', putOTCA1);

export default router;
