import { Router } from "express";
import {  postCKTA, putCKTA } from "../../../../controllers/maquinaria/encabezado/CKTA.controllers.js";



const router = Router();


router.post('/CKTA', postCKTA);
router.put('/CKTA', putCKTA);

export default router;
