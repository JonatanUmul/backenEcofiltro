import { Router } from "express";
import {  postCKM2, putCKM2 } from "../../../../controllers/maquinaria/encabezado/CKM2.controllers.js"



const router = Router();


router.post('/CKM2', postCKM2);
router.put('/CKM2', putCKM2);

export default router;
