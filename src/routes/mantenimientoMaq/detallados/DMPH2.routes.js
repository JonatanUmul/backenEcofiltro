import { Router } from "express";
import {  postDMPH2,  getDMPH2 } from "../../../../controllers/mantenimientoMaq/detalle/DMPH2.controllers.js";



const router = Router();


router.post('/DMPH2', postDMPH2);
router.get('/DMPH2/:id', getDMPH2);

export default router;
