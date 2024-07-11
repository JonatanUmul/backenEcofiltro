import { Router } from "express";
import {  postOTIP, putOTIP } from "../../../../controllers/ordenesDeTrabajo/encabezados/OTIP.controllers.js";



const router = Router();


router.post('/OTIP', postOTIP);
router.put('/OTIP', putOTIP);


export default router;