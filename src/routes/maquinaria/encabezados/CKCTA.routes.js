import { Router } from "express";
import {  postCKCTA, putCKCTA } from "../../../../controllers/maquinaria/encabezado/CKCTA.controllers.js"



const router = Router();


router.post('/CKCTA', postCKCTA);
router.put('/CKCTA', putCKCTA);

export default router;
