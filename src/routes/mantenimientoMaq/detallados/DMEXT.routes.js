import { Router } from "express";
import {  postDMEXT, getDMEXT  } from "../../../../controllers/mantenimientoMaq/detalle/DMEXT.controllers.js";



const router = Router();


router.post('/DMEXT', postDMEXT);
router.get('/DMEXT/:id', getDMEXT);

export default router;
