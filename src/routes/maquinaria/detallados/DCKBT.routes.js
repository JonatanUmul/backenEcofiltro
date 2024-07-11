import { Router } from "express";
import {  postDCKBT, getDCKBT } from "../../../../controllers/maquinaria/detalle/DCKBT.controllers.js";




const router = Router();


router.post('/DCKBT', postDCKBT);
router.get('/DCKBT/:id', getDCKBT);


export default router;
