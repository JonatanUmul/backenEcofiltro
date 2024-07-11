import { Router } from "express";
import {  postOTP,putOTP } from "../../../../controllers/ordenesDeTrabajo/encabezados/OTP.controllers.js";



const router = Router();


router.post('/OTP', postOTP);
router.put('/OTP', putOTP);

export default router;
