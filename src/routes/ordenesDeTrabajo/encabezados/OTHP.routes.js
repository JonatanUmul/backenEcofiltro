import { Router } from "express";
import {  postOTHP, putOTHPP } from "../../../../controllers/ordenesDeTrabajo/encabezados/OTHP.controllers.js";



const router = Router();


router.post('/OTHP', postOTHP);
router.put('/OTHP', putOTHPP);


export default router;
