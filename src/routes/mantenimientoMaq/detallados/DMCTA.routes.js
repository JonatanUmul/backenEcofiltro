import { Router } from "express";
import {  postDMCTA, getDMCTA  } from "../../../../controllers/mantenimientoMaq/detalle/DMCTA.controllers.js";



const router = Router();


router.post('/DMCTA', postDMCTA);
router.get('/DMCTA/:id', getDMCTA);

export default router;
