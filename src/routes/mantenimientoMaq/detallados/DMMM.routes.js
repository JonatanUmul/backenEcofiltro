import { Router } from "express";
import {  postDMMM, getDMMM  } from "../../../../controllers/mantenimientoMaq/detalle/DMMM.controllers.js";



const router = Router();


router.post('/DMMM', postDMMM);
router.get('/DMMM/:id', getDMMM);

export default router;
