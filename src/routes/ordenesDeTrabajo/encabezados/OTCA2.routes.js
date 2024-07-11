import { Router } from "express";
import {  postOTCA2, putOTCA2 } from "../../../../controllers/ordenesDeTrabajo/encabezados/OTCA2.controllers.js";



const router = Router();


router.post('/OTCA2', postOTCA2);
router.put('/OTCA2', putOTCA2);

export default router;
