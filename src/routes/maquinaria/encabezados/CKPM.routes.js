import { Router } from "express";
import {  postCKPM, putCKPM } from "../../../../controllers/maquinaria/encabezado/CKPM.controllers.js";



const router = Router();


router.post('/CKPM', postCKPM);
router.put('/CKPM', putCKPM);

export default router;
