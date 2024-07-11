import { Router } from "express";
import {  postDCKCTAM, getDCKCTAM } from "../../../../controllers/maquinaria/detalle/DCKCTAM.controllers.js";



const router = Router();


router.post('/DCKCTAM', postDCKCTAM);

router.get('/DCKCTAM/:id', getDCKCTAM);


export default router;
