import { Router } from "express";
import {  postDCKCTA, getDCKCTA } from "../../../../controllers/maquinaria/detalle/DCKCTA.controllers.js";




const router = Router();


router.post('/DCKCTA', postDCKCTA);
router.get('/DCKCTA/:id', getDCKCTA);



export default router;
