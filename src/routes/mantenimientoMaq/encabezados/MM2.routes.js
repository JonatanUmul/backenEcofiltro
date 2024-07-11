import { Router } from "express";
import {  postMM2, putMM2 } from "../../../../controllers/mantenimientoMaq/encabezado/MM2.controllers.js"



const router = Router();


router.post('/MM2', postMM2);
router.put('/MM2', putMM2);

export default router;
