import { Router } from "express";
import {  postCMMM,putMMM } from "../../../../controllers/mantenimientoMaq/encabezado/MMM.controllers.js";



const router = Router();


router.post('/MMM', postCMMM);
router.put('/MMM', putMMM);
export default router;
