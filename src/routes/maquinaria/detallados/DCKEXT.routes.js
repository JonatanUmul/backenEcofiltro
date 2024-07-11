import { Router } from "express";
import {  postDCKEXT, getDCKEXT  } from "../../../../controllers/maquinaria/detalle/DCKEXT.controllers.js";




const router = Router();


router.post('/DCKEXT', postDCKEXT);
router.get('/DCKEXT/:id', getDCKEXT);


export default router;
