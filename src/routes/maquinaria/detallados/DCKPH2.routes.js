import { Router } from "express";
import {  postDCKPH2, getDCKPH2 } from "../../../../controllers/maquinaria/detalle/DCKPH2.controllers.js";




const router = Router();


router.post('/DCKPH2', postDCKPH2);
router.get('/DCKPH2/:id', getDCKPH2);


export default router;
