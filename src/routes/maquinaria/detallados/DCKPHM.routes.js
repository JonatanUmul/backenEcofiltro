import { Router } from "express";
import {  postDCKPHM, getDCKPHM } from "../../../../controllers/maquinaria/detalle/DCKPHM.controllers.js";




const router = Router();


router.post('/DCKPHM', postDCKPHM);
router.get('/DCKPHM/:id', getDCKPHM);


export default router;
