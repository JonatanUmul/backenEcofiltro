import { Router } from "express";
import {  postDCKPM, getDCKPM } from "../../../../controllers/maquinaria/detalle/DCKPM.controllers.js";




const router = Router();


router.post('/DCKPM', postDCKPM);
router.get('/DCKPM/:id', getDCKPM);


export default router;
