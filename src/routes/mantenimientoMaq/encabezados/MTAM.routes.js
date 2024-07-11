import { Router } from "express";
import {  postCKTAM } from "../../../../controllers/maquinaria/encabezado/CKTAM.controllers.js"



const router = Router();


router.post('/CKCTAM', postCKTAM);

export default router;
