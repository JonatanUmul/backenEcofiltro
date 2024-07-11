import { Router } from "express";
import {  postMTA, putMTA } from "../../../../controllers/mantenimientoMaq/encabezado/MTA.controllers.js";



const router = Router();


router.post('/MTA', postMTA);
router.put('/MTA', putMTA);

export default router;
