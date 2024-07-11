import { Router } from "express";
import {  postDMTA, getDMTA  } from "../../../../controllers/mantenimientoMaq/detalle/DMTA.controllers.js";



const router = Router();


router.post('/DMTA', postDMTA);
router.get('/DMTA/:id', getDMTA);

export default router;
