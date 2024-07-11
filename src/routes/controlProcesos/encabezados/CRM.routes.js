import { Router } from "express";
import {  postCRM, putCRM } from "../../../../controllers/controlProcesos/encabezado/CRM.controllers.js";



const router = Router();


router.post('/CRM', postCRM);
router.put('/CRM', putCRM);

export default router;
