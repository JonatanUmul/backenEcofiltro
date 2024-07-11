import { Router } from "express";
import {  postMEXT, putMEXT } from "../../../../controllers/mantenimientoMaq/encabezado/MEXT.controllers.js"



const router = Router();


router.post('/MEXT', postMEXT);
router.put('/MEXT', putMEXT);

export default router;
