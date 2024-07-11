import { Router } from "express";
import {  postOTHH, putOTHH } from "../../../../controllers/ordenesDeTrabajo/encabezados/OTHH.controllers.js";



const router = Router();


router.post('/OTHH', postOTHH);
router.put('/OTHH', putOTHH);

export default router;
