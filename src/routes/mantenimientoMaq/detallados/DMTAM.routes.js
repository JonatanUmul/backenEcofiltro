import { Router } from "express";
import {  postDMTAM, getDMTAM  } from "../../../../controllers/mantenimientoMaq/detalle/DMTAM.controllers.js";



const router = Router();


router.post('/DMTAM', postDMTAM);
router.get('/DMTAM/:id', getDMTAM);

export default router;
