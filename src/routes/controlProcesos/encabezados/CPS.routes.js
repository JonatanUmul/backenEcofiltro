import { Router } from "express";
import {  postCPS, putCPS } from "../../../../controllers/controlProcesos/encabezado/CPS.controllers.js";



const router = Router();


router.post('/CPS', postCPS);
router.put('/CPS', putCPS);
export default router;
