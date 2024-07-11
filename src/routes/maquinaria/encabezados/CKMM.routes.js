import { Router } from "express";
import {  postCKMM, putCKMM } from "../../../../controllers/maquinaria/encabezado/CKMM.controllers.js";



const router = Router();


router.post('/CKMM', postCKMM);
router.put('/CKMM', putCKMM);

export default router;
