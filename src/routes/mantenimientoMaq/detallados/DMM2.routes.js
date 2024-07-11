import { Router } from "express";
import {  postDMM2, getDMM2  } from "../../../../controllers/mantenimientoMaq/detalle/DMM2.controllers.js";



const router = Router();


router.post('/DMM2', postDMM2);
router.get('/DMM2/:id', getDMM2);

export default router;
