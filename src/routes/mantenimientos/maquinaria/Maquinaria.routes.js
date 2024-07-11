import { Router } from "express";
import {  getmaquinaria, Postmaquinaria,getmaq } from '../../../../controllers/mantenimientos/maquinaria/Maquinaria.controllesr.js';


const router = Router();

router.get('/maquinaria/:maquinaria', getmaquinaria );
router.get('/maquinaria', getmaq );
router.post('/maquinaria', Postmaquinaria );


export default router;
