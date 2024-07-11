import { Router } from "express";
import {  postDCKMM, getDCKMM  } from "../../../../controllers/maquinaria/detalle/DCKMM.controllers.js";




const router = Router();


router.post('/DCKMM', postDCKMM);
router.get('/DCKMM/:id', getDCKMM);


export default router;
