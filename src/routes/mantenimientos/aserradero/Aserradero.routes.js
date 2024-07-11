import { Router } from "express";
import {  PostAserradero, getAserradero } from '../../../../controllers/mantenimientos/aserradero/Aserradero.controller.js';


const router = Router();

router.get('/Aserradero', getAserradero );
router.post('/Aserradero', PostAserradero );


export default router;
