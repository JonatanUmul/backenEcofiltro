import { Router } from "express";
import {  PostTurnos, getATurnos } from '../../../../controllers/mantenimientos/turnos/Turnos.controller.js';


const router = Router();

router.get('/Turnos', getATurnos );
router.post('/Turnos', PostTurnos );


export default router;
