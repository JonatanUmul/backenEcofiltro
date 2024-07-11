import { Router } from "express";
import {  postDCKTA, getDCKCTA  } from "../../../../controllers/maquinaria/detalle/DCKTA.controllers.js";



const router = Router();


router.post('/DCKTA', postDCKTA);
router.get('/DCKTA/:id', getDCKCTA);

export default router;
