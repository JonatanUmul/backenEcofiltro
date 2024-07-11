import { Router } from "express";
import {  postMCTA, putMCTA } from "../../../../controllers/mantenimientoMaq/encabezado/MCTA.controllers.js"



const router = Router();


router.post('/MCTA', postMCTA);
router.put('/MCTA', putMCTA);

export default router;
