import { Router } from "express";
import {  PostPatios, getPatios } from '../../../../controllers/mantenimientos/patios/Patios.controller.js';


const router = Router();

router.get('/Patios', getPatios );
router.post('/Patios', PostPatios );


export default router;
