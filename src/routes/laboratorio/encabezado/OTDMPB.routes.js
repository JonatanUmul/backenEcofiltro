import { Router } from "express";
import {  postOTDMPB, putOTDMPB } from "../../../../controllers/laboratorio/encabezados/OTDMPB.controllers.js"



const router = Router();


router.post('/OTDMPB', postOTDMPB);
router.put('/OTDMPB', putOTDMPB);

export default router;
