import { Router } from "express";
import {  getInsumos, PostInsumos } from '../../../../controllers/mantenimientos/insumos/Insumos.controller.js';


const router = Router();

router.get('/Insumos/:insumo', getInsumos );
router.post('/Insumos', PostInsumos );


export default router;
