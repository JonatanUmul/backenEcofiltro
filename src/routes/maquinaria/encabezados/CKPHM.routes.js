import { Router } from "express";
import {  postCKPHM, putCKPHM } from "../../../../controllers/maquinaria/encabezado/CKPHM.controllers.js";



const router = Router();


router.post('/CKPHM', postCKPHM);
router.put('/CKPHM', putCKPHM);

export default router;
