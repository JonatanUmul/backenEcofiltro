import { Router } from "express";
import {  postMBT, putMBT } from "../../../../controllers/mantenimientoMaq/encabezado/MBT.controllers.js"



const router = Router();


router.post('/MBT', postMBT);
router.put('/MBT', putMBT);

export default router;
