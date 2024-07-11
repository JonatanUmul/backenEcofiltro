import { Router } from "express";
import {  postDMBT, getDMBT  } from "../../../../controllers/mantenimientoMaq/detalle/DMBT.controllers.js";



const router = Router();


router.post('/DMBT', postDMBT);
router.get('/DMBT/:id', getDMBT);

export default router;
