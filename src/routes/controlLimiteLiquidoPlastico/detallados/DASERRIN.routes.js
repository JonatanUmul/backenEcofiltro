import { Router } from "express";
import { postDASERRIN,getDASERRIN,getDASERRI } from "../../../../controllers/ordenesDeTrabajo/detallles/DASERRIN.controllers.js";



const router = Router();


router.post('/DASERRIN', postDASERRIN);

router.get('/DASERRIN/:id', getDASERRIN);

router.get('/DASERRIN/:fecha_creacion_inicio/:fecha_creacion_fin/:id_asrdSMP/:id_patio', getDASERRI);

export default router;
