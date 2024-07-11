import { Router } from "express";
import {  postOTCC, putOTCC } from "../../../../controllers/ordenesDeTrabajo/encabezados/OTCC.controllers.js";



const router = Router();


router.post('/OTCC', postOTCC);
router.put('/OTCC', putOTCC);


export default router;