import { Router } from "express";
import {  postCKEXT, putCKEXT } from "../../../../controllers/maquinaria/encabezado/CKEXT.controllers.js"



const router = Router();


router.post('/CKEXT', postCKEXT);
router.put('/CKEXT', putCKEXT);

export default router;
