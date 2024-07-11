import { Router } from "express";
import {  postCKPH2, putCKPH2 } from "../../../../controllers/maquinaria/encabezado/CKPH2.controllers.js";



const router = Router();


router.post('/CKPH2', postCKPH2);
router.put('/CKPH2', putCKPH2);

export default router;
