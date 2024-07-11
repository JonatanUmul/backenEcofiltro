import { Router } from "express";
import {  postOTPV, putOTPV } from "../../../../controllers/ordenesDeTrabajo/encabezados/OTPV.controllers.js"



const router = Router();


router.post('/OTPV', postOTPV);
router.put('/OTPV', putOTPV);

export default router;
