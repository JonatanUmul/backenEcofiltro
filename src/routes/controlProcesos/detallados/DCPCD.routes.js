import { Router } from "express";
import {  postDCPCD, getDCPCD } from "../../../../controllers/controlProcesos//detalle/DCPCD.controllers.js";



const router = Router();


router.post('/DCPCD', postDCPCD);
router.get('/DCPCD/:id', getDCPCD);

export default router;
