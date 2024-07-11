import { Router } from "express";
import {  postCKBT,putCKBT } from "../../../../controllers/maquinaria/encabezado/CKBT.controllers.js"

 


const router = Router();


router.post('/CKBT', postCKBT);
router.put('/CKBT', putCKBT);

export default router;
