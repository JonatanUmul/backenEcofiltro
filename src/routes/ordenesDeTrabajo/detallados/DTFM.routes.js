import { Router } from "express";
import {  postDTFM, getDTFM, getDTFMM } from "../../../../controllers/ordenesDeTrabajo/detallles/DTFM.controllers.js"



const router = Router();


router.post('/DTFM', postDTFM);
router.get("/DTFM/:id", getDTFM);
router.get("/DTFM/:fecha_creacion_inicio/:fecha_creacion_fin", getDTFMM);


export default router;
