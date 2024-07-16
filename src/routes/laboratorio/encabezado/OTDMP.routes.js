import { Router } from "express";
import {  postOTDMP, putOTDMP } from "../../../../controllers/laboratorio/encabezados/OTDMP.controllers.js"



const router = Router();


router.post('/OTDMP', postOTDMP);
router.put('/OTDMP', putOTDMP);

export default router;
