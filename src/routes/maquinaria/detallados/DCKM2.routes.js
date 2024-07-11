import { Router } from "express";
import {  postDCKM2, getDCKM2  } from "../../../../controllers/maquinaria/detalle/DCKM2.controllers.js";



const router = Router();


router.post('/DCKM2', postDCKM2);
router.get('/DCKM2/:id', getDCKM2);


export default router;
