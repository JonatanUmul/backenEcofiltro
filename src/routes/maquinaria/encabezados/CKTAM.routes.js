import { Router } from "express";
import {  postCKTAM, putCKCTAM } from "../../../../controllers/maquinaria/encabezado/CKTAM.controllers.js"



const router = Router();


router.post('/CKCTAM', postCKTAM);
router.put('/CKCTAM', putCKCTAM);
export default router;
